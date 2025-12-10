import React from "react";

interface HTMLConvertorProps {
  html: string;
}

const HTMLConvertor: React.FC<HTMLConvertorProps> = ({ html }) => {
  return (
    <div
      className="reset"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HTMLConvertor;

