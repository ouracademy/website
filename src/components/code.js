import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/styles/hljs";

const codeTheme = github;

/**
 * Use it <Code language="javascript">{`const a = b + c`}</Code>
 * @see lenguajes-innovadores.mdx for Component syntax
 * @see arquitectura-hexagonal.mdx for markdown syntax (like normal .md)
 */
export default ({ children, language }) => (
  <SyntaxHighlighter style={codeTheme} language={language}>
    {removeSpaces(children)}
  </SyntaxHighlighter>
);

const removeSpaces = code => {
  const lines = getLines(code);
  const spaces = spacesOnLeft(lines[0]);
  return lines.map(line => line.substring(spaces, line.length)).join("\n");
};

const getLines = code => {
  const lines = code.split("\n");
  const firstLineWithCodeIndex = isBlank(lines[0]) ? 1 : 0;
  return lines.slice(firstLineWithCodeIndex);
};

const spacesOnLeft = str => str.match(/^ */)[0].length;

const isBlank = str => !str || /^\s*$/.test(str);
