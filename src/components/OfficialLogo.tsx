// src/components/OfficialLogo.tsx
import React from 'react';
import logo from './logo.png';

interface OfficialLogoProps {
  className?: string;
}

export const OfficialLogo = ({ className = "w-16 h-16" }: OfficialLogoProps) => {
  return (
    <img 
      src={logo} 
      alt="Living Hope Ministries Logo" 
      className={`${className} object-contain`}
    />
  );
};

export default OfficialLogo;
