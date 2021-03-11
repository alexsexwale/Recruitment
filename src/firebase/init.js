import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyCHrUuOZeY0wQqlleCp8DimMMynQdzphWY",
  authDomain: "joboxza.firebaseapp.com",
  databaseURL: "https://joboxza.firebaseio.com",
  projectId: "joboxza",
  storageBucket: "joboxza.appspot.com",
  messagingSenderId: "407731314705",
  appId: "1:407731314705:web:7cf03e40889839f6"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

if (window.location.hostname === "localhost") {
  firebaseApp.firestore().settings({ host: 'localhost:5001', ssl: false });
}

export default firebaseApp.firestore();
