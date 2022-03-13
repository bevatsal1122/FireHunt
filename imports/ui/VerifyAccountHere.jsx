import { Meteor } from 'meteor/meteor';
import React from 'react';
import '/imports/api/collection';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


export const VerifyAccountHere = () => {

  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      if (user.emailVerified===true)
      {
        location="./account";
      }
    }
    else
    {
      location="./";
    }
  });

  return (

  <div style={{marginTop: "5vh", marginLeft: "1.4vw"}} id="main-toshow">
    <h1>Please Verify Your Account E-Mail ID to proceed to your Profile Page !!</h1>
  </div>

  );
};
