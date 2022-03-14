import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { DataApp } from '/imports/ui/DataApp';
import { AllPostsApp } from '/imports/ui/AllPostsApp';
import { MyDraftsApp } from '/imports/ui/MyDraftsApp';
import { LoginApp } from '/imports/ui/LoginApp';
import { RegisterApp } from '/imports/ui/RegisterApp';
import { AccountApp } from '/imports/ui/AccountApp';
import { ProfileApp } from '/imports/ui/ProfileApp';
import { VerifyAccountApp } from '/imports/ui/VerifyAccountApp';
import { ChangePasswordApp } from '/imports/ui/ChangePasswordApp';
import { ResetPasswordApp } from '/imports/ui/ResetPasswordApp';
import { ChangeNameApp } from '/imports/ui/ChangeNameApp';
import { MyFFApp } from '/imports/ui/MyFFApp';
import { NavigationOptions } from '/imports/ui/NavigationOptions';
import { IncorrectAddress } from '/imports/ui/IncorrectAddress';

Meteor.startup(() => {
  if (window.location.href.slice(22,30) === "allposts")
  {
    document.title = "FireHunt | All Posts";
    document.getElementById("normal-to-show").style.display = "none";
    render(<AllPostsApp/>, document.getElementById('my-posts-drafts-to-show'));
  }
  else if (window.location.href.slice(22,30) === 'mydrafts')
  {
    document.title = "FireHunt | My Drafts";
    document.getElementById("normal-to-show").style.display = "none";
    render(<MyDraftsApp/>, document.getElementById('my-posts-drafts-to-show'));
  }
  else if (window.location.href.slice(22,34) === "viewprofile/")
  {
    document.title = "FireHunt | View Profile";
    document.getElementById("normal-to-show").style.display = "none";
    document.body.style.backgroundColor = "black";
    render(<ProfileApp/>, document.getElementById('show-here'));
  }
  else if (window.location.href.slice(22,32) === "login")
  {
    document.title = "FireHunt | Login";
    document.getElementById("normal-to-show").style.display = "none";
    render(<LoginApp/>, document.getElementById("show-here"));
    document.body.style.backgroundColor = "#333300";
    document.body.style.fontFamily = "Bahnschrift SemiBold";
  }
  else if (window.location.href.slice(22,34) === "account")
  {
    document.title = "FireHunt | Account";
    document.getElementById("normal-to-show").style.display = "none";
    document.body.style.backgroundColor = "black";
    render(<AccountApp/>, document.getElementById('show-here'));
  }
  else if (window.location.href.slice(22,35) === "mainpage")
  {
    document.title = "FireHunt | Home";
    render(<NavigationOptions/>, document.getElementById('navigate-options'));
    render(<App/>, document.getElementById('main-page'));
    render(<DataApp/>, document.getElementById('left-sec'));
  }
  else if (window.location.href.slice(22,40) === "verifyaccount")
  {
    document.title = "FireHunt | Verify Account";
    document.getElementById("normal-to-show").style.display = "none";
    render(<VerifyAccountApp/>, document.getElementById("show-here"));
  }
  else if (window.location.href.slice(22,41) === "changepassword")
  {
    document.title = "FireHunt | Change Password";
    render(<ChangePasswordApp/>, document.getElementById("show-here"));
    document.body.style.backgroundColor = "black";
    document.getElementById("normal-to-show").style.display = "none";
  }
  else if (window.location.href.slice(22,40) === "resetpassword")
  {
    document.title = "FireHunt | Reset Password";
    document.body.style.backgroundColor = "black";
    render(<ResetPasswordApp/>, document.getElementById("show-here"));
    document.getElementById("normal-to-show").style.display = "none";
  }
  else if (window.location.href.slice(22,37) === "changename")
  {
    document.title = "FireHunt | Change Name";
    document.getElementById("normal-to-show").style.display = "none";
    render(<ChangeNameApp/>, document.getElementById("show-here"));
  }
  else if (window.location.href.slice(22,27) === "")
  {
    document.title = "FireHunt | Register";
    document.getElementById("normal-to-show").style.display = "none";
    render(<RegisterApp/>, document.getElementById('show-here'));
    document.body.style.backgroundColor = "#333300";
    document.body.style.fontFamily = "Bahnschrift SemiBold";
  }
  else if (window.location.href.slice(22,36) === "viewprofilef&f")
  {
    document.title = "FireHunt | View Followers & Following List";
    document.getElementById("normal-to-show").style.display = "none";
    render(<MyFFApp/>, document.getElementById("show-here"));
  }
  else
  {
    document.title = "FireHunt | 404 Error";
    document.body.style.backgroundColor = "#000d1a";
    document.getElementById("normal-to-show").style.display = "none";
    render(<IncorrectAddress/>, document.getElementById("show-here"));
  }
});
