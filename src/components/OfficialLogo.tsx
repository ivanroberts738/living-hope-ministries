import React from 'react';

interface OfficialLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'full' | 'icon' | 'horizontal';
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  className = '',
  size = 64,
  showText = true,
  variant = 'full'
}) => {
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <OfficialLogo variant="icon" size={size} showText={false} />
        {showText && (
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-blue-900 tracking-tight text-lg leading-tight uppercase font-serif">
              Buhugu Living Hope
            </span>
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase">
              Ministries • Sironko–Bulambuli
            </span>
            <span className="text-[10px] italic text-slate-500 font-medium">
              "HOPE FOR ALL HUMAN KIND"
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-auto max-w-full drop-shadow-sm"
      >
        <defs>
          {/* Blue Gradient for stylized 'B' */}
          <linearGradient id="blhmBlueGrad" x1="100" y1="50" x2="400" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#0044BB" />
            <stop offset="100%" stopColor="#002277" />
          </linearGradient>

          {/* Red Gradient for Ribbon */}
          <linearGradient id="blhmRedGrad" x1="50" y1="320" x2="450" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E51920" />
            <stop offset="50%" stopColor="#D01018" />
            <stop offset="100%" stopColor="#A80008" />
          </linearGradient>

          {/* Circular path for top arc text */}
          <path id="circleTextPath" d="M 70 250 A 180 180 0 1 1 430 250" />
        </defs>

        {/* Outer Circle Ring */}
        <circle cx="250" cy="250" r="230" stroke="#0044BB" strokeWidth="12" fill="#FFFFFF" />
        <circle cx="250" cy="250" r="215" stroke="#0044BB" strokeWidth="3" fill="none" />

        {/* Top Arc Text: BUHUGU LIVING HOPE MINISTRIES */}
        <text fill="#003399" fontSize="24" fontWeight="800" fontFamily="sans-serif" letterSpacing="2.5">
          <textPath href="#circleTextPath" startOffset="50%" textAnchor="middle">
            BUHUGU LIVING HOPE MINISTRIES
          </textPath>
        </text>

        {/* Red Accent Dots flanking the top text */}
        <circle cx="95" cy="245" r="8" fill="#E51920" />
        <circle cx="405" cy="245" r="8" fill="#E51920" />

        {/* Outer decorative arc lines */}
        <path d="M 105 270 A 150 150 0 0 0 100 320" stroke="#0044BB" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 395 270 A 150 150 0 0 1 400 320" stroke="#0044BB" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Center Stylized 'B' Logo Emblem */}
        <g id="EmblemB">
          {/* Main B Stem & Loops */}
          <path
            d="M 170 90 L 280 90 C 350 90 380 140 380 185 C 380 220 350 245 300 250 C 360 255 390 295 390 345 C 390 400 330 410 260 410 L 140 410 L 140 330 L 290 330 C 310 330 320 315 320 300 C 320 285 305 275 270 275 L 210 275 L 210 225 L 270 225 C 300 225 310 205 310 190 C 310 170 295 155 260 155 L 210 155 L 210 360 L 170 360 Z"
            fill="url(#blhmBlueGrad)"
          />

          {/* Script Text 'BLHM' on the middle bar */}
          <text
            x="270"
            y="265"
            fill="#111827"
            fontSize="32"
            fontWeight="900"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            textAnchor="middle"
          >
            BLHM
          </text>

          {/* Open Book Graphic at base of 'B' */}
          <g id="OpenBook" transform="translate(140, 335)">
            <path
              d="M 0 20 C 50 10 100 20 110 30 C 120 20 170 10 220 20 L 220 32 C 170 22 120 32 110 40 C 100 32 50 22 0 32 Z"
              fill="#002277"
            />
            <path
              d="M 5 22 C 55 12 105 22 110 30 C 115 22 165 12 215 22"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
            />
            <line x1="110" y1="30" x2="110" y2="42" stroke="#FFFFFF" strokeWidth="3" />
          </g>
        </g>

        {/* Lower Red Ribbon Banner */}
        <g id="RedRibbon">
          {/* Ribbon Tail Left */}
          <path d="M 30 340 L 80 320 L 80 390 L 30 400 L 55 370 Z" fill="#A80008" />
          {/* Ribbon Tail Right */}
          <path d="M 470 340 L 420 320 L 420 390 L 470 400 L 445 370 Z" fill="#A80008" />

          {/* Ribbon Main Fold Left/Right back shadows */}
          <path d="M 75 385 L 100 330 L 100 410 L 75 390 Z" fill="#7A0005" />
          <path d="M 425 385 L 400 330 L 400 410 L 425 390 Z" fill="#7A0005" />

          {/* Main Ribbon Body Arc */}
          <path
            d="M 80 330 Q 250 380 420 330 L 410 400 Q 250 450 90 400 Z"
            fill="url(#blhmRedGrad)"
          />

          {/* Banner Text: HOPE FOR ALL HUMAN KIND */}
          <path id="ribbonTextPath" d="M 90 355 Q 250 405 410 355" fill="none" />
          <text fill="#FFFFFF" fontSize="23" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
            <textPath href="#ribbonTextPath" startOffset="50%" textAnchor="middle">
              HOPE FOR ALL HUMAN KIND
            </textPath>
          </text>
        </g>

        {/* Bottom Location Text: — SIRONKO-BULAMBULI • UGANDA — */}
        <path id="locationTextPath" d="M 90 425 Q 250 470 410 425" fill="none" />
        <text fill="#003399" fontSize="18" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.5">
          <textPath href="#locationTextPath" startOffset="50%" textAnchor="middle">
            — SIRONKO-BULAMBULI • UGANDA —
          </textPath>
        </text>
      </svg>
    </div>
  );
};
