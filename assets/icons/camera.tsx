import React from "react";

interface Props {
  size?: number;
  color?: string;
  onClick?: () => void;
  isOff: boolean;
}

export default function Camera({ color, size, onClick, isOff }: Props) {
  return (
    <>
      {isOff ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L21 21M16 8.33333L17.5409 6.68968C18.781 5.36697 21 6.24449 21 8.05756V13.9424C21 14.8287 20.4698 15.4914 19.7829 15.7829M16 8.33333V7C16 4.79086 14.2091 3 12 3H7M16 8.33333V12M3.24948 3.40237C1.91764 4.05162 1 5.41865 1 7V15C1 17.2091 2.79086 19 5 19H12C13.8638 19 15.4299 17.7252 15.874 16"
            stroke={color}
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9H11M5 17H12C14.2091 17 16 15.2091 16 13V5C16 2.79086 14.2091 1 12 1H5C2.79086 1 1 2.79086 1 5V13C1 15.2091 2.79086 17 5 17ZM16 6.33333L17.5409 4.68968C18.781 3.36697 21 4.24449 21 6.05756V11.9424C21 13.7555 18.781 14.633 17.5409 13.3103L16 11.6667V6.33333Z"
            stroke={color}
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      )}
    </>
  );
}
