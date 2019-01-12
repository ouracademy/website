import React from "react";
import { Image as CloudinaryImage } from "cloudinary-react";

/**
 * Use this class only if you want to use an image
 * from cloudinary repo (avoid this as possible)
 */
const Image = ({ src, ...rest }) => (
  <CloudinaryImage
    cloudName="our-academy"
    publicId={`articles/${src}`}
    {...rest}
  />
);

export default Image;
