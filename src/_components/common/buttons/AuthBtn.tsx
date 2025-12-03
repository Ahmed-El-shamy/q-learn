import React from "react";

interface AuthBtnProp {
  text: string;
  classname?: string;
}

const AuthBtn = ({ text }: AuthBtnProp) => {
  return (
    <button className="bg-primary text-white font-bold py-3 rounded-lg cursor-pointer">
      {text}
    </button>
  );
};

export default AuthBtn;
