import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="border-2 border-neutral-400 rounded-full px-4 py-2 w-full bg-gray-100 text-black"
      />
    </div>
  );
};

export default InputField;
