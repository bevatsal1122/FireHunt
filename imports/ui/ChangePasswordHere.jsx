import { Meteor } from 'meteor/meteor';
import React from 'react';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import readfromcloudfs from '/compability/get-user-data.mjs';
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const ChangePasswordHere = () => {

  var uidUniv;
  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      const uid = user.uid;
      uidUniv = uid;
    }
    else
    {
      location = "./";
    }
  });

  // Event Listener for Change Password button
  const changPass = (e) => {
    e.preventDefault();
    let userAcc = readfromcloudfs(uidUniv);
    userAcc.then((data) => {
      const username = document.getElementById("current-email-changepass").value;
      if (username === "")
      {
        alert("Enter Username !!");
      }
      else if (username != data.userUserName)
      {
        alert("Incorrect Username !!");
      }
      else if (document.getElementById("change-passcode-1").value!=document.getElementById("change-passcode-2").value)
      {
        alert("Passwords didn't match !!");
      }
      else if (document.getElementById("change-passcode-1").value === "")
      {
        alert("Void Password Field");
      }
      else
      {
        const user = auth.currentUser;
        const newPassword = document.getElementById("change-passcode-1").value;
        updatePassword(user, newPassword)
        .then(() => {
          // Password Change Successful
          document.getElementById("chang-pass").style.display = "none";
          document.getElementById("go-to-profile-changepass").style.display="none";
          document.getElementById("passcode-changed").style.display = "block";
          setTimeout(() => {
          location="./account";
        }, 2600);
        })
        .catch((error) => {
          // Password Change Fail
          if (error.code === "auth/requires-recent-login")
          {
            alert("You should login recently in order to change password");
          }
          else
          {
            alert(error.code);
          }
        });
      }
    })
    .catch((error) => {
      console.log(error.code)
    });
  }

  return (

  <div id="center-changepass">
    Change Password
    <hr noshade="false" className = "hrchange"/>
    <input type="text" placeholder="Enter Your Username" className="change-username-changepass" id="current-email-changepass" spellCheck="false"/>
    <input type="password" placeholder="Enter New Password" className="change-password-changepass" id="change-passcode-1"/>
    <input type="password" placeholder="Confirm New Password" className="change-password-changepass" id="change-passcode-2"/>
    <button type="submit" id="chang-pass" onClick = {changPass} className = "change-buttons">Change Password&ensp;</button>
    <div style={{fontSize: "27px", marginTop: "2.6vh"}} id="passcode-changed">Password Update Successful</div><br />
    <a href="./account"><button type="submit" id="go-to-profile-changepass">Go to Profile</button></a>
  </div>

  );
};
