"use client";
export const CloseIcon = ({ size = 20, ...props }) => (
  <svg
    fill="none"
    height={size}
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
