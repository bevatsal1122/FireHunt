import React from 'react';

export const IncorrectAddress = () => (
  <div id="all-inc-add">
    <h1>404! Server Not Found...</h1>
      <h2>
          Database refused to connect<br />
          System Rendering Failed...
      </h2>
    <ul>
      <li>Check for the Correct Location</li>
      <li>Check Your Connection</li>
      <li>Check The Proxy and The Firewall</li>
    </ul>
    <h3><span>Go to <a href={window.location.href.slice(0, 22)}>Register Page</a></span><br />
    <span>Go to <a href={window.location.href.slice(0, 22) + "./login"}>Login Page</a></span></h3>
  </div>
);
