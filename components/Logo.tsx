
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Yellow House Shape */}
      <path d="M10 45 L50 10 L90 45 V90 H10 Z" stroke="#FBBF24" strokeWidth="6" strokeLinejoin="round" />
      {/* Inner Purple Structure */}
      <path d="M25 50 L50 28 L75 50 V82 H25 Z" stroke="#6B21A8" strokeWidth="4" fill="#6B21A822" />
      {/* People Circles */}
      <circle cx="50" cy="40" r="5" fill="#6B21A8" />
      <circle cx="35" cy="58" r="5" fill="#6B21A8" />
      <circle cx="65" cy="58" r="5" fill="#6B21A8" />
      {/* Bodies */}
      <path d="M40 45 Q50 48 60 45" stroke="#6B21A8" strokeWidth="6" strokeLinecap="round" />
      <path d="M30 65 Q35 68 40 65" stroke="#6B21A8" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 65 Q65 68 70 65" stroke="#6B21A8" strokeWidth="6" strokeLinecap="round" />
      {/* Heart */}
      <path d="M50 58 L53 55 A3 3 0 0 0 47 55 L50 58 Z" fill="#6B21A8" />
      <path d="M50 58 Q48 56 46 54 A3 3 0 0 1 50 50 A3 3 0 0 1 54 54 Q52 56 50 58" fill="#6B21A8" />
    </svg>
  );
};

export default Logo;
