import { Meteor } from 'meteor/meteor';
import React from 'react';

export const NavigationMyDP = () => {

  var colorPhase = true;
  const invokecharge = () => {
    if (colorPhase === true)
    {
      document.body.style.backgroundColor = "white";
      document.getElementById("my-posts-drafts-heading").style.color = "black";
      colorPhase = false;
    }
    else
    {
      document.body.style.backgroundColor = "#000d1a";
      document.getElementById("my-posts-drafts-heading").style.color = "white";
      colorPhase = true;
    }
  }

  return (
    <div id="navigate-options-0">
      <a onClick = {invokecharge}>Charge 🧿</a>
      <a href="../mainpage">Home</a>
      <a href="../account">Account </a>
    </div>
  );
};
