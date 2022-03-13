import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import '/imports/api/collection';
import readfromcloudfs from '/compability/get-user-data.mjs';

// Importing Functions from SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '/imports/ui/FirebaseConfig';

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const MyDrafts = () => {

  const loadUserData = (userUID) => {
    let userAcc = readfromcloudfs(userUID);
    userAcc.then((data) => {
      if (data.userUserName != window.location.href.slice(31, 50))
      {
        location = "./" + data.userUserName;
      }
      else
      {
        document.getElementById("post-area-1").style.display = "block";
      }
    })
  }

  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      const uid = user.uid;
      loadUserData(uid);
    }
    else
    {
      location = "../login";
    }
  });


  const posts = useTracker(() => {
    return Posts.find({draft: window.location.href.slice(31, 50)}, {
      sort: {time: -1}
    }).fetch();
  });

  return (
    <div id="post-area-1">
      <ul>{posts.map(
        apost =>
        <div key={apost._id} className="post-0">
          <li>
            <div>
              <p className="content-paras-0">
                <label>{apost.text}</label>
              </p>
            </div>
          </li>
        </div>
      )}
      </ul>
    </div>
  );
};
