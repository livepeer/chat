import React, { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={`text-white bg-teal-500   hover:bg-teal-600 rounded-xl text-sm px-6 py-3 mr-2 mb-2 font-satoshi-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
