import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAPgJe-AKjNhNPXACLlKPsNHnWXhmMmHw",
  authDomain: "linkdin-clone-f67f3.firebaseapp.com",
  projectId: "linkdin-clone-f67f3",
  storageBucket: "linkdin-clone-f67f3.firebasestorage.app",
  messagingSenderId: "152102845024",
  appId: "1:152102845024:web:18cc018fdf58a595312105"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage, db };