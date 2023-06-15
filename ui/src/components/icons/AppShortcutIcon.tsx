import { IconProps } from "./icon";

export function AppShortcutIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_949_2724)">
      <rect width="24" height="24" rx="4" fill="#F5F5F5" style={{ mixBlendMode: 'multiply' }}/>
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="#666666" strokeWidth="2" strokeLinejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_949_2724">
      <rect width="24" height="24" rx="4" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}