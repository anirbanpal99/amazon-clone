import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAge9hl2NMqq9d6CKLy7aE0by7nCC0qffQ",
    authDomain: "challenge-74241.firebaseapp.com",
    databaseURL: "https://challenge-74241.firebaseio.com",
    projectId: "challenge-74241",
    storageBucket: "challenge-74241.appspot.com",
    messagingSenderId: "488772288345",
    appId: "1:488772288345:web:ab613804eb317cdc9c1648",
    measurementId: "G-WYXPQCVXXC"
  };

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore();
const auth = firebase.auth();

export { db, auth };