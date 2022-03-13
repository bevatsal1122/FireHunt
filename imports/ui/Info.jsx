import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import '/imports/api/collection';
import readfromcloudfs from '/compability/get-user-data.mjs';

export const Info = () => {
  const posts = useTracker(() => {
    return Posts.find({draft: {$exists: false}}, {
      sort: {time: -1},
      limit: 8
    }).fetch();
  });

  var i=0;
  function retIDfollow () {
    var x = i.toString() + "follow";
    i++;
    return x;
  }

  return (
    <div id="post-area">
      <ul>{posts.map(
        apost =>
        <div key={apost._id} className="post">
          <li>
            <div className="poster-name">{apost.author} &ensp;</div>
            <div className="poster-vp"><a href = {"./viewprofile/" + apost.author}>View Profile</a></div>
            <div>
              <p className="content-paras">
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
