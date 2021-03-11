//const admin = require("firebase-admin");
const firebase = require('@firebase/rules-unit-testing');
var serviceAccount = require("../permissions.json");
const fs = require('fs');
let path = require('path');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://joboxza.firebaseio.com"
// });
firebase.loadFirestoreRules({
  projectId: "joboxza",
  rules: fs.readFileSync(__dirname + "/firestore.rules", "utf8")
});
const admin = firebase.initializeAdminApp({ projectId: "joboxza" });
const db = admin.firestore();
const storage = admin.storage();


// Firestore - get single document
function getDocument(collection, id) {
  return db.collection(collection).doc(id).get();
}

module.exports = {db, storage, getDocument}