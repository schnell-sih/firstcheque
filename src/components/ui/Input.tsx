import React from "react";

interface InputProps {
  placeholder: string;
  value: string | number;
  type?: string;
  onTextChange: (value: string | number) => void;
}

const Input = ({
  placeholder,
  value,
  type = "text",
  onTextChange,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="px-4 py-2 rounded-full border border-neutral-400 text-black w-full"
      value={value}
      onChange={(e) =>
        onTextChange(type === "number" ? +e.target.value : e.target.value)
      }
    />
  );
};

export default Input;
