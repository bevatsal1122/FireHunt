import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import readfromcloudfs from '/compability/get-user-data.mjs';
import '/imports/api/collection';

export const MyFFHere = () => {

  var userUserName = window.location.href.slice(37, 55);

  const list0 = useTracker(() => {
    return FollowList.find({
      followhost: userUserName,
    }).fetch();
  });

  const list1 = useTracker(() => {
    return FollowList.find({
      followeat: userUserName,
    }).fetch();
  });

  return (

    <div id="whole-ff">
      <div id="following-ff"><br />
        <h1 style={{userSelect: "none"}}>&ensp;---------- Following ----------</h1>
        <ul id="following-list-ff">{list0.map(
          element0 =>
          <div key={element0._id}>
            <label><li><a href={"../viewprofile/" + element0.followeat}>{element0.followeat}</a></li></label>
          </div>)}
        </ul>
      </div>
      <div id="quick-links-ff">
        <a href="../mainpage">Home</a><br /><br />
        <a href="../account">My Account</a>
      </div>
      <div id="followers-ff"><br />
        <h1 style={{userSelect: "none"}}>&ensp;----------- Followers -----------</h1>
        <ul id="followers-list-ff">{list1.map(
          element1 =>
          <div key={element1._id}>
            <label><li><a href={"../viewprofile/" + element1.followhost}>{element1.followhost}</a></li></label>
          </div>)}
        </ul>
      </div>
    </div>
  );
};
