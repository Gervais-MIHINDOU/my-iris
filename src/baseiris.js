import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD1Wk6FX4JPeld1_WD5V_fbZiEq_rZV7IY",
  authDomain: "iris-consulting.firebaseapp.com",
  databaseURL:
    "https://iris-consulting-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iris-consulting",
  storageBucket: "iris-consulting.appspot.com",
  messagingSenderId: "636561964580",
  appId: "1:636561964580:web:f17323dbf8485127f4e2b1",
  measurementId: "G-VBQVQHDWS4",
});

const baseIris = Rebase.createClass(firebaseApp.database());

const fireStoreIris = Rebase.createClass(firebaseApp.firestore());

// This is a named expor
export { firebaseApp };

export { fireStoreIris };

// this is a default export
export default baseIris;
