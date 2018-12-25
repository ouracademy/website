import React from "react";

/**
 *  use it for twitter @username
 * as a string tag (postprocessor)  at`username`
 * or as a normal function at('username')
 **/
export const at = (twitterUserName, ...values) => (
  <a href={`https://twitter.com/${twitterUserName}`} target="blank">
    @{twitterUserName}
  </a>
);

export const At = ({ user }) => at(user);
