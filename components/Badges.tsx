import React from 'react';

interface BadgeProps {
  className?: string;
}

export const UtilityManagementStewardBadge: React.FC<BadgeProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="steward-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#475569', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="steward-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#cbd5e1', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#94a3b8', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="steward-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g>
      {/* Shield shape */}
      <path d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z" fill="url(#steward-grad)" stroke="url(#steward-accent-grad)" strokeWidth="4"/>
      
      {/* Gear/Cog element */}
      <path d="M100 100 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0" fill="none" stroke="#475569" strokeWidth="10" />
      <g transform="translate(100,100)">
        {[...Array(12)].map((_, i) => (
            <path key={i} d="M 0 -50 L 0 -60" stroke="#475569" strokeWidth="8" transform={`rotate(${i * 30})`}/>
        ))}
      </g>
      
      {/* Water drop */}
      <path d="M100,70 C100,70 125,100 125,120 C125,135 112,145 100,145 C88,145 75,135 75,120 C75,100 100,70 100,70 Z" fill="url(#steward-accent-grad)" filter="url(#steward-glow)" />
    </g>
  </svg>
);

export const DigitalWaterProBadge: React.FC<BadgeProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="digital-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0e7490', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0369a1', stopOpacity: 1 }} />
      </linearGradient>
       <linearGradient id="digital-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#67e8f9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
      </linearGradient>
       <filter id="digital-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g>
      {/* Hexagon shape */}
      <path d="M100 20 L173.2 60 L173.2 140 L100 180 L26.8 140 L26.8 60 Z" fill="url(#digital-grad)" stroke="url(#digital-accent-grad)" strokeWidth="3"/>

      {/* Circuit lines */}
      <path d="M100 90 L100 50 M100 50 L130 35 M100 50 L70 35" fill="none" stroke="url(#digital-accent-grad)" strokeWidth="2" opacity="0.7"/>
      <path d="M173.2 100 L130 100 M130 100 L115 75 M130 100 L115 125" fill="none" stroke="url(#digital-accent-grad)" strokeWidth="2" opacity="0.7"/>
      <path d="M26.8 100 L70 100 M70 100 L85 75 M70 100 L85 125" fill="none" stroke="url(#digital-accent-grad)" strokeWidth="2" opacity="0.7"/>
      <circle cx="130" cy="35" r="3" fill="url(#digital-accent-grad)" />
      <circle cx="70" cy="35" r="3" fill="url(#digital-accent-grad)" />
      <circle cx="115" cy="75" r="3" fill="url(#digital-accent-grad)" />
      <circle cx="85" cy="75" r="3" fill="url(#digital-accent-grad)" />
       <circle cx="115" cy="125" r="3" fill="url(#digital-accent-grad)" />
      <circle cx="85" cy="125" r="3" fill="url(#digital-accent-grad)" />

      {/* Water drop */}
      <path d="M100,80 C100,80 120,105 120,120 C120,132 111,140 100,140 C89,140 80,132 80,120 C80,105 100,80 100,80 Z" fill="url(#digital-accent-grad)" filter="url(#digital-glow)"/>
    </g>
  </svg>
);
