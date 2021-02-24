const admin = require("firebase-admin");

var serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://joboxza.firebaseio.com"
});

const db = admin.firestore();

// Firestore - get single document
function getDocument(collection, id) {
  return db.collection(collection).doc(id).get();
}

module.exports = {db, getDocument}