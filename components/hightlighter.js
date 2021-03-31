import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Hightlighter({ children }) {
  return (
    <SyntaxHighlighter language="html" style={docco}>
      {children}
    </SyntaxHighlighter>
  );
}
