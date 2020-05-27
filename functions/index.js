// import db from "@/firebase/init";
// import firebase from "firebase";
const functions = require('firebase-functions');

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey("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");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.payment = functions.https.onCall((data, context) => {
    
});

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.makePayment = functions.https.onCall((data, context) => {
    
});