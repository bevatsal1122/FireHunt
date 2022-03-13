// Importing Functions from SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
  } from 'firebase/firestore';
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to Update Total Posts Count in Firebase Firestore Database
async function updateincloudfs(accountuid, currPosts)
{
  await updateDoc(doc(db, "accounts", accountuid), {
    posts: currPosts + 1
  })
  .then(() => {})
  .catch((error) => {
    // Total Posts Count Update Fail
    alert(error.code);
  })
}

export default updateincloudfs;
