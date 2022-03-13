import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import readfromcloudfs from '/compability/get-user-data.mjs';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const LeftSection = () => {

  let uUserName;
  const loadUserData = (userUID) => {
    let userAcc = readfromcloudfs(userUID);
    userAcc.then((data) => {
      document.getElementById("fill-username").innerHTML = `${data.userUserName}`
      uUserName = data.userUserName;
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function invokemydrafts()
  {
    location = "./mydrafts/" + uUserName;
  }
  function invokeff()
  {
    location = "./viewprofilef&f/" + uUserName;
  }

  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      const uid = user.uid;
      loadUserData(uid);
    }
    else
    {
      location = "./";
    }
  });

  return (
    <div>
      <div id="profile" className="side-box"><a href="./account">Hello <span id="fill-username"></span> 👋</a></div>
      <div id="community" className="side-box"><a onClick = {invokemydrafts} id="mp1">Saved Posts 📃</a></div>
      <div id="following" className="side-box">
        <h3><a onClick = {invokeff}>Following / Followers</a></h3>
      </div>

    </div>
  );
};
