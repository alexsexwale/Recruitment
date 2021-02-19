/* This code should be a module used in multiple instances */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(cors({ origin: true }));
router.use(urlencodedParser);
router.use(bodyParser.json());
/* ------------------------------------------------------ */

const firebase = require("../config/firebase");
const axios = require("axios");

const db = firebase.db;
const getDocument = firebase.getDocument;

//Routes
/* to do: add jwt */
// Inbound payment
router.post("/activate", (req, res) => {
  if(req.body.TransactionAccepted && req.body.Extra1 && req.body.Extra2 ) {
    db.collection("payments").doc(req.body.Extra1).update({
      inboundPayment: true,
      lastModified: moment(Date.now()).format("L"),
    });

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
router.post("/cancelPayment", (req, res) => {
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
router.post("/decline", async (req, res) => {
    if(req.body.Extra1) {
        db.collection("netcash").add({
          created: moment(Date.now()).format("L"),
          message: "Payment Declined" 
        });
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
/* ------ */

module.exports = router;