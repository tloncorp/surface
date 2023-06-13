import React from 'react';
import { IconProps } from './icon';

export default function CompassIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        className="fill-current"
        fillRule="evenodd"
        d="M12.6 7A5.6 5.6 0 1 1 1.4 7a5.6 5.6 0 0 1 11.2 0ZM14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0ZM5.342 8.658l1.105-2.21 2.211-1.106-1.105 2.21-2.211 1.106Zm4.86-3.719c.365-.73-.41-1.506-1.141-1.14L5.806 5.426a.85.85 0 0 0-.38.38L3.8 9.061c-.366.73.41 1.506 1.14 1.14l3.255-1.627a.85.85 0 0 0 .38-.38L10.2 4.939Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
