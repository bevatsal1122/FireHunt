import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import '/imports/api/collection';

export const AllPosts = () => {

  const posts = useTracker(() => {
    return Posts.find({author: window.location.href.slice(31, 50)}, {
      sort: {time: -1}
    }).fetch();
  });

  return (
    <div id="post-area-0">
      <ul>{posts.map(
        apost =>
        <div key={apost._id} className="post-0">
          <li>
            <div className="poster-name-0">{apost.author}</div>
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
