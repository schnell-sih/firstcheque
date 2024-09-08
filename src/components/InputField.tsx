import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-2 border-neutral-400 rounded-full px-4 py-2 w-full bg-gray-100 text-black"
      />
    </div>
  );
};

export default InputField;
