import React, { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
};

export default function Button({
  className,
  children,
  onClick,
  secondary = false,
}: ButtonProps) {
  return (
    <button
      className={`${className} text-white  rounded-xl text-sm px-6 py-3 mr-2 mb-2 font-satoshi-medium ${
        !secondary
          ? "bg-teal-500   hover:bg-teal-600"
          : "bg-[#232532] hover:bg-[#232532]/70"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
