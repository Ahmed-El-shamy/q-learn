import React, { ComponentProps } from "react";

interface HTMLConvertorProps {
  html: string;
}

const HTMLConvertor: React.FC<ComponentProps<"div"> & HTMLConvertorProps> = ({ html, ...props }) => {
  return (
    <div
      className="reset"
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};

export default HTMLConvertor;

