import React from 'react';
import { AllPosts } from './AllPosts.jsx';
import { AllPostsHeading } from './AllPostsHeading.jsx';
import { NavigationMyDP } from '/imports/ui/NavigationMyDP';

export const AllPostsApp = () => {

  return (
    <div>
      <AllPostsHeading/>
      <NavigationMyDP/>
      <AllPosts/>
    </div>
  );
}
