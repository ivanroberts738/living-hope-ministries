// src/components/OfficialLogo.tsx
import logo from './logo.png';

interface OfficialLogoProps {
  className?: string;
}

const OfficialLogo = ({ className = "w-16 h-16" }: OfficialLogoProps) => {
  return (
    <img 
      src={logo} 
      alt="Living Hope Ministries Logo" 
      className={`${className} object-contain`}
    />
  );
};

export default OfficialLogo;
