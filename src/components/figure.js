import React from "react";
import { CenteredImage } from "./design-system";
import styled from "styled-components";

const Fig = styled.figure`
  display: flex;
  flex-direction: column;
  padding: 0 7.5%;
`;

const FigCaption = styled.figcaption`
  text-align: center;
  padding-top: 1rem;
`;

export const Figure = ({ src, caption }) => (
  <Fig>
    <CenteredImage src={src} alt={caption} />
    <FigCaption>{caption}</FigCaption>
  </Fig>
);
