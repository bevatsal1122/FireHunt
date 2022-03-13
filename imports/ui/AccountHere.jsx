import { Meteor } from 'meteor/meteor';
import React from 'react';
import '/imports/api/collection';
import { Mongo } from 'meteor/mongo';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "firebase/firestore";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export const AccountHere = () => {

  var userName, userUserName, userEmail, userAge, usertonotify, userBio, userPosts;
  var toexit=false, uidUniv;

  function updateInitialFollowService(userUserName)
  {
    var followers = FollowList.find({
      followeat: userUserName
    }).count();
    var following = FollowList.find({
      followhost: userUserName
    }).count();
    document.getElementById("total-followers").innerHTML = followers;
    document.getElementById("total-following").innerHTML = following;
  }

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
      document.getElementById("user-name").innerHTML = `${userName}`;
      document.getElementById("user-username").innerHTML = `@${userUserName}`;
      document.getElementById("user-email").innerHTML = `${userEmail}`;
      document.getElementById("biotoadd").innerHTML = `${userBio}`;
      document.getElementById("total-posts").innerHTML = `${userPosts}`;
      updateInitialFollowService(userUserName);
    }
  }

  // Function to Read Biography from Firebase Firestore Database
  async function readbiofromcloudfs(accountuid)
  {
    const docSnap = await getDoc(doc(db, "accounts", accountuid));
    if (docSnap.exists())
    {
      userBio = docSnap.data().bio;
      document.getElementById("biotoadd").innerHTML = `${userBio}`;
    }
  }

  // Function to Delete Data from Firebase Firestore Database
  async function deletefromcloudfs(accountuid)
  {
    await deleteDoc(doc(db, "accounts", accountuid));
  }

  // Navigate to E-Mail ID Authentication Page & Exit Page Upon Logout
  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      const uid = user.uid;
      uidUniv = uid;
      if (user.emailVerified === false)
      {
        location="./verifyaccount";
      }
      readfromcloudfs(uid);
    }
    else
    {
      if (toexit)
      {
        setTimeout(() => {
        location="./login";
      }, 4450);
      }
      else
      {
        location="./";
      }
    }
  });

  // Event Listener for Logging Out
  const invokeLogout = () => {
    let confirml = confirm("By confirming, You will be logged out from your account...");
    if (confirml)
    {
      toexit=true;
      signOut(auth)
      .then(() => {
        //Account Logout Successful
        document.getElementById("form-show-acc").style.display="none";
        document.getElementById("loading-show-acc").style.display="block";
        document.getElementById("loading-show-acc").innerHTML=`<img src="./lock-closing.gif" alt="Loading..." id="loading-anim-acc"><br>
        <span id="loading-text-acc">Logging out 😖... Come back soon :)<span>`;
      })
      .catch((error) => {
        alert(error);
      });
    }
  };

  async function deletePD (uUN)
  {
    const postsDraft = Posts.find({draft: uUN}).fetch();
    postsDraft.forEach(async (item, i) => {
      await Posts.remove({_id: item._id});
    });
    const postsPosted = Posts.find({author: uUN}).fetch();
    postsPosted.forEach(async (item, i) => {
      await Posts.remove({_id: item._id});
    });
    const f1 = FollowList.find({followhost: uUN}).fetch();
    f1.forEach(async (item, i) => {
      await FollowList.remove({_id: item._id});
    });
    const f2 = FollowList.find({followeat: uUN}).fetch();
    f2.forEach(async (item, i) => {
      await FollowList.remove({_id: item._id});
    });
    const usedUName = UsedUserName.find({usedUN: uUN}).fetch();
    await UsedUserName.remove({_id: usedUName[0]._id});
  }

  // Event Listener for Deleting Account
  const invokeDelete = () => {
    let confirmd = confirm("By confirming, Your account will be deleted permanantly. Also, this action can't be undone.");
    if (confirmd)
    {
      let waitResponse = prompt("Please Enter 'DELETE' without quotes in Uppercase Letters to proceed...");
      if (waitResponse === "DELETE")
      {
        toexit=true;
        deletefromcloudfs(uidUniv);
        const user = auth.currentUser;
        deleteUser(user)
        .then(() => {
          //Account Deletion Successful
          document.getElementById("form-show-acc").style.display="none";
          document.getElementById("loading-show-acc").style.display="block";
          document.getElementById("loading-show-acc").innerHTML=`<span id="loading-text-acc-delete">Deleting Account 😰... Come back soon :)<span>`;
          deletePD(userUserName);
        })
        .catch((error) => {
          // Account Deletion Fail
          if (error.code === "auth/requires-recent-login")
          {
            alert("You should Login recently in order to Delete your Account");
          }
          else
          {
            alert(error.code);
          }
        });
      }
      else
      {
        alert("Sorry, Request cannot be proceeded...");
      }
    }
  };

  // Function to Change Biography in Firebase Firestore Database
  async function updateincloudfs(accountuid, accountBio)
  {
    await updateDoc(doc(db, "accounts", accountuid), {
      bio: accountBio
    })
    .then(() => {
      // Bio Update Successful
      readbiofromcloudfs(uidUniv);
    })
    .catch((error) => {
      // Name Update Fail
      alert(error.code);
    })
  }

  const invokeEditBio = () => {
      document.getElementById("self-biography").style.display="none";
      document.getElementById("edit-biography").style.display="block";
      document.getElementById("biotochange").value=document.getElementById("biotoadd").innerHTML;
  };

  const cancelChangeBio = () => {
    document.getElementById("edit-biography").style.display="none";
    document.getElementById("self-biography").style.display="block";
  };

  const changeBio = () => {
    var nB = document.getElementById("biotochange").value;
    updateincloudfs(uidUniv, nB);
    document.getElementById("edit-biography").style.display="none";
    document.getElementById("self-biography").style.display="block";
  };

  const invokeMyPosts = () => {
    location =  "./allposts/"+ userUserName;
  };

  const invokeFFList = () => {
    location = "./viewprofilef&f/" + userUserName;
  }

  return (

  <div id="account-to-show">
    <div id="form-show-acc">
      <div id="name">
        <h1><a href="./mainpage">FireHunt 🌠</a></h1>
      </div>
      <div id="navigate-options-acc">
        <a onClick = {invokeMyPosts}> My Posts</a>
        <a href="./mainpage">Home</a>
      </div>
      <div id="left-side-acc">
        <img src="/robot-face.jpg" alt="Robotic Face" id="face"/>
        <a href="./changename" className="indv-links">Change Name</a>
        <hr noshade="true" align="left" className = "hrleft"/>
        <a href="./changepassword" className="indv-links">Change Password</a>
        <hr noshade="true" align="left" className = "hrleft"/>
        <a className="indv-links" id="invoke-logout" onClick = {invokeLogout}>Logout</a>
        <hr noshade="true" align="left" className = "hrleft"/>
        <a className="indv-links" id="invoke-delete" onClick = {invokeDelete}>Delete Account</a>
        <hr noshade="true" align="left" className = "hrleft"/>
      </div>

      <div id="right-side-acc">
        <h1><big><span id="user-name"></span></big></h1>
        <h2><span id="user-username"></span><br />
        <span id="user-email"></span><br />
        <div id="posts-count"><a onClick = {invokeMyPosts}><span id="total-posts"></span><br />Posts</a></div>&ensp;&ensp;
        <div id="followers-count"><a onClick = {invokeFFList}><span id="total-followers"></span><br />Followers</a></div>
        <div id="following-count"><a onClick = {invokeFFList}><span id="total-following"></span><br />Following</a></div>
        <div id="self-biography" className="anyone">
          <pre><span id="biotoadd"></span></pre>
          <a id="invoke-edit-bio" onClick = {invokeEditBio}>Edit Biography</a>
        </div>
        <div id="edit-biography" className="anyone">
          <textarea id="biotochange" required spellCheck="false"></textarea><br />
          <button type="button" id="change-bio" onClick = {changeBio}>Change</button>&ensp;
          <button type="button" id="cancel-change-bio" onClick = {cancelChangeBio}>Cancel</button>
        </div></h2>
      </div>
    </div>

    <div id="loading-show-acc">
    </div>
  </div>
  );
};
