import { Meteor } from 'meteor/meteor';
import React from 'react';
import readfromcloudfs from '/compability/get-user-data.mjs';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc
} from "firebase/firestore";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export const ChangeNameHere = () => {

  var uidUniv;
  // Function to Update Name in Firebase Firestore Database
  async function updateincloudfs(accountuid, accountName)
  {
    await updateDoc(doc(db, "accounts", accountuid), {
      name: accountName
    })
    .then(() => {
      // Name Update Successful
      document.getElementById("chang-name").style.display = "none";
      document.getElementById("go-to-profile-changename").style.display="none";
      document.getElementById("name-changed").style.display = "block";
      setTimeout(() => {
        location="./account";
      }, 2600);
    })
    .catch((error) => {
      // Name Update Fail
      alert(error.code);
    })
  }

  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      const uid = user.uid;
      uidUniv = uid;
    }
    else
    {
      location="./";
    }
  });

  // Event Listener for Update Name button
  const changName = (e) => {
    e.preventDefault();
    let userAcc = readfromcloudfs(uidUniv);
    userAcc.then((data) => {
      const username = document.getElementById("current-email-changename").value;
      if (username === "")
      {
        alert("Enter Username !!");
      }
      else if (document.getElementById("change-account-name").value === "")
      {
        alert("Void Name Field");
      }
      else if (username != data.userUserName)
      {
        alert("Incorrect Username !!");
      }
      else
      {
        const user = auth.currentUser;
        const newName = document.getElementById("change-account-name").value;
        updateincloudfs(uidUniv,newName);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (

    <div id="center-changename">
      Change Name
      <hr noshade="false" className = "hrchange"/>
      <input type="text" placeholder="Enter Your Username" className="change-username" id="current-email-changename" spellCheck="false"/>
      <input type="text" placeholder="Enter Name" className="change-name" id="change-account-name"/>
      <button type="submit" id="chang-name" onClick = {changName} className = "change-buttons"> Update Name&ensp;</button>
      <div style={{fontSize: "28px", fontWeight: "bold", marginTop: "2.8vh"}} id="name-changed">Name Changed Successful</div><br />
      <a href="./account"><button type="submit" id="go-to-profile-changename">Go to Profile</button></a>
    </div>

  );
}
