export function BrandLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="16" className="fill-primary-600 dark:fill-primary-500" />
      <rect
        x="15"
        y="15"
        width="34"
        height="34"
        rx="4"
        stroke="#F3FBF7"
        strokeWidth="2.5"
      />
      <rect
        x="15"
        y="15"
        width="34"
        height="34"
        rx="4"
        transform="rotate(45 32 32)"
        stroke="#F3FBF7"
        strokeWidth="2.5"
      />
      <path
        d="M22 27.5C25.5 26 29 26.5 32 28.5C35 26.5 38.5 26 42 27.5V39.5C38.5 38 35 38.5 32 40.5C29 38.5 25.5 38 22 39.5V27.5Z"
        fill="#F3FBF7"
      />
      <path d="M32 28.5V40.5" className="stroke-primary-700" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="21" r="2" className="fill-accent-300" />
    </svg>
  );
}
