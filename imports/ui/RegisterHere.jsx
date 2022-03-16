import { Meteor } from 'meteor/meteor';
import React from 'react';
import '/imports/api/collection';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc
} from "firebase/firestore";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase & Declaring Services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to Pass Data to Firebase Firestore Database
async function addtocloudfs(name, username, email, age, tonotify, accountuid)
{
  const docRef = await setDoc(doc(db, "accounts", accountuid), {
      name: name,
      username: username,
      email:email,
      age: age,
      tonotify: tonotify,
      bio: "Hello Here !! Let's have some fun 😋",
      posts: 0
  });
}

export const RegisterHere = () => {

  var z=false;
  const button2List = (e) => {
    e.preventDefault();
    z=!z;
    if (z)
    {
      document.getElementById("ask-notify").innerHTML += "<small> ✔️<small>";
    }
    else
    {
      document.getElementById("ask-notify").innerHTML = "Notify me about Future Updates";
    }
  }

  const button1List = (e) => {

    e.preventDefault();
    var name=document.getElementById("user-name").value;
    var username=document.getElementById("user-username").value;
    var age=document.getElementById("user-age").value;
    // Unfilled Sections Alert
    if (document.getElementById("user-passcode-1").value!=document.getElementById("user-passcode-2").value)
    {
      alert("Passwords didn't match !!");
    }
    else if (name==="")
    {
      alert("Enter Name !!");
    }
    else if (username==="")
    {
      alert("Enter Username !!");
    }
    else if (age==="")
    {
      alert("Enter Age !!");
    }
    else
    {
      if (UsedUserName.find({usedUN: username}).count() === 0)
      {
      const email=document.getElementById("user-email").value;
      const password=document.getElementById("user-passcode-1").value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Account Successfully Registered
          document.getElementById("form-show-reg").style.display="none";
          document.getElementById("loading-show-reg").style.display="block";
          document.getElementById("loading-show-reg").innerHTML=`<img src="/loading.gif" alt="Loading..." id="loading-anim-reg"><br>
          <span id="loading-text-reg">Building Empire... Have Cookies 🍪 till then !!</span>`
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser)
          .then(() => {});
          addtocloudfs(name, username, email, age, z, user.uid);
          UsedUserName.insert({
            usedUN: username,
            uidUN: user.uid
          })
          setTimeout(()=>{
            location = "./mainpage";
          }, 7740);
        })
        .catch((error) => {
          // Account Registration Failed
          const errorCode = error.code;
          if (errorCode==="auth/invalid-email")
          {
            alert("Please Enter Valid E-Mail ID !!");
          }
          else if (errorCode==="auth/email-already-in-use")
          {
            alert("Already Regsitered Account found with same E-Mail ID !!");
          }
          else if (errorCode==="auth/weak-password")
          {
            alert("Too Weak Password !!");
          }
          else if (errorCode==="auth/internal-error")
          {
            alert("Void Password Field !!");
          }
          else
          {
            alert(errorCode);
          }
        });
      }
      else
      {
        alert("Username already in Use. Please try another Username !!");
      }
    }
  }

  const seeornot = () => {
    var a=document.getElementById("user-passcode-1");
    var b=document.getElementById("user-passcode-2");
    var y=document.getElementById("open-eye-reg");
    var z=document.getElementById("slash-eye-reg");
    if (a.type==="password")
    {
      a.type="text";
      b.type="text";
      y.style.display="none";
      z.style.display="block";
    }
    else
    {
      a.type="password";
      b.type="password";
      z.style.display="none";
      y.style.display="block";
    }
  }

  return (
  <div>
   <div id="name-reg" className="nottoselect">
     <h1>Register with FireHunt & Let's do Magic 🎉</h1>
   </div>

   <div id="form-show-reg">
     <div align="center" id="outer-reg">
        <div className="nottoselect" id="register-bar">Register</div>
        <form align="center">
           <input type="text" placeholder="What's your Name ??" style={{marginTop: "22px"}} id="user-name" spellCheck="false"/><br /><br />
           <input type="text" placeholder="What should We call You ??" id="user-username" spellCheck="false"/><br /><br />
           <input type="text" placeholder="Enter Your E-Mail ID" id="user-email" spellCheck="false"/><br /><br />
           <input type="text" inputMode="numeric" placeholder="How Old are You ??" id="user-age"/><br /><br />
           <input type="password" placeholder="Create Password" id="user-passcode-1"/><br /><br />
           <input type="password" placeholder="Confirm Password" id="user-passcode-2"/><br />
           <p style={{paddingLeft: "3px"}} className="nottoselect">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
           <button type="submit" className="nottoselect" id="button1-reg" onClick={button1List}>
             <b style={{fontSize: "1.3vw"}}>Sign Up</b>
           </button>
           <br />
           <button type="button" id="button2-reg" onClick={button2List}>
              <b style={{fontSize: "1.2vw"}} id="ask-notify">Notify me about Future Updates</b>
           </button>
        </form>

        <p style={{marginTop: "3vh"}}>
          <b>Already have an Account ?? Login here <a href="./login" className="quick-link-reg"> ➔</a></b>
        </p>
     </div>
     <div onClick={seeornot} id="right-option-reg">
       <img src="/open-eye.png" className="eye-icons" id="open-eye-reg"/>
       <img src="/slash-eye.png" className="eye-icons" id="slash-eye-reg"/>
     </div>
   </div>

   <div id="loading-show-reg">
   </div>
  </div>

  );
};
