import React, { ChangeEvent } from "react";

type InputProps = {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  className,
  placeholder,
  value = "",
  onChange,
}: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      type="text"
      className={` bg-[#222533] border border-[#292B38] text-white text-sm rounded-lg  p-3 focus:outline-none ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
