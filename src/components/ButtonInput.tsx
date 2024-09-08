"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonInput: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <div className={`inline-block w-3/12 ${className}`}>
      <button
        onClick={onClick}
        className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonInput;
