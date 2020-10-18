import { Box } from "grommet";
import React from "react";

export const Img = ({ src, alt, size = "medium" }) => (
  <Box as="img" src={src} alt={alt} width={size} style={{ margin: "auto" }} />
);

function getStyle(direction) {
  return {
    ...(direction !== "center"
      ? { float: direction, padding: "0 1em" }
      : { display: "block", margin: "auto" }),
  };
}

// height, width
// size = small, xsmall, xxsmall,
// direction = left, center, right
export const Image = ({
  src,
  description = "",
  alt = null,
  size = "medium",
  direction = "center",
}) => (
  <Box as="figure" style={getStyle(direction)} width={size}>
    <Img src={src} alt={alt || description} size={size} />
    {description && <figcaption>{description}</figcaption>}
  </Box>
);
