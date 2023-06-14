// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHEsxxzEAKCGwyC36kFWJ56qtVLc9UEbg",
  authDomain: "diabetic-app1.firebaseapp.com",
  projectId: "diabetic-app1",
  storageBucket: "diabetic-app1.appspot.com",
  messagingSenderId: "74453232103",
  appId: "1:74453232103:web:8a8283c95b222198f77542",
  measurementId: "G-B57056XPQ9",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
