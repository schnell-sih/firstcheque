import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="w-auto flex items-center justify-center">
      <button
        className="bg-black hover:shadow-md hover:shadow-zinc-500 transition-shadow duration-300 ease-in-out block text-white rounded-lg px-6 py-2"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
