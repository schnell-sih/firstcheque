import React, { useState } from "react";

interface SelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  onSelect: (value: string) => void;
  className?: string;
}

const Select = ({
  options,
  placeholder = "Select an option",
  onSelect,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="flex items-center justify-between px-4 py-2 bg-white border border-neutral-400 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-neutral-400 rounded-xl shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 cursor-pointer hover:bg-neutral-200 rounded-xl"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
