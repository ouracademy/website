import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/styles/hljs";

const codeTheme = github;

export default ({ children, language }) => (
  <SyntaxHighlighter style={codeTheme}>
    {removeSpaces(children)}
  </SyntaxHighlighter>
);

const removeSpaces = code => {
  const lines = code.split("\n");
  const result = lines.slice(1); // real first line with code is 1

  const firstLineWithCode = result[0];
  const spaces = spacesOnLeft(firstLineWithCode);
  return result.map(line => line.substring(spaces, line.length)).join("\n");
};

const spacesOnLeft = str => str.match(/^ */)[0].length;

const isBlank = str => !str || /^\s*$/.test(str);
