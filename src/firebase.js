import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB5wlgc1_OtG9AnD0vTjRMUc_PfcGaoCi4",
  authDomain: "clone-bb125.firebaseapp.com",
  projectId: "clone-bb125",
  storageBucket: "clone-bb125.appspot.com",
  messagingSenderId: "717503363840",
  appId: "1:717503363840:web:5cd316beceedcc22c551e5",
  measurementId: "G-JE4X12YYEP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
