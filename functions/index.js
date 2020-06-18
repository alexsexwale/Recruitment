const functions = require("firebase-functions");
const moment = require("moment");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const soap = require("soap");

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
    if(req.body.type == "feedback" || req.body.type == "support") {
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
    if(req.body.type == "errors") {
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

// Inbound payment
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
    var code = branchcode+"";
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
        db.collection("students").doc(req.body.studentAlias).get().then(doc => {
            var student = doc.data();
            db.collection("users").doc(req.body.studentAlias).get().then(doc => {
                student.email = doc.data().email;
                student.phoneNumber = doc.data().phone;
                student.fullName = doc.data().name + " " + doc.data().surname;
                student.surname = doc.data().surname;
                if (student) {
                    // Get payment gateway data
                    db.collection("Settings").doc("Payment Gateway").get().then(doc => {
                        var paymentGateway = doc.data();
                        // Today
                        var date = new Date();
                        // Tomorrow
                        date.setDate(date.getDate() + 1);
                        // Day of the week
                        var day = (moment(date).format('dddd')).toLowerCase();
                        // NetCash payment process only happen between Monday to Friday
                        while (day === "saturday" || day === "sunday") {
                            date.setDate(date.getDate() + 1);
                            day = (moment(date).format('dddd')).toLowerCase();
                        }
                        // Access the web service
                        soap.createClientAsync(paymentGateway.webService).then((client) => {
                            var commission = 0.1;
                            var studentSalaryInCents = parseInt(req.body.amount) * (1 - commission) * 100;
                            var file = (
                                ["H", paymentGateway.creditorPaymentServiceKey, "1", "CompactPayments", req.body.jobId, date, paymentGateway.salaryPaymentServiceKey].join('\t') + "\n" +
                                ["K", 101, 102, 131, 132, 133, 134, 135, 136, 162, 201, 202, 252].join('\t') + "\n" +
                                ["T", student.userId, student.fullName, 1, student.accountName, 1, padBranch(student.branchCode), 0, student.accountNumber, studentSalaryInCents, student.email, student.phoneNumber, 1234567890 ].join('\t') + "\n" +
                                ["F", 1, studentSalaryInCents, 9999].join('\t') + "\n"
                            );
                            console.log(file)
                            // Batch File Upload Parametres
                            var args = { ServiceKey: paymentGateway.creditorPaymentServiceKey, File: file };
                            // Upload single student payment information
                            client.BatchFileUpload(args, (err, result) => {
                                // Batch Uploaded
                                if(result.BatchFileUploadResult && result.BatchFileUploadResult !== "FILE NOT READY") {
                                    console.log("Batch File Successfully Uploaded: " + result.BatchFileUploadResult);
                                    // Request File Report Upload Parametres
                                    var argsRFUR = { ServiceKey: paymentGateway.creditorPaymentServiceKey, FileToken: result.BatchFileUploadResult }
                                    // Insert the file token
                                    db.collection("payments").doc(req.body.jobId).update({ fileToken: result.BatchFileUploadResult });
                                    // client.RequestFileUploadReport(argsRFUR, (err, resultRFUR) => {
                                    //     // Request File Uploded
                                    //     if(resultRFUR.RequestFileUploadReportResult && resultRFUR.RequestFileUploadReportResult !== "FILE NOT READY") {
                                    //         console.log("Request File Successfully Uploaded");
                                    //         db.collection("micros").doc(req.body.jobId).update({
                                    //             status: "rate",
                                    //             satisfied: true,
                                    //             complete: true,
                                    //             lastModified: moment(Date.now()).format('L')
                                    //         });
                                    //         db.collection("payments").doc(req.body.jobId).update({
                                    //             outboundPayment: true,
                                    //             lastModified: moment(Date.now()).format('L')
                                    //         });
                                            
                                    //         res.send(resultRFUR.RequestFileUploadReportResult);
                                    //     } // Request File failed to uploded
                                    //     else {
                                    //         console.log("Request File Failed to Upload: " + resultRFUR.RequestFileUploadReportResult);
                                    //         db.collection("errors").add({
                                    //             jobId: req.body.jobId,
                                    //             created: moment(Date.now()).format("L"),
                                    //             issue: "Payment to " + student.name + " failed at Request File Upload Report: " + resultRFUR.RequestFileUploadReportResult
                                    //         });
                                    //     }
                                    // });
                                    return res.status(200);
                                } // Batch failed to uploaded
                                else {
                                    console.log("Batch File Failed to Upload");
                                    db.collection("errors").add({
                                        jobId: req.body.jobId,
                                        created: moment(Date.now()).format("L"),
                                        issue: "Payment to " + student.name + " failed at Batch File Upload: " + result.BatchFileUploadResult
                                    });
                                    return res.status(result.BatchFileUploadResult);
                                }
                            });
                        });
                    });
                }
                else {
                    return res.status(400);
                }
            });
        });
    } 
    else {
        return res.status(400);
    }
});

// Export api to Firebase Cloud Functions
exports.app = functions.https.onRequest(app);