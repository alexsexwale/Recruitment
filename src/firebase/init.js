import firebase from "firebase/app";
import firestore from "firebase/firestore";

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

export default firebaseApp.firestore();
