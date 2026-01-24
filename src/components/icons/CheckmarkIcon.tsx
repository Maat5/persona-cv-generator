/* 
 * Checkmark icon component (different from CheckIcon in editor)
 */

interface CheckmarkIconProps {
  size?: number;
  className?: string;
}

export function CheckmarkIcon({ size = 20, className }: CheckmarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
