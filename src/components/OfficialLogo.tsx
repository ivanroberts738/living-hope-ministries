// src/components/OfficialLogo.tsx
import React from 'react';

interface OfficialLogoProps {
  className?: string;
}

// NAMED EXPORT - so Footer can use { OfficialLogo }
export const OfficialLogo = ({ className = "w-16 h-16" }: OfficialLogoProps) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="35" y="10" width="30" height="80" rx="4" fill="#1E3A5F" />
        <rect x="10" y="35" width="80" height="30" rx="4" fill="#1E3A5F" />
        <circle cx="50" cy="50" r="20" fill="#FCD34D" opacity="0.9" />
        <path d="M50 30 L55 45 L70 45 L58 55 L62 70 L50 60 L38 70 L42 55 L30 45 L45 45 Z" fill="#FCD34D" />
      </svg>
    </div>
  );
};

export default OfficialLogo;
