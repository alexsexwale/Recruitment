let path = require('path');
const functions = require("firebase-functions");
const moment = require("moment");
//const admin = require("firebase-admin"); code moved to config/firebase.js due to not being able to initialize firebase twice
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const soap = require("soap");
const SlackBot = require('slackbots');
const dotenv = require('dotenv');
var mysql = require('mysql');
const firebaseJS = require(__dirname + '/config/firebase.js');



dotenv.config()

dotenv.config();
/* code moved to config/firebase.js due to not being able to initialize firebase twice
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://joboxza.firebaseio.com"
});

const authMiddleware = require("./authMiddleware");

const db = admin.firestore();
*/
const db = firebaseJS.db;

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors({ origin: true }));

//emulator
//documentation for emulator: https://firebase.google.com/docs/functions/local-emulator

//process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:5001';



// authenticates all routes
//app.use(authMiddleware);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const sgMail = require("@sendgrid/mail");

// Firestore - get single document
function getDocument(collection, id) {
  return db.collection(collection).doc(id).get();
}

// Routes

app.get("/hello", (req, res) => {
  const bot = new SlackBot({
    token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
    name: 'jobox_app'
  })
  bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }
    bot.postMessageToChannel(
        'interns',
        'Testing slack chatbot',
        params
    );
  })
    return res.status(200).send("Hey");
});

// Notifications
app.post("/notification", urlencodedParser, async (req, res) => {
  const doc = await getDocument("Settings", "Email");
  var settings = doc.data();
  sgMail.setApiKey(settings.apiKey);
  
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
  if(req.body.type === "active") {
    msg = {
        to: "contact@jobox.co.za",
        from: "admin@jobox.co.za",
        subject: req.body.subject,
        text: req.body.message
    };
  }
  if(req.body.type === "errors" || req.body.type === "incomplete" || req.body.type === "cancel" || req.body.type === "dissatisfied") {
    msg = {
        to: "contact@jobox.co.za",
        from: req.body.email,
        subject: req.body.subject,
        text: req.body.message
    };

    db.collection(req.body.type).add({
        jobId: req.body.jobId,
        created: moment(Date.now()).format('L'),
        subject: req.body.subject,
        message: req.body.message
    });
  }
  sgMail.send(msg);
  
  return res.status(200).send("Sent");
});

// Inbound payment
app.post("/activate", urlencodedParser, (req, res) => {
  if(req.body.TransactionAccepted && req.body.Extra1 && req.body.Extra2 ) {
    db.collection("payments").doc(req.body.Extra1).update({
      inboundPayment: true,
      lastModified: moment(Date.now()).format("L"),
    });
    
    //send chat bot message
    const bot = new SlackBot({
      token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
      name: 'jobox_app'
    })
    bot.on('start', () => {
      const params = {
          icon_emoji: ':robot_face:'
      }
      bot.postMessageToChannel(
          'random',
          "Dear Jobox Team,\n\n" + " the user with the job id: " + req.body.Extra1 + ", has made a payment theough the api that was put into netcash",
          params
      );
    })

    res.status(200).redirect("https://joboxstaging.web.app/client/payment/success/" + req.body.Extra1);
  } 
  else {
    db.collection("errors").add({
      created: moment(Date.now()).format("L"),
      message: "Payment Gateway failed" 
    });
    res.status(200).redirect("https://joboxstaging.web.app/");
  }
});

// Cancel payment
app.post("/cancelPayment", urlencodedParser, (req, res) => {
    if(req.body.Extra1) {
        res.status(200).redirect("https://joboxstaging.web.app/client/jobs/micro/status/" + req.body.Extra1);
    } 
    else {
      db.collection("errors").add({
        created: moment(Date.now()).format("L"),
        message: "Payment Gateway failed" 
      });
      res.status(200).redirect("https://joboxstaging.web.app/");
    }
});

// Decline payment
app.post("/decline", urlencodedParser, async (req, res) => {
    if(req.body.Extra1) {
        db.collection("netcash").add({
          created: moment(Date.now()).format("L"),
          message: "Payment Declined" 
        });

        //send chat bot message
        const bot = new SlackBot({
          token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
          name: 'jobox_app'
        })
        bot.on('start', () => {
          const params = {
              icon_emoji: ':robot_face:'
          }
          bot.postMessageToChannel(
              'random',
              "Dear Jobox Team,\n\n" + " the user with the job id: " + req.body.Extra1 + ", was unable to process the payment. The payment has been declined.",
              params
          );
        })

        const doc = await getDocument("Settings", "Email");
        var settings = doc.data();
        sgMail.setApiKey(settings.apiKey);
        var msg = {
            to: "contact@jobox.co.za",
            from: "admin@jobox.co.za",
            subject: "Netcash Notification - " + req.body.Extra1,
            text: " The user with the job id: " + req.body.Extra1 + ", was unable to process the payment. The payment has been declined."
        };
        sgMail.send(msg);
        res.status(200).redirect("https://joboxstaging.web.app/client/payment/fail/" + req.body.Extra1);
    } 
    else {
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
app.post("/pay", urlencodedParser, async (req, res) => {
    if(req.body.jobId && req.body.studentAlias) {
      // Fetch the student
      const doc = await getDocument("students", req.body.studentAlias);
      const user = await getDocument("users", req.body.studentAlias);
      var student = doc.data();
      student.email = user.data().email;
      student.phoneNumber = user.data().phone;
      student.fullName = user.data().name + " " + user.data().surname;
      if(student) {
        // Get payment gateway data
        const settings = await getDocument("Settings", "Payment Gateway");
        var paymentGateway = settings.data();
        console.log(paymentGateway);
        var url = paymentGateway.webService;
        // Format date to be yyyymmdd e.g. 20200619
        Date.prototype.yyyymmdd = function() {
          var yyyy = this.getFullYear().toString();
          var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
          var dd  = this.getDate().toString();
          return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
        };
        Date.prototype.mmdd = function() {
          var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
          var dd  = this.getDate().toString();
          return (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
        };
        // Today
        var date = new Date();
        // Tomorrow
        date.setDate(date.getDate() + 1);
        // Day of the week
        var day = moment(date.yyyymmdd());
        day = (moment(date).format("dddd")).toLowerCase();
        // Month and day, mmdd e.g. 0101
        var publicHoliday = date.mmdd();
        // NetCash payment process only happen between Monday to Friday and on non public holiday days
        while (day === "saturday" || day === "sunday" // Weekend
            || publicHoliday === "0101" // New Year's Day
            || publicHoliday === "0321" // Human Rights Day
            || publicHoliday === "0410" // Good Friday
            || publicHoliday === "0413" // Family Day
            || publicHoliday === "0427" // Freedom Day
            || publicHoliday === "0501" // Worker's Day
            || publicHoliday === "0616" // Youth Day
            || publicHoliday === "0809" // Women's Day
            || publicHoliday === "0924" // Heritage Day
            || publicHoliday === "1216" // Day of Reconciliation
            || publicHoliday === "1225" // Christmas Day
            || publicHoliday === "1226" // Day of Goodwill
          )
        {
        if(publicHoliday === "0101" && day === "sunday" // New Year's Day on Sunday
          || publicHoliday === "0321" && day === "sunday" // Human Rights Day on Sunday
          || publicHoliday === "0410" && day === "sunday" // Good Friday on Sunday
          || publicHoliday === "0413" && day === "sunday" // Family Day on Sunday
          || publicHoliday === "0427" && day === "sunday" // Freedom Day on Sunday
          || publicHoliday === "0501" && day === "sunday" // Worker's Day on Sunday
          || publicHoliday === "0616" && day === "sunday" // Youth Day on Sunday
          || publicHoliday === "0809" && day === "sunday" // Women's Day on Sunday
          || publicHoliday === "0924" && day === "sunday" // Heritage Day on Sunday
          || publicHoliday === "1216" && day === "sunday" // Day of Reconciliation on Sunday
          || publicHoliday === "1225" && day === "sunday" // Christmas Day on Sunday
          || publicHoliday === "1226" && day === "sunday" // Day of Goodwill on Sunday
        ) 
        {
          date.setDate(date.getDate() + 2);
          day = (moment(date).format("dddd")).toLowerCase();
        }
        else {
          date.setDate(date.getDate()  + 1);
          day = (moment(date).format("dddd")).toLowerCase();
        }         
      }
      date = date.yyyymmdd();
      // Access the web service
      soap.createClientAsync(url).then(client => {
        var studentSalaryInCents = parseInt(req.body.amount) * 100;
        var file = (
          ["H", paymentGateway.creditorPaymentServiceKey, "1", "Realtime", req.body.jobId, date, paymentGateway.vendorKey].join('\t') + "\n" +
          ["K", 101, 102, 131, 132, 133, 134, 135, 136, 162, 201, 202, 252].join('\t') + "\n" +
          ["T", student.userId, student.fullName, 1, student.accountName, 1, padBranch(student.branchCode), 0, student.accountNumber, studentSalaryInCents, student.email, student.phoneNumber, req.body.jobId ].join('\t') + "\n" +
          ["F", 1, studentSalaryInCents, 9999].join('\t') + "\n"
        );
        // Batch File Upload Parameters
        var args = { ServiceKey: paymentGateway.creditorPaymentServiceKey, File: file };
        return client.BatchFileUploadAsync(args);
      })
      .catch(err => {
        db.collection("errors").add({
          jobId: req.body.jobId,
          created: moment(Date.now()).format("L"),
          issue: "Soap service failed to work",
          message: err.message
        });
        console.log(err.message);
      })
      .then(result => {
        // Upload single student payment information
        var batch = result[0].BatchFileUploadResult;
        // Batch Uploaded
        if(batch !== "100") {
          if(batch !== "101") {
            if(batch !== "102") {
              if(batch !== "200") {
                if(batch !== "FILE NOT READY") {
                  console.log("Batch File Successfully Uploaded: " + batch);
                  db.collection("payments").doc(req.body.jobId).update({
                    studentFileToken: batch,
                    outboundPayment: true,
                    lastModified: moment(Date.now()).format('L'),
                    paymentDate: moment(date, "YYYYMMDD").format('LLLL')
                  });
                  db.collection("micros").doc(req.body.jobId).update({
                    status: "rate",
                    satisfied: true,
                    lastModified: moment(Date.now()).format('L')
                  });
                  return res.status("success");
                }
                else {
                  db.collection("netcash").add({
                    jobId: req.body.jobId,
                    created: moment(Date.now()).format("L"),
                    code: batch,
                    description: batch
                  });
                  console.log(batch);
                  return res.status(batch);
                }
              }
              else {
                db.collection("netcash").add({
                  jobId: req.body.jobId,
                  created: moment(Date.now()).format("L"),
                  code: batch,
                  description: "General code exception. Please contact Netcash Technical Support."
                });
                console.log("General code exception. Please contact Netcash Technical Support.");
                return res.status(batch);
              }
            }
            else {
             db.collection("netcash").add({
                jobId: req.body.jobId,
                created: moment(Date.now()).format("L"),
                code: batch,
                description: "Parameter error. One or more of the parameters in the string is incorrect."
              });
              console.log("Parameter error. One or more of the parameters in the string is incorrect.");
              return res.status(batch);
            }
          }
          else {
            db.collection("netcash").add({
              jobId: req.body.jobId,
              created: moment(Date.now()).format("L"),
              code: batch,
              description: "Date format error. If the string contains a date, it should be in the format CCYYMMDD."
            });
            console.log("Date format error. If the string contains a date, it should be in the format CCYYMMDD.");
            return res.status(batch);
          }
        } // Batch failed to uploaded
        else {
          db.collection("netcash").add({
            jobId: req.body.jobId,
            created: moment(Date.now()).format("L"),
            code: batch,
            description: "Authentication failure. Ensure that the service key in the method call is correct."
          });
          console.log("Authentication failure. Ensure that the service key in the method call is correct.");
          return res.status(batch);
        }
      })
      .catch(err => {
        db.collection("netcash").add({
          jobId: req.body.jobId,
          created: moment(Date.now()).format("L"),
          code: batch,
          description: err.message
        });
        console.log(err.message);
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

//Get All Users - PowerBI
app.get("/users", async (req, res) => {
  var users = [];
  const snapshot = await db.collection("users").get();
  snapshot.forEach(doc => {
    users.push(doc.data());
  });
  return res.status(200).send(users);
});

//Get All Clients - PowerBI
app.get("/clients", async (req, res) => {
  var clients = [];
  const snapshot = await db.collection("clients").get();
  snapshot.forEach(doc => {
    clients.push(doc.data());
  });
  return res.status(200).send(clients);
});

//Get All Students - PowerBI
app.get("/students", async (req, res) => {
  var students = [];
  const snapshot = await db.collection("students").get();
  snapshot.forEach(doc => {
    students.push(doc.data());
  });
  return res.status(200).send(students);
});

//Get All Vetted - PowerBI
app.get("/vetted", async (req, res) => {
  var vetted = [];
  const snapshot = await db.collection("vetted").get();
  snapshot.forEach(doc => {
    vetted.push(doc.data());
  });
  return res.status(200).send(vetted);
});

//Get All Jobs - PowerBI
app.get("/jobs", async (req, res) => {
  var jobs = [];
  const snapshot = await db.collection("jobs").get();
  snapshot.forEach(doc => {
    jobs.push(doc.data());
  });
  return res.status(200).send(jobs);
});

//Get All Micros - PowerBI
app.get("/micros", async (req, res) => {
  var micros = [];
  const snapshot = await db.collection("micros").get();
  snapshot.forEach(doc => {
    micros.push(doc.data());
  });
  return res.status(200).send(micros);
});

//Get All Skills - PowerBI
app.get("/skills", async (req, res) => {
  var skills = [];
  const snapshot = await db.collection("skills").get();
  snapshot.forEach(doc => {
    skills.push(doc.data());
  });
  return res.status(200).send(skills);
});

//Get All Payments - PowerBI
app.get("/payments", async (req, res) => {
  var payments = [];
  const snapshot = await db.collection("payments").get();
  snapshot.forEach(doc => {
    payments.push(doc.data());
  });
  return res.status(200).send(payments);
});

//Get All Applications - PowerBI
app.get("/applications", async (req, res) => {
  var applications = [];
  const snapshot = await db.collection("applications").get();
  snapshot.forEach(doc => {
    applications.push(doc.data());
  });
  return res.status(200).send(applications);
});

//Get All Support - PowerBI
app.get("/support", async (req, res) => {
  var support = [];
  const snapshot = await db.collection("support").get();
  snapshot.forEach(doc => {
    support.push(doc.data());
  });
  return res.status(200).send(support);
});

//Get All Feedback - PowerBI
app.get("/feedback", async (req, res) => {
  var feedback = [];
  const snapshot = await db.collection("feedback").get();
  snapshot.forEach(doc => {
    feedback.push(doc.data());
  });
  return res.status(200).send(feedback);
});

//Get All StudentRatings - PowerBI
app.get("/studentRatings", async (req, res) => {
  var studentRatings = [];
  const snapshot = await db.collection("studentRatings").get();
  snapshot.forEach(doc => {
    studentRatings.push(doc.data());
  });
  return res.status(200).send(studentRatings);
});

//Get All ClientRatings - PowerBI
app.get("/clientRatings", async (req, res) => {
  var clientRatings = [];
  const snapshot = await db.collection("clientRatings").get();
  snapshot.forEach(doc => {
    clientRatings.push(doc.data());
  });
  return res.status(200).send(clientRatings);
});

//Get All Communication - PowerBI
app.get("/communication", async (req, res) => {
  var communication = [];
  const snapshot = await db.collection("communication").get();
  snapshot.forEach(doc => {
    communication.push(doc.data());
  });
  return res.status(200).send(communication);
});

//Get All ProblemSolving - PowerBI
app.get("/problemSolving", async (req, res) => {
  var problemSolving = [];
  const snapshot = await db.collection("problemSolving").get();
  snapshot.forEach(doc => {
    problemSolving.push(doc.data());
  });
  return res.status(200).send(problemSolving);
});

//Get All Leadership - PowerBI
app.get("/leadership", async (req, res) => {
  var leadership = [];
  const snapshot = await db.collection("leadership").get();
  snapshot.forEach(doc => {
    leadership.push(doc.data());
  });
  return res.status(200).send(leadership);
});

//Get All Organisation - PowerBI
app.get("/organisation", async (req, res) => {
  var organisation = [];
  const snapshot = await db.collection("organisation").get();
  snapshot.forEach(doc => {
    organisation.push(doc.data());
  });
  return res.status(200).send(organisation);
});

//Get All Cancel - PowerBI
app.get("/cancel", async (req, res) => {
  var cancel = [];
  const snapshot = await db.collection("cancel").get();
  snapshot.forEach(doc => {
    cancel.push(doc.data());
  });
  return res.status(200).send(cancel);
});

//Get All Incomplete - PowerBI
app.get("/incomplete", async (req, res) => {
  var incomplete = [];
  const snapshot = await db.collection("incomplete").get();
  snapshot.forEach(doc => {
    incomplete.push(doc.data());
  });
  return res.status(200).send(incomplete);
});

//Get All Dissatisfied - PowerBI
app.get("/dissatisfied", async (req, res) => {
  var dissatisfied = [];
  const snapshot = await db.collection("dissatisfied").get();
  snapshot.forEach(doc => {
    dissatisfied.push(doc.data());
  });
  return res.status(200).send(dissatisfied);
});

//Get All Errors - PowerBI
app.get("/errors", async (req, res) => {
  var errors = [];
  const snapshot = await db.collection("errors").get();
  snapshot.forEach(doc => {
    errors.push(doc.data());
  });
  return res.status(200).send(errors);
});

//Get All Netcash - PowerBI
app.get("/netcash", async (req, res) => {
  var netcash = [];
  const snapshot = await db.collection("netcash").get();
  snapshot.forEach(doc => {
    netcash.push(doc.data());
  });
  return res.status(200).send(netcash);
});

// Export api to Firebase Cloud Functions
exports.app = functions.https.onRequest(app);

// Send typed out emails
function standardEmail(receiver, sender, subject, message) {
  return {
    to: receiver,
    from: sender,
    subject: subject,
    text: message
  }
}

//establish MySQL connection
async function createMySQLconnection() {
  //MySQL details 
  const settingsCollection = await getDocument("Settings", "MySQL");
  var MySQLsettings = settingsCollection.data();
  var mysqlConnection = mysql.createConnection({
    socketPath: MySQLsettings.socketPath,
    user: MySQLsettings.user,
    password: MySQLsettings.password,
    database: MySQLsettings.database,
    multipleStatements: MySQLsettings.multipleStatements
    
  });
  //init connection
  mysqlConnection.connect((err) => {
    if (!err)
      console.log('SQL Connection Established Successfully');
    else {
      console.log('SQL Connection Failed!' + JSON.stringify(err, undefined, 2));
      console.log(err);
    }
  });
  return mysqlConnection
}

//perform a query. Can't be used in loops due to await.
async function sqlQuery(sql, values) {
  var mysqlConnection = await createMySQLconnection();
  var query = mysqlConnection.query(sql, values, (error) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log(query.sql);
    }
  });
  mysqlConnection.end((error) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log('The connection is terminated now');
    }
  });
  return null;
}

// New user document created
exports.newUser = functions.firestore.document('users/{userId}')
  .onCreate(async (snap, context) => {
    const value = snap.data();
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);
    var sql = "INSERT INTO Users (user_ID, email, name, surname, phone, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    var values = [value.userId, value.email, value.name, value.surname, value.phone, value.user, lastModified, created];
    var queryOut = await sqlQuery(sql,values);
  });

//User document updated
exports.updateUser = functions.firestore.document('users/{userId}')
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();
  var lastModified = new Date();

  if (newValue.email !== previousValue.email) {
    var sql = "UPDATE Users SET email = ?, last_modified = ? WHERE user_ID = ?";
    var values = [newValue.email, lastModified, newValue.userId];
    var queryOut = await sqlQuery(sql,values);
  }
  if (newValue.name !== previousValue.name) {
    sql = "UPDATE Users SET name = ?, last_modified = ? WHERE user_ID = ?";
    values = [newValue.name, lastModified, newValue.userId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.surname !== previousValue.surname) {
    sql = "UPDATE Users SET surname = ?, last_modified = ? WHERE user_ID = ?";
    values = [newValue.surname, lastModified, newValue.userId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.phone !== previousValue.phone) {
    sql = "UPDATE Users SET phone = ?, last_modified = ? WHERE user_ID = ?";
    values = [newValue.phone, lastModified, newValue.userId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.user !== previousValue.user) {
    sql = "UPDATE Users SET user_role = ?, last_modified = ? WHERE user_ID = ?";
    values = [newValue.user, lastModified, newValue.userId];
    queryOut = await sqlQuery(sql,values);
  }
});

//New client document created
exports.newClient = functions.firestore.document('clients/{clientId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    //makes onUpdate behave like an onCreate (only after account is done being created will this code run)
    if (newValue.accountCreated === true && previousValue.accountCreated === false) {
      var lastModified = new Date(newValue.lastModified);
      var created = new Date(newValue.created);
      //client table
      var sql = "INSERT INTO Clients (client_ID, user_ID, industry, bio, vat, website, company_category, company_size, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?)";
      var values = [newValue.userId, newValue.userId, newValue.industry, newValue.bio, newValue.vat, newValue.website, newValue.companyCategory, newValue.companySize, lastModified, created];
      var queryOut = await sqlQuery(sql,values);
      //client_addresses table
      sql = "INSERT INTO Client_Addresses (client_ID, address_line_1, city, country, postal_code_zip_code, province_state, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
      values = [newValue.userId, newValue.addressLine1, newValue.city, newValue.country, newValue.postalCode_zipCode, newValue.province_state, lastModified, created];
      query = queryOut = await sqlQuery(sql,values);
    }
  });


// New feedback document created
exports.feedback = functions.firestore.document('feedback/{feedback}')
.onCreate(async (snap, context) => {
  const value = snap.data();
  var lastModified = new Date(value.created);
  var created = new Date(value.created);
  var sql = "INSERT INTO Enquiries (user_ID, message, type, last_modified, created) VALUES (?,?,?,?,?)";
  var values = [value.userId, value.message, "feedback", lastModified, created];
  var queryOut = await sqlQuery(sql,values);

  const doc = await getDocument("Settings", "Email");
  const setting = doc.data();
  sgMail.setApiKey(setting.apiKey);
  sgMail.send(standardEmail(setting.giveFeedback, value.email, value.subject, value.message));
  //send chat bot message
  const bot = new SlackBot({
    token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
    name: 'jobox_app'
  })
  bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }
    bot.postMessageToChannel(
        'random',
        "Dear Jobox Team,\n\n" + value.name + " " + value.surname + " has posted in feedback with the subject: " + value.subject + " and message: " + value.message ,
        params
    );
  })
  return null;
});


// New support document created
exports.support = functions.firestore.document('support/{support}')
.onCreate(async (snap, context) => {
  const value = snap.data();
  var lastModified = new Date(value.created);
  var created = new Date(value.created);
  var sql = "INSERT INTO Enquiries (user_ID, message, type, last_modified, created) VALUES (?,?,?,?,?)";
  var values = [value.userId, value.message, "support", lastModified, created];
  var queryOut = await sqlQuery(sql,values);

  const doc = await getDocument("Settings", "Email");
  const setting = doc.data();
  sgMail.setApiKey(setting.apiKey);
  sgMail.send(standardEmail(setting.getSupport, value.email, value.subject, value.message));
  //send chat bot message
  const bot = new SlackBot({
    token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
    name: 'jobox_app'
  })
  bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }
    bot.postMessageToChannel(
        'random',
        "Dear Jobox Team,\n\n" + value.name + " " + value.surname + " has posted in support with the subject: " + value.subject + " and message: " + value.message ,
        params
    );
  })
  return null;
});

// Send alert for new job posts
function jobPost(receiver, sender, clientName, companyName, jobName, jobType, jobId, phone) {
  return {
    to: receiver,
    from: sender,
    subject: "New " + jobType + " job post",
    text: "Dear Jobox Team,\n\n" + clientName + " from " + companyName + " has posted a new " + jobType + " job on the platform, "
          + jobName + " (" + jobId + ").\n\nPlease verify the job post within 24 hours.\n\nYou can reach " + 
          clientName + " on their phone number, " + phone + ".\n\nKind regards,\nAlex Sexwale" 
  }
}
// Send slack alert
function slackJobPost(channel, clientName, companyName, jobName, jobType, jobId, phone) {
  const bot = new SlackBot({
    token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
    name: 'jobox_app'
  })
  bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }
    bot.postMessageToChannel(
        channel,
        "Dear Jobox Team,\n\n" + clientName + " from " + companyName + " has posted a new " + jobType + " job on the platform, "
          + jobName + " (" + jobId + ").\n\nPlease verify the job post within 24 hours.\n\nYou can reach " + 
          clientName + " on their phone number, " + phone + "\nAlex Sexwale",
        params
    );
  })
}
// New job document created
exports.jobPost = functions.firestore.document('jobs/{jobId}')
.onCreate(async (snap, context) => {
  const value = snap.data();
  //get the industry for the job from the client's profile
  const clientDoc =  await getDocument("clients", value.clientAlias);
  const clientDocData = clientDoc.data();
  const industry = clientDocData.industry;
  var startDate = new Date(value.startDate);
  var lastModified = new Date(value.lastModified);
  var created = new Date(value.created);

  //get the job title ('category' in skills collection) 
  const skillsDoc =  await getDocument("skills", value.jobId);
  const skillsDocData = skillsDoc.data();
  const jobTitle = skillsDocData.category;

  var sql = "INSERT INTO Jobs (job_ID, client_ID, industry, name, verified, job_description, job_type, education, experience, job_title, start_date, location, payment, job_status, satisfied, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var values = [value.jobId, value.clientId, industry, value.name, value.verified, null, value.jobType, value.education, value.experience, jobTitle, startDate, null, null, null, null, lastModified, created];
  var queryOut = await sqlQuery(sql,values);

  const doc = await getDocument("Settings", "Email");
  const setting = doc.data();
  sgMail.setApiKey(setting.apiKey);
  sgMail.send(jobPost(setting.jobPost, value.email, value.clientName, value.companyName, value.name, value.jobType, value.jobId, value.phone));
  slackJobPost("random", value.clientName, value.companyName, value.name, value.jobType, value.jobId, value.phone);

  //get the information from the 'micros' collection
  const microsDoc =  await getDocument("micros", value.jobId);
  const microsDocData = microsDoc.data();
  lastModified = new Date(microsDocData.lastModified);
  created = new Date(microsDocData.created);
  //if the job type is a project task, then the Project_Tasks table needs to get a new entry
  if (value.jobType === "Once-off Project/Task") {
    sql = "INSERT INTO Project_Tasks (job_ID, client_rating_complete, duration, student_rating_complete,last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [microsDocData.jobId, microsDocData.clientRatingComplete, microsDocData.duration, microsDocData.studentRatingComplete, lastModified, created];
    queryOut = await sqlQuery(sql,values);
  }

  //the information from micros currently pertains to any job, so this information must be added to the jobs table
  sql = "UPDATE Jobs SET job_description = ?, location = ?, job_status = ?, satisfied = ? WHERE job_ID = ?";
  values = [microsDocData.description, microsDocData.location, microsDocData.status, microsDocData.satisfied, microsDocData.jobId];
  queryOut = await sqlQuery(sql,values);
  return null;
});
//job document updated
exports.updateJob= functions.firestore.document('jobs/{jobId}')
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();
  var lastModified = new Date();

  if (newValue.industry !== previousValue.industry) {
    var sql = "UPDATE Jobs SET industry = ?, last_modified = ? WHERE job_ID = ?";
    var values = [newValue.industry, lastModified, newValue.jobId];
    var queryOut = await sqlQuery(sql,values);
  }
  if (newValue.name !== previousValue.name) {
    sql = "UPDATE Jobs SET name = ?, last_modified = ? WHERE job_ID = ?";
    values = [newValue.name, lastModified, newValue.jobId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.verified !== previousValue.verified) {
    sql = "UPDATE Jobs SET verified = ?, last_modified = ? WHERE job_ID = ?";
    values = [newValue.verified, lastModified, newValue.jobId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.jobType !== previousValue.jobType) {
    sql = "UPDATE Jobs SET job_type = ?, last_modified = ? WHERE job_ID = ?";
    values = [newValue.jobType, lastModified, newValue.jobId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.education !== previousValue.education) {
    sql = "UPDATE Jobs SET education = ?, last_modified = ? WHERE job_ID = ?";
    values = [newValue.education, lastModified, newValue.jobId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.experience !== previousValue.experience) {
    sql = "UPDATE Jobs SET experience = ?, last_modified = ? WHERE job_ID = ?";
    values = [newValue.experience, lastModified, newValue.jobId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.jobTitle !== previousValue.jobTitle) {
    sql = "UPDATE Jobs SET job_title = ?, last_modified = ? WHERE job_ID = ?";
    values = [newValue.jobTitle, lastModified, newValue.jobId];
    queryOut = await sqlQuery(sql,values);
  }
  if (newValue.startDate !== previousValue.startDate) {
    sql = "UPDATE Jobs SET start_date = ?, last_modified = ? WHERE job_ID = ?";
    values = [newValue.startDate, lastModified, newValue.jobId];
    queryOut = await sqlQuery(sql,values);
  }
});

//code below moved to jobPost due to micros sometimes being triggered before jobs is done
// // New skills document created (only used to set the job title in jobs)
// exports.createSkills= functions.firestore.document('skills/{jobId}')
// .onCreate(async (snap, context) => {
//   const value = snap.data();
//   //get the job title ('category' in skills collection) 
//   const skillsDoc =  await getDocument("skills", value.jobId);
//   const skillsDocData = skillsDoc.data();
//   const jobTitle = skillsDocData.category;
//   //set the job title
//   sql = "UPDATE Jobs SET job_title = ? WHERE job_ID = ?";
//   values = [jobTitle, value.jobId];
//   queryOut = await sqlQuery(sql,values);
//   return null;
// });
// //New micros document created
// exports.createMicro = functions.firestore.document('micros/{jobId}')
// .onCreate(async (snap, context) => {
//   const value = snap.data();
//   var lastModified = new Date(value.lastModified);
//   var created = new Date(value.created);
//   //get the job type from jobs to check if it was a project task
//   const jobsDoc =  await getDocument("jobs", value.jobId);
//   const jobsDocData = jobsDoc.data();
//   const jobType = jobsDocData.jobType;
//   //if the job type is a project task, then the Project_Tasks table needs to get a new entry
//   if (jobType === "Once-off Project/Task") {
//     var sql = "INSERT INTO Project_Tasks (job_ID, client_rating_complete, duration, student_rating_complete,last_modified, created) VALUES (?,?,?,?,?,?)";
//     var values = [value.jobId, value.clientRatingComplete, value.duration, value.studentRatingComplete, lastModified, created];
//     var queryOut = await sqlQuery(sql,values);
//   }
//   //the information from micros currently pertains to any job, so this information must be added to the jobs table
//   sql = "UPDATE Jobs SET job_description = ?, location = ?, job_status = ?, satisfied = ? WHERE job_ID = ?";
//   values = [value.description, value.location, value.status, value.satisfied, value.jobId];
//   queryOut = await sqlQuery(sql,values);
//   return null;
// });

// New payments document created
exports.paymentsPost = functions.firestore.document('payments/{jobId}')
.onCreate(async (snap, context) => {
  const value = snap.data();
  var lastModified = new Date(value.lastModified);
  var created = new Date(value.created);
  var paymentDate = new Date(value.paymentDate);
  var sql = "INSERT INTO Payments (job_ID, payment_date, budget, service_fee, facilitation_cost, total_cost_paid, inbound_payment, outbound_payment, payment_method, reference, request_trace, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var values = [value.jobId, paymentDate, value.amount, value.serviceFee, value.facilitationCost, value.totalCostPaid, value.inboundPayment, value.outboundPayment, value.paymentMethod ,value.reference, value.requestTrace, lastModified, created];
  var queryOut = await sqlQuery(sql,values);
  return null;
});

//Payments document updated
exports.paymentsUpdate = functions.firestore.document('payments/{jobId}')
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();
  if (previousValue.outboundPayment === false && newValue.outboundPayment === true) {
    //send chat bot message
    const bot = new SlackBot({
      token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
      name: 'jobox_app'
    })
    bot.on('start', () => {
      const params = {
          icon_emoji: ':robot_face:'
      }
      bot.postMessageToChannel(
          'random',
          "Dear Jobox Team,\n\n" + " jobId = " + newValue.jobId + " has been completed",
          params
      );
    })
  }
  return null;
});

// New students document created
exports.newStudent = functions.firestore.document('students/{studentId}')
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const prevValue = change.before.data();
  //makes onUpdate behave like an onCreate (only after account is done being created will this code run)
  if (newValue.accountCreated === true && prevValue.accountCreated === false) {
    var lastModified = new Date(newValue.lastModified);
    var created = new Date(newValue.created);
    var dateOfBirth = new Date(newValue.dateOfBirth);
    var sql = "INSERT INTO Students (student_ID, user_ID, race, gender, date_of_birth, bio, citizenship, identification_number, disability, vehicle, drivers_license, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var values = [newValue.userId, newValue.userId, newValue.race, newValue.gender, dateOfBirth, newValue.bio, newValue.citizenship, newValue.identification, newValue.disability, newValue.vehicle, newValue.license, lastModified, created];
    var queryOut = await sqlQuery(sql,values);
    //Student_Bank_Details
    sql = "INSERT INTO Student_Bank_Details (student_ID, account_name, account_number, account_type, bank_name, branch_code, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    values = [newValue.userId, newValue.accountName, newValue.accountNumber, newValue.accountType, newValue.bankName, newValue.branchCode, lastModified, created];
    queryOut = await sqlQuery(sql,values);
    //Disabled_Students
    if (newValue.disability === "Yes") {
      sql = "INSERT INTO Disabled_Students (student_ID, disability, last_modified, created) VALUES (?,?,?,?)";
      values = [newValue.userId, newValue.disabilityDescription, lastModified, created];
      queryOut = await sqlQuery(sql,values);
    }
    //Industry_Alerts
    var mysqlConnection = await createMySQLconnection();
    for (const key in newValue.industryCategory) {
      const data = newValue.industryCategory[key];
      //console.log(key + ":" + data)
      // now key and data are the property name and data
      sql = "INSERT INTO Industry_Alerts (student_ID, industry, last_modified, created) VALUES (?,?,?,?)";
      values = [newValue.userId, data, lastModified, created];
      var query = mysqlConnection.query(sql, values, (error) => {
        if (error) {
          console.log(error);
        }
        else {
          console.log(query.sql);
        }
      });
    }
    mysqlConnection.end((error) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log('The connection is terminated now');
      }
    });
    //Work_Experiences
    sql = "INSERT INTO Work_Experiences (student_ID, descryption, job_title, start_date, end_date, employer, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    var startDate1 = new Date(newValue.startDate1);
    var endDate1 = new Date(newValue.endDate1);
    values = [newValue.userId, newValue.description1, newValue.jobTitle1, startDate1, endDate1, newValue.employer1, lastModified, created];
    queryOut = await sqlQuery(sql,values);
    //social medias
    if (newValue.facebook !== null) {
      sql = "INSERT INTO Social_Media_Handles (student_ID, socmed_type, socmed_url, last_modified, created) VALUES (?,?,?,?,?)";
      values = [newValue.userId, "Facebook", newValue.facebook, lastModified, created];
      queryOut = await sqlQuery(sql,values);
    }
    if (newValue.gitHub !== null) {
      sql = "INSERT INTO Social_Media_Handles (student_ID, socmed_type, socmed_url, last_modified, created) VALUES (?,?,?,?,?)";
      values = [newValue.userId, "Github", newValue.gitHub, lastModified, created];
      queryOut = await sqlQuery(sql,values);
    }
    if (newValue.instagram !== null) {
      sql = "INSERT INTO Social_Media_Handles (student_ID, socmed_type, socmed_url, last_modified, created) VALUES (?,?,?,?,?)";
      values = [newValue.userId, "Instagram", newValue.instagram, lastModified, created];
      queryOut = await sqlQuery(sql,values);
    }
    if (newValue.linkedIn !== null) {
      sql = "INSERT INTO Social_Media_Handles (student_ID, socmed_type, socmed_url, last_modified, created) VALUES (?,?,?,?,?)";
      values = [newValue.userId, "LinkedIn", newValue.linkedIn, lastModified, created];
      queryOut = await sqlQuery(sql,values);
    }
    if (newValue.twitter !== null) {
      sql = "INSERT INTO Social_Media_Handles (student_ID, socmed_type, socmed_url, last_modified, created) VALUES (?,?,?,?,?)";
      values = [newValue.userId, "Twitter", newValue.twitter, lastModified, created];
      queryOut = await sqlQuery(sql,values);
    }
    if (newValue.personalWebsite !== null) {
      sql = "INSERT INTO Social_Media_Handles (student_ID, socmed_type, socmed_url, last_modified, created) VALUES (?,?,?,?,?)";
      values = [newValue.userId, "personalWebsite", newValue.personalWebsite, lastModified, created];
      queryOut = await sqlQuery(sql,values);
    }
  }
  return null;
});

// Send alert to candidate selected
function applicantSelected(receiver, sender, jobName, jobType, jobId, applicantName) {
  return {
    to: receiver,
    from: sender,
    subject: "You have been selected for the job",
    text: "Hey " + applicantName + ",\n\nWould you look at that, you just got select for the " + jobType + " job: " + jobName
         + " (" + jobId + ").\n\nTo accept/decline the job click here to login - https://app.jobox.co.za/login\n\n✌️\nJobox"
  }
}
function applicantDeclines(receiver, sender, jobName, jobType, jobId, applicantName, clientName) {
  return {
    to: receiver,
    from: sender,
    subject: "Applicant has declined the job",
    text: "hey " + clientName + ",\n\nUnfortunetly " + applicantName + " has declined the job offer for " + jobType + " job: " + jobName
          + " (" + jobId + ").\n\nPlease select another applicant for the job. Click here to login - https://app.jobox.co.za/login\n\n✌️\nJobox"
  }
}

// Application document updated
exports.applicantDecision = functions.firestore.document('applications/{applicationsId}')
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();
  const doc = await getDocument("Settings", "Email");
  const setting = doc.data();
  sgMail.setApiKey(setting.apiKey);
  if(newValue.approved === true) {
    sgMail.send(applicantSelected(newValue.applicantEmail, setting.applicantSelected, newValue.jobName, newValue.jobType, newValue.jobId, newValue.applicant));
  }
  if(newValue.approved === false && newValue.status === "decline") {
    //send chat bot message
    const bot = new SlackBot({
      token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
      name: 'jobox_app'
    })
    bot.on('start', () => {
      const params = {
          icon_emoji: ':robot_face:'
      }
      bot.postMessageToChannel(
          'random',
          "Dear Jobox Team,\n\n" + " jobId = " + newValue.jobId + " has been declined",
          params
      );
    })

    sgMail.send(applicantDeclines(newValue.clientEmail, setting.applicantDecline, newValue.jobName, newValue.jobType, newValue.jobId, newValue.applicant, newValue.clientName));
  }

  return null;
});

// Send alert to client
function clientEmail(messageType, receiver, sender, jobName, jobId, clientName, applicantName) {
  var subject = null;
  var message = null;
  if(messageType === "application") {
    subject = applicantName + " has applied for your job";
    message = "Hey " + clientName + ",\n\nGreat news!"+ applicantName + " just applied for the job you posted:" 
  }
  if(messageType === "accept") {
    subject = "Student has accepted the job you have posted";
    message = "Hey " + clientName + ",\n\n" + applicantName + " has accepted the job: " + jobName + " (" + jobId +
              ").\n\nThis job is now active. You will receive a notification once the student has completed the job.\n\n✌️\nJobox";
  }
  if(messageType === "complete") {
    subject = applicantName + " has completed the job";
    message = "Hey " + clientName + ",\n\n" + applicantName + " has completed the job you posted: " + jobName + " (" + jobId +
              ").\n\nTo confirm completion click here to login - https://app.jobox.co.za/login \n\n✌️\nJobox";
  }
  if(messageType === "studentRatingClient") {
    subject = applicantName + " has rated the job you have posted";
    message = "Hey " + clientName + ",\n\n" + applicantName + " has given you a rating on the job you posted:" + jobName + " (" + jobId +
    ").\n\nTo view your rating, rate the student. Click here to login - https://app.jobox.co.za/login \n\n✌️\nJobox";
  }
  if(messageType === "summary") {
    subject = "";
    message = "";
  }
  return {
    to: receiver,
    from: sender,
    subject: subject,
    text: message
  }
}

// Send alert to student
function studentEmail(messageType, receiver, sender, jobName, jobId, clientName, studentName) {
  var subject = null;
  var message = null;
  if(messageType === "accept") {
    subject = "You have accepted the job";
    message = "Hey " + studentName + ",\n\nYou have accepted the job: " + jobName + " (" + jobId +
    ").\n\nTo view the details of this job, remember to login and head over to the active jobs tab.\n\nOnce you have completed the job, remember to indicate completion on the job page in order to get paid.\n\n✌️\nJobox";
  }
  if(messageType === "rate") {
    subject = "Looks like the client has confirmed completion of the job!";
    message = "Hey " + studentName + ",\n\n" + clientName + " has confirmed completion of " + jobName + " (" + jobId +
    ").\n\nTo rate and review the order click here to login - https://app.jobox.co.za/login \n\nYour review will only become available once you have reviewed the client.\n\n✌️\nJobox";
  }
  if(messageType === "clientRatingStudent") {
    subject = "Client has rated you!";
    message = "Hey " + studentName + ",\n\n" + applicantName + " has given you a rating on the job you completed:" + jobName + " (" + jobId +
    ").\n\nTo view your rating, rate the client. Click here to login - https://app.jobox.co.za/login \n\n✌️\nJobox";
  }
  if(messageType === "summary") {
    subject = "";
    message = "";
  }
  return {
    to: receiver,
    from: sender,
    subject: subject,
    text: message
  }
}
// New application
exports.newApplication = functions.firestore.document('applications/{applicationsId}')
.onCreate(async (snap, context) => {
  const value = snap.data();
  var lastModified = new Date(value.lastModified);
  var created = new Date(value.created);
  var sql = "INSERT INTO Applications (job_ID, student_ID, status, approved, last_modified, created) VALUES (?,?,?,?,?,?)";
  var values = [value.jobId, value.studentId, value.status, value.approved, lastModified,  created];
  var queryOut = await sqlQuery(sql,values);
  const doc = await getDocument("Settings", "Email");
  const setting = doc.data();
  sgMail.setApiKey(setting.apiKey);
  sgMail.send(clientEmail("application", value.clientEmail, value.clientName, value.companyName, value.name, value.jobType, value.jobId, value.phone));
  return null;
});
// Updates in Micro table
exports.jobStatus = functions.firestore.document('micros/{microsId}')
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();
  const doc = await getDocument("Settings", "Email");
  const setting = doc.data();
  sgMail.setApiKey(setting.apiKey);
  // Student accepts job
  if(previousValue.status === "select" && newValue.status === "active") {
    sgMail.send(clientEmail("accept", newValue.clientEmail, setting.active, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
    sgMail.send(studentEmail("accept", newValue.studentEmail, setting.active, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
  }
  // Student completes job
  if(newValue.status === "complete") {
    sgMail.send(clientEmail("complete", newValue.clientEmail, setting.complete, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
  }
  // Client confirms completion
  if(newValue.status === "rate" && newValue.clientRatingComplete === false && newValue.studentRatingComplete === false) {
    sgMail.send(studentEmail("rate", newValue.studentEmail, setting.rate, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
  }
  // Student rates client
  if(previousValue.studentRatingComplete === false && newValue.studentRatingComplete === true) {
    sgMail.send(clientEmail("studentRatingClient", newValue.clientEmail, setting.rate, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
  }
  // Client rates student
  if(previousValue.clientRatingComplete === false && newValue.clientRatingComplete === true) {
    sgMail.send(studentEmail("clientRatingStudent", newValue.studentEmail, setting.rate, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
  }
  // Client confirms completion
  if(newValue.status === "summary") {
    //sgMail.send(clientEmail("summary", newValue.clientEmail, setting.summary, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
    //sgMail.send(studentEmail("summary", newValue.studentEmail, setting.summary, newValue.name, newValue.jobId, newValue.clientName, newValue.studentName));
  }

  //cancelled 
  if(previousValue.status !== "cancelled" && newValue.status === "cancelled") {
    //send chat bot message
    const bot = new SlackBot({
      token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
      name: 'jobox_app'
    })
    bot.on('start', () => {
      const params = {
          icon_emoji: ':robot_face:'
      }
      bot.postMessageToChannel(
          'random',
          "Dear Jobox Team,\n\n" + " jobId = " + newValue.jobId + " has been cancelled",
          params
      );
    })
  }

  //dissatisfied 
  if(previousValue.status !== "dissatisfied" && newValue.status === "dissatisfied") {
    //send chat bot message
    const bot = new SlackBot({
      token: `xoxb-13549599124-1709663809237-tdLLwfcIdU48xlXiurbs7HG5`,
      name: 'jobox_app'
    })
    bot.on('start', () => {
      const params = {
          icon_emoji: ':robot_face:'
      }
      bot.postMessageToChannel(
          'random',
          "Dear Jobox Team,\n\n" + " jobId = " + newValue.jobId + " is rated as dissatisfied",
          params
      );
    })
  }
  return null;
});

// New vetted
exports.createVetted = functions.firestore.document('vetted/{studentId}')
.onCreate(async (snap, context) => {
  const value = snap.data();
  var mysqlConnection = await createMySQLconnection();
  var lastModified = new Date(value.created);
  var created = new Date(value.lastModified);
  //get the student ID from students 
  const studentsDoc =  await getDocument("students", snap.id);
  const studentsDocData = studentsDoc.data();
  const studentId = studentsDocData.userId;
  //iterate over the different skills in the vetting document
  for (const skill in value) {
    const isVetted = value[skill];
    // now skill and isVetted are the property name and value that can be inserted to MySQL

    //if a field is not a skill, skip to the next iteration
    if (skill === "created" || skill === "lastModified" || skill === "userId") {
      continue;
    }
    var sql = "INSERT INTO Vettings (student_ID, expertise, is_vetted, last_modified, created) VALUES (?,?,?,?,?)";
    var values = [studentId, skill, isVetted, lastModified, created];
    var query = mysqlConnection.query(sql, values, (error) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(query.sql);
      }
    });
  }
  mysqlConnection.end((error) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log('The connection is terminated now');
    }
  });
  return null;
});

//Updated vetted
exports.updateVetted = functions.firestore.document('vetted/{studentId}')
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();
  var mysqlConnection = await createMySQLconnection();
   //get the student ID from students 
   const studentsDoc =  await getDocument("students", change.after.id);
   const studentsDocData = studentsDoc.data();
   const studentId = studentsDocData.userId;

  //iterate over the different skills in the vetting document
  for (const skill in newValue) {
    const isVetted = newValue[skill];
    // now skill and isVetted are the property name and value 

    //only update if there was a change
    if (newValue[skill] !== previousValue[skill])
    {
      var sql = "UPDATE Vettings SET is_vetted = ? WHERE student_ID = ? AND expertise = ? AND is_vetted = ? ";
      var values = [isVetted, studentId, skill, previousValue[skill]];
      var query = mysqlConnection.query(sql, values, (error) => {
        if (error) {
          console.log(error);
        }
        else {
          console.log(query.sql);
        }
      });
    }
  }
  mysqlConnection.end((error) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log('The connection is terminated now');
    }
  });
  return null;
});


//for testing 
app.get('/query', (req, res) => {
  const settings_ref = admin.firestore().collection('students').doc('jeanpierre-joubert-1876');
    settings_ref.get()
    .then(snap => { 
      const data = snap.data();
      for (const key in data.industryCategory) {
          const value = data.industryCategory[key];
          console.log(key + ":" + value)
          // now key and value are the property name and value
      }
      console.log("finished");
      console.log("inludes Banana: " + data.industryCategory.includes("Banana"));
      console.log("inludes Administration: " + data.industryCategory.includes("Administration"));
      return null;
    })
    .catch(err => {
      console.log(err);
    })
});
