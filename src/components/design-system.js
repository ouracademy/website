import React from "react";
import { preToCodeBlock } from "mdx-utils";
import Code from "./code";

export default {
  Code: preProps => {
    const props = preToCodeBlock(preProps);
    return props ? (
      <Code language={props.language}>{props.codeString}</Code>
    ) : (
      <pre {...preProps} />
    );
  }
};
