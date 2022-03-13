import React from 'react';
import { MyDrafts } from './MyDrafts.jsx';
import { MyDraftsHeading } from './MyDraftsHeading.jsx';
import { NavigationMyDP } from '/imports/ui/NavigationMyDP';

export const MyDraftsApp = () => (
  <div>
    <MyDraftsHeading/>
    <NavigationMyDP/>
    <MyDrafts/>
  </div>
);
