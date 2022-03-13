// Importing Functions from SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc, collection
  } from 'firebase/firestore';
  import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
var userName, userUserName, userEmail, userAge, usertonotify, userBio, userPosts;

// Function to Read Data from Firebase Firestore Database
async function readfromcloudfs(accountuid)
{
  const docSnap = await getDoc(doc(db, "accounts", accountuid));
  if (docSnap.exists())
  {
    userName = docSnap.data().name;
    userUserName = docSnap.data().username;
    userEmail = docSnap.data().email;
    userAge = docSnap.data().age;
    usertonotify = docSnap.data().tonotify;
    userBio = docSnap.data().bio;
    userPosts = docSnap.data().posts;
  }
  else
  {
      alert("No such Account Found!!");
  }
  return {
    userName: userName,
    userUserName: userUserName,
    userEmail: userEmail,
    userAge: userAge,
    usertonotify: usertonotify,
    userBio: userBio,
    userPosts: userPosts,
  }
}

export default readfromcloudfs;
