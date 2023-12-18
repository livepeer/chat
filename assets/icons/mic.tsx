import React from "react";

interface Props {
  size?: number;
  color?: string;
  onClick?: () => void;
  isOff: boolean;
}

export default function Mic({ color, size, onClick, isOff }: Props) {
  return (
    <>
      {isOff ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 18V21M10 18C6.13401 18 3 14.866 3 11V10M10 18C12.0327 18 13.863 17.1336 15.1418 15.75M10 21H13M10 21H7M1 1.75L19 19.75M17 10V11C17 11.8232 16.8579 12.6132 16.5969 13.3469M14 10.75V5C14 2.79086 12.2091 1 10 1C8.44442 1 7.09624 1.88797 6.43469 3.18469M6 7V11C6 13.2091 7.79086 15 10 15C11.1484 15 12.1838 14.516 12.9133 13.741"
            stroke={color}
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 10V11C15 14.866 11.866 18 8 18M1 10V11C1 14.866 4.13401 18 8 18M8 18V21M8 21H11M8 21H5M8 15C5.79086 15 4 13.2091 4 11V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V11C12 13.2091 10.2091 15 8 15Z"
            stroke={color}
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
}
