import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB4txhZ0MMYk1VC3OLBgUU9C27lZtdEtvs',
  authDomain: 'msgr-clone-69ca8.firebaseapp.com',
  projectId: 'msgr-clone-69ca8',
  storageBucket: 'msgr-clone-69ca8.appspot.com',
  messagingSenderId: '209102718533',
  appId: '1:209102718533:web:57fcabe34d4a554f97c52c',
  measurementId: 'G-LXZPMCJC5J',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
