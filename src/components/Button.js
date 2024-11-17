import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button className="button-uniform" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
