import { Meteor } from 'meteor/meteor';
import React from 'react';

export const AllPostsHeading = () => {

    var x = window.location.href.slice(31, 55);

    return (
    <div id="my-posts-drafts-heading"><h1>All Posts - <span id="fill-UN">{x}</span></h1></div>
  );
}
