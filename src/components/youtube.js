import React from "react";

// A component to embed a youtube video, just by copying and pasting the url of the video
export const Youtube = ({ src = "", title }) => {
  const url = src.replace(
    "https://www.youtube.com/watch?v=",
    "https://www.youtube.com/embed/"
  );

  return (
    <iframe
      width="560"
      height="315"
      src={url}
      style={{ display: "block", marginTop: "10px" }}
      frameBorder="0"
      allowFullScreen
      title={title}
    />
  );
};
