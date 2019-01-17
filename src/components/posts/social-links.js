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
    <Box direction="row" pad="medium" gap="small" fill="true" justify="center">
        <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LinkedinShareButton
            url={url}
            title={title}
            description={description}
            windowWidth={750}
            windowHeight={600}
        >
            <LinkedinIcon size={40} round />
        </LinkedinShareButton>
    </Box>
);
