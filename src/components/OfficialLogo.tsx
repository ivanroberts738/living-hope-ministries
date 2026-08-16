// src/components/OfficialLogo.tsx
import logo from './logo.png';

interface OfficialLogoProps {
  className?: string;
}

// THIS IS THE FIX - use "export" not "export default"
export const OfficialLogo = ({ className = "w-16 h-16" }: OfficialLogoProps) => {
  return (
    <img 
      src={logo} 
      alt="Living Hope Ministries Logo" 
      className={`${className} object-contain`}
    />
  );
};

// Also keep default export for backward compatibility
export default OfficialLogo;
