const functions = require("firebase-functions");
const moment = require("moment");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var soap = require("soap");

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://joboxza.firebaseio.com"
});

const db = admin.firestore();

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors({ origin: true }));

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

// Routes
app.get("/hello", (req, res) => {
    return res.status(200).send("Hey");
});

// Notifications
app.post("/notification", urlencodedParser, (req, res) => {
    var msg = null;
    if(req.body.type === "feedback" || req.body.type === "support") {
        msg = {
            to: "contact@jobox.co.za",
            from: req.body.email,
            subject: req.body.subject,
            text: req.body.message
        };

        db.collection(req.body.type).add({
            userId: req.body.id,
            created: moment(Date.now()).format('L'),
            subject: req.body.subject,
            message: req.body.message
        });
    }
    if(req.body.type === "errors") {
        msg = {
            to: "tech@jobox.co.za",
            from: "admin@jobox.co.za",
            subject: req.body.subject,
            text: req.body.message
        };
        db.collection(req.body.type).add({
            jobId: null,
            created: moment(Date.now()).format('L'),
            issue: req.body.subject,
            message: req.body.message
        });
    }
    sgMail.send(msg);
    
    return res.status(200).send("Sent");
});

// // Inbound payment
app.post("/activate", urlencodedParser, (req, res) => {
  if(req.body.TransactionAccepted && req.body.Extra1) {
    db.collection("payments").doc(req.body.Extra1).update({
      inboundpayment: true,
      lastModified: moment(Date.now()).format("L"),
    });
    res.status(200).redirect("https://joboxstaging.web.app/jobs/micro/status/" + req.Extra1);
  } else {
    db.collection("errors").add({
      created: moment(Date.now()).format("L"),
      message: "Payment Gateway failed" 
    });
    res.status(200).redirect("https://joboxstaging.web.app/");
  }
});

function padBranch(branchcode) {
    var code = branchcode + "";
    // Branch code needs to be 6 digits
	while(code.length < 6)
	{
        //add zero(s) in front of branch code values if there are less than 6 digits
		code = "0" + code;
	}
	return code;
}

// Outbound Payment
app.post("/pay", urlencodedParser, (req, res) => {
    if(req.body.jobId && req.body.studentAlias) {
        // Fetch the student
        const doc = db.collection("students").doc(req.body.studentAlias).get();
        const user = db.collection("users").doc(req.body.studentAlias).get();
        var student = doc.data();
        student.email = user.data().email;
        student.phoneNumber = user.data().phone;
        student.fullName = user.data().name + " " + user.data().surname;
        if(student) {
            // Get payment gateway data
            const settings = db.collection("Settings").doc("Payment Gateway").get();
            var paymentGateway = settings.data();
            var url = paymentGateway.webService;
            // Format date to be yyymmdd eg. 20200619
            Date.prototype.yyyymmdd = function() {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
                var dd  = this.getDate().toString();
                return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
            };
            // Today
            var date = new Date();
            // Tomorrow
            date.setDate(date.getDate() + 1);
            // Day of the week
            var day = (moment(date).format("dddd")).toLowerCase();
            // NetCash payment process only happen between Monday to Friday
            while (day === "saturday" || day === "sunday") {
                date.setDate(date.getDate() + 1);
                day = (moment(date).format("dddd")).toLowerCase();
            }
            date = date.yyyymmdd();
            // Access the web service
            soap.createClient(url, (client) => {
                var studentSalaryInCents = parseInt(req.body.amount) * (1 - paymentGateway.studentCommission) * 100;
                var file = (
                    ["H", paymentGateway.creditorPaymentServiceKey, "1", "Realtime", req.body.jobId, date, paymentGateway.vendorKey].join('\t') + "\n" +
                    ["K", 101, 102, 131, 132, 133, 134, 135, 136, 162, 201, 202, 252].join('\t') + "\n" +
                    ["T", student.userId, student.fullName, 1, student.accountName, 1, padBranch(student.branchCode), 0, student.accountNumber, studentSalaryInCents, student.email, student.phoneNumber, req.body.jobId ].join('\t') + "\n" +
                    ["F", 1, studentSalaryInCents, 9999].join('\t') + "\n"
                );
                console.log(file)
                // // Batch File Upload Parametres
                var args = { ServiceKey: paymentGateway.creditorPaymentServiceKey, File: file };
                // // Upload single student payment information
                client.BatchFileUpload(args, (result) => {
                    // Batch Uploaded
                    if(result.BatchFileUploadResult !== "100") {
                        if(result.BatchFileUploadResult !== "101") {
                            if(result.BatchFileUploadResult !== "102") {
                                if(result.BatchFileUploadResult !== "200") {
                                    if(result.BatchFileUploadResult !== "FILE NOT READY") {
                                        console.log("Batch File Successfully Uploaded: " + result.BatchFileUploadResult);
                                        db.collection("payments").doc(req.body.jobId).update({ 
                                            studentFileToken: result.BatchFileUploadResult,
                                            outboundPayment: true
                                        });
                                    }
                                    else {
                                        db.collection("netcash").add({
                                            jobId: req.body.jobId,
                                            created: moment(Date.now()).format("L"),
                                            code: resultRFUR.RequestFileUploadReportResult,
                                            description: resultRFUR.RequestFileUploadReportResult
                                        });
                                        console.log(resultRFUR.RequestFileUploadReportResult);
                                        return res.status(resultRFUR.RequestFileUploadReportResult);
                                    }
                                }
                                else {
                                    db.collection("netcash").add({
                                        jobId: req.body.jobId,
                                        created: moment(Date.now()).format("L"),
                                        code: resultRFUR.RequestFileUploadReportResult,
                                        description: "General code exception. Please contact Netcash Technical Support."
                                    });
                                    console.log("General code exception. Please contact Netcash Technical Support.");
                                    return res.status(resultRFUR.RequestFileUploadReportResult);
                                }
                            }
                            else {
                                db.collection("netcash").add({
                                    jobId: req.body.jobId,
                                    created: moment(Date.now()).format("L"),
                                    code: resultRFUR.RequestFileUploadReportResult,
                                    description: "Parameter error. One or more of the parameters in the string is incorrect."
                                });
                                console.log("Parameter error. One or more of the parameters in the string is incorrect.");
                                return res.status(resultRFUR.RequestFileUploadReportResult);
                            }
                        }
                        else {
                            db.collection("netcash").add({
                                jobId: req.body.jobId,
                                created: moment(Date.now()).format("L"),
                                code: resultRFUR.RequestFileUploadReportResult,
                                description: "Date format error. If the string contains a date, it should be in the format CCYYMMDD."
                            });
                            console.log("Date format error. If the string contains a date, it should be in the format CCYYMMDD.");
                            return res.status(resultRFUR.RequestFileUploadReportResult);
                        }
                    } // Batch failed to uploaded
                    else {
                        db.collection("netcash").add({
                            jobId: req.body.jobId,
                            created: moment(Date.now()).format("L"),
                            code: resultRFUR.RequestFileUploadReportResult,
                            description: "Authentication failure. Ensure that the service key in the method call is correct."
                        });
                        console.log("Authentication failure. Ensure that the service key in the method call is correct.");
                        return res.status(resultRFUR.RequestFileUploadReportResult);
                    }
                });
            });
        }
        else {
            return res.status(400);
        }
    } 
    else {
        return res.status(400);
    }
});

// Export api to Firebase Cloud Functions
exports.app = functions.https.onRequest(app);