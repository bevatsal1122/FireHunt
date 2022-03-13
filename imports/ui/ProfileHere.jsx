import { Meteor } from 'meteor/meteor';
import React from 'react';
import '/imports/api/collection';
import { Mongo } from 'meteor/mongo';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore, doc, getDoc, setDoc, collection
} from "firebase/firestore";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export const ProfileHere = () => {

  var userName, userUserName, userBio, userPosts;
  var hostUserName, bcounter = 0;


  const buttonFlip = () => {
    var ffchoice = FollowList.find({
      followhost: hostUserName,
      followeat: userUserName
    }).count();

    if (ffchoice > 0)
    {
      document.getElementById("this-acc").innerHTML = "Follow";
      var p = FollowList.find({
        followhost: hostUserName,
        followeat: userUserName
      }).fetch();
      FollowList.remove({_id: p[0]._id});
    }
    else
    {
      document.getElementById("this-acc").innerHTML = "Unfollow";
      FollowList.insert({
        followhost: hostUserName,
        followeat: userUserName
      })
    }
    updateInitialFollowService();
  }

  const buttonChoice = () => {
    var ffchoice = FollowList.find({
      followhost: hostUserName,
      followeat: userUserName
    }).count();
    if (ffchoice > 0)
    {
      document.getElementById("this-acc").innerHTML = "Unfollow";
    }
    else
    {
      document.getElementById("this-acc").innerHTML = "Follow";
    }
  }

  function updateInitialFollowService()
  {
    var followers = FollowList.find({
      followeat: userUserName
    }).count();
    var following = FollowList.find({
      followhost: userUserName
    }).count();
    document.getElementById("total-followers-vp").innerHTML = followers;
    document.getElementById("total-following-vp").innerHTML = following;
  }

  // Function to Read Data from Firebase Firestore Database
  async function loadprofiledatafs()
  {
    var tofind = window.location.href.slice(34, 55);
    var viewusername = UsedUserName.find({
      usedUN: tofind,
      uidUN : {$exists: true}
    }).fetch();
    if (viewusername.length > 0)
    {
      const accountuid = viewusername[0].uidUN;
      const docSnap = await getDoc(doc(db, "accounts", accountuid));
      if (docSnap.exists())
      {
        userName = docSnap.data().name;
        userUserName = docSnap.data().username;
        userBio = docSnap.data().bio;
        userPosts = docSnap.data().posts;
        document.getElementById("user-name-vp").innerHTML = `${userName}`;
        document.getElementById("user-username-vp").innerHTML = `@${userUserName}`;
        document.getElementById("biotoadd-vp").innerHTML = `${userBio}`;
        document.getElementById("total-posts-vp").innerHTML = `${userPosts}`;
        buttonChoice();
        updateInitialFollowService();
      }
    }
    else
    {
      bcounter++;
      if (bcounter>=2 && bcounter<=12)
      {
        loadprofiledatafs();
      }
      else if (bcounter>=13)
      {
        window.location.reload();
      }
    }
  }

  // Function to Read Data from Firebase Firestore Database (Host Profile)
  async function readfromcloudfs(accountuid)
  {
    const docSnap = await getDoc(doc(db, "accounts", accountuid));
    if (docSnap.exists())
    {
      hostUserName = docSnap.data().username;
      if (window.location.href.slice(34, 55) === hostUserName)
      {
        document.getElementById("account-to-show-vp").style.display = "none";
        window.location.replace("../account");
      }
    }
  }

  // Navigate to E-Mail ID Authentication Page & Exit Page Upon Logout
  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      const uid = user.uid;
      readfromcloudfs(uid);
      loadprofiledatafs();
    }
    else
    {
      location="../";
    }
  });

  const invokeAllPosts = () => {
      location =  "../allposts/"+ userUserName;
  };

  const invokeViewFollow = () => {
      location =  "../viewprofilef&f/" + userUserName;
  };

  loadprofiledatafs();

  return (

  <div id="account-to-show-vp">
    <div id="form-show-vp">
      <div id="name">
        <h1><a href="../mainpage">FireHunt 🌠</a></h1>
      </div>
      <div id="navigate-options-vp">
        <a onClick = {invokeAllPosts}> All Posts</a>
        <a href="../mainpage">Home</a>
        <a href="../account">Account</a>
      </div>

      <div id="left-side-vp">
        <img src="/robot-face.jpg" alt="Robotic Face" id="face"/>
      </div>

      <div id="right-side-vp">
        <h1><big><span id="user-name-vp"></span></big></h1>
        <h2><span id="user-username-vp"></span><br />
        <div id="posts-count-vp"><a onClick = {invokeAllPosts}><span id="total-posts-vp"></span><br />Posts</a></div>&ensp;&ensp;
        <div id="followers-count-vp"><a onClick = {invokeViewFollow}><span id="total-followers-vp"></span><br />Followers</a></div>
        <div id="following-count-vp"><a onClick = {invokeViewFollow}><span id="total-following-vp"></span><br />Following</a></div><br /><br />
        <div><button type="button" id="this-acc" onClick = {buttonFlip}></button></div>
        <div id="self-biography-vp" className="anyone">
          <pre><span id="biotoadd-vp"></span></pre>
        </div></h2>
      </div>
    </div>

  </div>
  );
};
