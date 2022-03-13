import { Meteor } from 'meteor/meteor';
import React from 'react';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const ResetPasswordHere = () => {


  // Error Handling Function
  function errorHandling (errorCode)
  {
    if (errorCode==="auth/invalid-email")
    {
      alert("Please Enter Valid E-Mail ID !!");
    }
    else if (errorCode==="auth/user-not-found")
    {
      alert("No Regsitered Account found with E-Mail ID !!");
    }
    else if (errorCode==="auth/user-disabled")
    {
      alert("Sorry, Registered User Account with E-Mail ID is disabled. You may write us at support-firehunt@gmail.com or contact the Developer of System (Vatsal Sanchala).");
    }
    else
    {
      alert(errorCode);
    }
  }

  // Event Listener for Send Password Reset E-Mail button
  const sendForgEmail = (e) => {
    e.preventDefault();
    const email = document.getElementById("forg-email").value;
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password Reset E-Mail Sent
      document.getElementById("send-forg-email").style.display = "none";
      document.getElementById("sent-forg-email").style.display = "block";
    })
    .catch((error) => {
      errorHandling(error.code);
    });
  }

  return (
    <div id="center-resetpass">
    Password Reset
    <hr noshade="false" className = "hrchange"/>
    <input type="text" placeholder="Enter E-Mail ID" id="forg-email" spellCheck="false"/>
    <button type="submit" id="send-forg-email">Send Password Reset E-Mail</button>
    <div style={{fontSize: "26px", marginTop: "2.5vh"}} id="sent-forg-email">Password Reset E-Mail Sent</div>
    <a href="./login"><button type="submit" id="go-to-login">Go to Login</button></a>
  </div>
  );
};
