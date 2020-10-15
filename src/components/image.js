import { Box } from "grommet";
import React from "react";

// height, width
// size = small, xsmall, xxsmall,
// direction = left, center, right
export const Image = ({
  src,
  description = "",
  alt = null,
  size = "medium",
  direction = "center",
  ...rest
}) => {
  const alternative = alt || description;

  return (
    <Box
      as="figure"
      style={{
        ...(direction !== "center"
          ? { float: direction }
          : { display: "block", maxWidth: "75%", margin: "auto" }),
      }}
      width={{ max: size }}
    >
      <img
        src={src}
        alt={alternative}
        style={{
          display: "block",
          maxWidth: "75%",
          margin: "auto",
          ...rest,
        }}
      />
      {description && (
        <figcaption style={{ fontSize: "15px", marginTop: "10px" }}>
          {description}
        </figcaption>
      )}
    </Box>
  );
};

// <figure style="float:left;max-height:500px;width:100%;max-width:400px;margin-right:20px;margin-left:0">
//     <img src="/images/sommerville.jpg" alt="Mi copia de sommerville" style="margin: none; margin-bottom: 10px;" />
//     <figcaption style="font-size:15px;">Mi copia del libro. Uno de los libros más importantes que he leido, el 2do libro que lei en la universidad. Gracias a mi madre 🙂</figcaption>
// </figure>
