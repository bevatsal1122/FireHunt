import { Meteor } from 'meteor/meteor';
import React from 'react';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

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
  else if (errorCode==="auth/wrong-password")
  {
    alert("Wrong Password !!");
  }
  else if (errorCode==="auth/popup-blocked")
  {
    alert("Pop-Up blocked by Browser !!");
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

export const LoginHere = () => {

  // Event Listener for Login button
  const button1List = (e) => {
    e.preventDefault();
    const email = document.getElementById("user-email-login").value;
    const password = document.getElementById("user-passcode-login").value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Account Login Successful
        document.getElementById("form-show-login").style.display="none";
        document.getElementById("loading-show-login").style.display="block";
        document.getElementById("loading-show-login").innerHTML=`<img src="/lock-opening.gif" alt="Loading..." id="loading-anim-login"><br>
        <span id="loading-text-login">Entering your Empire... Off the lights 🏮 till then !!</span>`
        const user = userCredential.user;
        setTimeout(()=>{
          location = "./mainpage";
        }, 5440);
      })
      .catch((error) => {
        // Account Login Failed
        errorHandling(error.code);
      });
  }

  // Event Listener for Sign In with Google button
  const provider = new GoogleAuthProvider();
  const button2List = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Getting Google Access Token (Used to access Google API)
        // Account Login Successful
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        location = "./mainpage";
        })
        .catch((error) => {
        // Handling Errors
        // Account Login Failed
        const email = error.email; // E-Mail ID of used User Account
        const credential = GoogleAuthProvider.credentialFromError(error); // Used AuthCredential Type
        errorHandling(error.code);
      });
  }

  const seeornot = () => {
    var a=document.getElementById("user-passcode-login");
    var y=document.getElementById("open-eye-login");
    var z=document.getElementById("slash-eye-login");
    if (a.type==="password")
    {
      a.type="text";
      y.style.display="none";
      z.style.display="block";
    }
    else
    {
      a.type="password";
      z.style.display="none";
      y.style.display="block";
    }
  }

  return (

  <div>
   <div id="name-login" className="nottoselect">
     <h1>Login with FireHunt & Create your Figure 🔥</h1>
   </div>

   <div id="form-show-login">
     <div align="center" id="outer-login">
        <div className="nottoselect" id="login-bar">Login</div>
        <form align="center">
        <br />
        <br />
          <input type="text" placeholder="Enter Your Email ID" id="user-email-login" spellCheck="false"/><br /><br />
          <input type="password" placeholder="Enter Password" id="user-passcode-login"/><br /><br />
           <button type="submit" className="nottoselect" id="button1-login" onClick = {button1List}>
              <b style={{fontSize: "1.25vw"}}>Login</b>
           </button>
           <br />
           <button type="submit" id="button2-login" onClick = {button2List}>
              <b style={{fontSize: "1.2vw"}}>Sign In with Google</b>
           </button>
        </form>

        <p style={{marginTop: "3vh"}} className="nottoselect">
          <b>Don't have an Account ?? Register here
            <a href="./" className="quick-links-login"> ➔</a></b>
        </p>
        <p style={{marginTop: "-1vh"}} className="nottoselect">
          <b>Forgot Password ?? Reset here
            <a href="./resetpassword" className="quick-links-login"> ➔</a></b>
        </p>
     </div>

     <div onClick={seeornot} id="right-option-login">
       <img src="/open-eye.png" className="eye-icons" id="open-eye-login"/>
       <img src="/slash-eye.png" className="eye-icons" id="slash-eye-login"/>
     </div>
   </div>

   <div id="loading-show-login">
   </div>
  </div>

  );
};
