import { cn } from "@/utils/cn";
import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({ text, onClick, disabled, className }: ButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <button
        className={cn(
          `hover:shadow-md hover:shadow-zinc-500 transition-shadow duration-300 ease-in-out block bg-black text-white px-6 py-2 rounded-lg`,
          className
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
