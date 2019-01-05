import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share";

export default ({ title, description, url }) => (
  <div>
    <ul>
      <li>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </li>
      <li>
        <LinkedinShareButton
          url={url}
          title={title}
          description={description}
          windowWidth={750}
          windowHeight={600}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </li>
    </ul>
  </div>
);
