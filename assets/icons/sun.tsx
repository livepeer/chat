import React from "react";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  filled?: boolean;
  onClick?: () => void;
}

export default function Sun({ color, size, filled, className }: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1V2M11 20V21M18.0711 3.92894L17.364 4.63605M4.63605 17.364L3.92894 18.0711M21 11H20M2 11H1M18.071 18.0711L17.3639 17.364M4.63605 4.63605L3.92894 3.92894M17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
