import { IconProps } from "./icon";

export function ClockIcon({ className, primary, secondary }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_949_2594)">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20ZM2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12V12.4142L11.2929 12.7071L13.2929 14.7071C13.6834 15.0976 14.3166 15.0976 14.7071 14.7071C15.0976 14.3166 15.0976 13.6834 14.7071 13.2929L13 11.5858V8Z" fill="#FF9040"/>
      </g>
      <defs>
      <clipPath id="clip0_949_2594">
      <rect width="24" height="24" rx="12" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}