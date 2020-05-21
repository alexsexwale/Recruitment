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

// exports.support = functions.https.onCall((data, context) => {
//     const user = admin.firestore().collection('users');
//     let userId = firebase.auth().currentUser.uid;
//     user.where('userId', '==', userId).get()
//       .then(snapshot => {
//         snapshot.forEach(doc => {
//             let subject = data.subject;
//             let message = data.message;
//             let sender =  doc.data().name + " " + doc.data().surname;
//             let email = doc.data().email; 
            
//             if(subject && message && email && sender)
//             {		
//                 const msg = {
//                     to: "contact@jobox.co.za",
//                     from: email,
//                     subject: subject,
//                     text: message
//                 }
//                 sgMail.send(msg);

//                 // db.collection('support').add({
//                 //     subject: subject,
//                 //     message: message,
//                 //     //created: moment(Date.now()).format('L'),
//                 //     email: email,
//                 //     sender: sender,
//                 // });
//             }
//             else
//             {
//                 res.json(errorResponse(400));
//             }
//         })
        
//     }).catch(err => {
//         console.log(err.message);
//         throw new functions.https.HttpsError('failed to connect');
//     });
// })
