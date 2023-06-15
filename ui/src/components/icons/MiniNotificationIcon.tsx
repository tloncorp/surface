import { IconProps } from "./icon";

export function MiniNotificationIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_949_4938)">
      <rect width="24" height="24" rx="4" fill="#E5F4FF" style={{ mixBlendMode: 'multiply' }}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 11C7 8.58104 8.71776 6.56329 11 6.10002V4H13V6.10002C15.2822 6.56329 17 8.58104 17 11V12.382L17.7639 12.7639C18.5215 13.1427 19 13.917 19 14.7639C19 15.9989 17.9989 17 16.7639 17H15C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17H7.23607C6.00112 17 5 15.9989 5 14.7639C5 13.917 5.47852 13.1427 6.23607 12.7639L7 12.382V11ZM11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17H11ZM9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11V12.9267C15 13.3504 15.2394 13.7377 15.6183 13.9272L16.8695 14.5528C16.9495 14.5928 17 14.6745 17 14.7639C17 14.8943 16.8943 15 16.7639 15H7.23607C7.10569 15 7 14.8943 7 14.7639C7 14.6745 7.05052 14.5928 7.1305 14.5528L8.38169 13.9272C8.76063 13.7377 9 13.3504 9 12.9267V11Z" fill="#008EFF"/>
      </g>
      <defs>
      <clipPath id="clip0_949_4938">
      <rect width="24" height="24" rx="4" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}