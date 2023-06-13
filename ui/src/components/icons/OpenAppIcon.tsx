import React from 'react';
import { IconProps } from './icon';

export default function OpenAppIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 16"
      fill="none"
    >
      <path
        className="fill-current"
        fillRule="evenodd"
        d="M8 2.4H2a.6.6 0 0 0-.6.6v6a.6.6 0 0 0 .6.6h2.073A5.505 5.505 0 0 1 8.6 5.073V3a.6.6 0 0 0-.6-.6Zm2 2.622V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2.022A5.5 5.5 0 1 0 10 5.022Zm3.6 5.478a4.1 4.1 0 1 1-8.2 0 4.1 4.1 0 0 1 8.2 0Z"
        clipRule="evenodd"
      />
      <path
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M21 7.5v-3m0 3h3m-3 0h-3m3 0v3"
      />
    </svg>
  );
}
