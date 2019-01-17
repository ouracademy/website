import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share";
import { Box } from "grommet";

export default ({ title, description, url }) => (
  <Box direction="row" gap="small">
    <FacebookShareButton url={url} quote={title}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <TwitterShareButton url={url} title={title}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
    <LinkedinShareButton
      url={url}
      title={title}
      description={description}
      windowWidth={750}
      windowHeight={600}
    >
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>
  </Box>
);
