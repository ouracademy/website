import React from "react";
import styled from "styled-components";
import { Image } from "./image";

export const Blockquote = styled.blockquote`
  padding-left: 20px;
  margin: 0 0 20px;
  border-left: 5px solid #eee;

  p {
    padding: 5px;
  }
`;

export const CenteredImage = (props) => <Image direction="center" {...props} />;
