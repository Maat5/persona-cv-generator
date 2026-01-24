/* 
 * Logo/Document icon component
 */

interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 24, className }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="7" height="9" rx="1" fill="currentColor"/>
      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="12" y="3" width="9" height="5" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="12" y="10" width="9" height="11" rx="1" fill="currentColor"/>
    </svg>
  );
}
