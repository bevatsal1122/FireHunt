import { Meteor } from 'meteor/meteor';
import React from 'react';

export const NavigationOptions = () => {

  var colorPhase = true;
  const invokecharge = () => {
    if (colorPhase === true)
    {
      document.body.style.backgroundColor = "white";
      colorPhase = false;
    }
    else
    {
      document.body.style.backgroundColor = "#000d1a";
      colorPhase = true;
    }
  }
  const invokemyposts = () => {
    location = "./allposts/" + document.getElementById("fill-username").innerHTML;
  }

  return (
    <div>
      <a onClick = {invokecharge}>Charge 🧿</a>
      <a onClick = {invokemyposts}>My Posts</a>
      <a href="./account">Account </a>
    </div>
  );
};
