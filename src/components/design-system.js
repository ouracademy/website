import React from "react";
import { preToCodeBlock } from "mdx-utils";
import Code from "./code";

import styled from "styled-components";

export const CenteredImage = styled.img`
  display: block;
  max-width: 75%;
  margin: auto;
`;

const Blockquote = styled.blockquote`
  padding-left: 20px;
  margin: 0 0 20px;
  border-left: 5px solid #eee;

  p {
    padding: 5px;
  }
`;

export default {
  Code: preProps => {
    const props = preToCodeBlock(preProps);
    return props ? (
      <Code language={props.language}>{props.codeString}</Code>
    ) : (
      <pre {...preProps} />
    );
  },
  Blockquote,
  Image: props => <CenteredImage {...props} />
};
