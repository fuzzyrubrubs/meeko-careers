import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDo9aBXGyr8iPfiLuEhD9GugfYwfEVqxII",
  authDomain: "meeko-careers.firebaseapp.com",
  projectId: "meeko-careers",
  storageBucket: "meeko-careers.appspot.com",
  messagingSenderId: "163640641259",
  appId: "1:163640641259:web:afa321f0f478f86d2560ae",
  measurementId: "G-87D6QV40TP"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const functions = firebaseApp.functions();
const storage = firebaseApp.storage();
const storageRef = storage.ref();



export { firebase, db, auth, functions, storage, storageRef };


