import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import '/imports/api/collection';
import readfromcloudfs from '/compability/get-user-data.mjs';
import updateincloudfs from '/compability/update-user-data-posts.mjs';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const Hello = () => {

  let uidUniv;
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

  const addtolist = () => {
   var x = document.getElementById("texttoadd").value;
   if (x === "")
   {
     alert("Empty Post cannot be Added!!");
     return;
   }
   let userAcc = readfromcloudfs(uidUniv);
   userAcc.then((data) => {
     updateincloudfs(uidUniv, data.userPosts);
     Posts.insert({
       text: x,
       author: data.userUserName,
       time: new Date()
     })
     document.getElementById("texttoadd").value = "";
   })
   .catch((error) => {
     console.log(error);
   })
 }

 const addtodrafts = () => {
  var y = document.getElementById("texttoadd").value;
  if (y === "")
  {
    alert("Empty Post cannot be Added!!");
    return;
  }
  let userAcc = readfromcloudfs(uidUniv);
  userAcc.then((data) => {
    Posts.insert({
      text: y,
      draft: data.userUserName,
      time: new Date()
    })
    document.getElementById("texttoadd").value = "";
  })
  .catch((error) => {
    console.log(error);
  })
}

  return (
    <div>
    <form id="post-form">
      <textarea placeholder="How do you feel today ??" id="texttoadd" required spellCheck="false"></textarea>
      <button type="button" onClick={addtolist}>🚀</button>
      <button type="button" onClick={addtodrafts}>Draft</button>
    </form>
    </div>
  );
};
