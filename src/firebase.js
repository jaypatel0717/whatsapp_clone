import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCmw6VCLmPPHUGl80vHozPDl3-yOIkHrhA",
    authDomain: "whatsappclone-f3409.firebaseapp.com",
    databaseURL: "https://whatsappclone-f3409.firebaseio.com",
    projectId: "whatsappclone-f3409",
    storageBucket: "whatsappclone-f3409.appspot.com",
    messagingSenderId: "198833860734",
    appId: "1:198833860734:web:f0d0b06a515208b42fe82f"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig); 
const db = firebaseApp.firestore()
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;