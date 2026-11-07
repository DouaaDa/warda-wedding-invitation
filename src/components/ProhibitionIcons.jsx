import React from 'react';

/**
 * ProhibitionIcons.jsx
 *
 * Professional, elegant prohibition symbols crafted with Deep Plum, Mulberry,
 * and Champagne Gold.
 *
 * Requirements:
 *  - Only TWO symbols:
 *    1. Realistic camera with elegant prohibition slash ("Pas de photos")
 *    2. Child symbol with elegant prohibition slash ("Pas d'enfants")
 *  - Colors: Deep Plum (#773D56), Mulberry (#57263E), Champagne Gold (#B89A69)
 *  - Strict rule: NO video icon, NO third symbol, NO mention of videos.
 */

export function NoPhotosSymbol({ size = 64, className = '', style = {} }) {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-label="Symbole interdiction de photographier"
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC285" />
            <stop offset="50%" stopColor="#B89A69" />
            <stop offset="100%" stopColor="#8C6E3D" />
          </linearGradient>

          <linearGradient id="plumSlash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#773D56" />
            <stop offset="50%" stopColor="#57263E" />
            <stop offset="100%" stopColor="#3D1528" />
          </linearGradient>

          <linearGradient id="cameraBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#773D56" />
            <stop offset="100%" stopColor="#57263E" />
          </linearGradient>
        </defs>

        {/* ── Outer Elegant Circular Ring ── */}
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="url(#goldRing)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.95"
        />
        <circle
          cx="40"
          cy="40"
          r="33"
          stroke="#773D56"
          strokeWidth="1.2"
          fill="rgba(248, 243, 236, 0.75)"
          opacity="0.85"
        />

        {/* ── Realistic Camera Silhouette ── */}
        <g id="camera-illustration">
          {/* Top flash bump / viewfinder */}
          <path
            d="M 33 25 L 36 21 C 36.5 20.5 37.5 20 38.5 20 L 41.5 20 C 42.5 20 43.5 20.5 44 21 L 47 25 Z"
            fill="url(#cameraBody)"
          />
          {/* Little gold shutter button */}
          <rect x="25" y="22" width="6" height="3" rx="1" fill="url(#goldRing)" />
          {/* Main camera body */}
          <rect
            x="20"
            y="25"
            width="40"
            height="28"
            rx="5"
            fill="url(#cameraBody)"
            stroke="url(#goldRing)"
            strokeWidth="1"
          />
          {/* Grip accent line */}
          <line x1="24" y1="28" x2="24" y2="50" stroke="#B89A69" strokeWidth="1" opacity="0.6" />

          {/* Camera Lens Outer Ring */}
          <circle
            cx="40"
            cy="39"
            r="11"
            fill="#3D1528"
            stroke="url(#goldRing)"
            strokeWidth="1.5"
          />
          {/* Camera Lens Inner Glass */}
          <circle cx="40" cy="39" r="8" fill="#57263E" />
          <circle cx="40" cy="39" r="5" fill="#3D1528" />
          <circle cx="38" cy="37" r="2" fill="#F8F3EC" opacity="0.75" />
          {/* Flash window */}
          <circle cx="53" cy="30" r="2" fill="url(#goldRing)" />
        </g>

        {/* ── Elegant Prohibition Slash ── */}
        {/* Subtle shadow underneath slash */}
        <line
          x1="18"
          y1="18"
          x2="62"
          y2="62"
          stroke="#F8F3EC"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="18"
          x2="62"
          y2="62"
          stroke="url(#plumSlash)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="19"
          y1="19"
          x2="61"
          y2="61"
          stroke="url(#goldRing)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export function NoChildrenSymbol({ size = 64, className = '', style = {} }) {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-label="Symbole célébration réservée aux adultes"
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="goldRingChild" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC285" />
            <stop offset="50%" stopColor="#B89A69" />
            <stop offset="100%" stopColor="#8C6E3D" />
          </linearGradient>

          <linearGradient id="plumSlashChild" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#773D56" />
            <stop offset="50%" stopColor="#57263E" />
            <stop offset="100%" stopColor="#3D1528" />
          </linearGradient>

          <linearGradient id="childBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#773D56" />
            <stop offset="100%" stopColor="#57263E" />
          </linearGradient>
        </defs>

        {/* ── Outer Elegant Circular Ring ── */}
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="url(#goldRingChild)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.95"
        />
        <circle
          cx="40"
          cy="40"
          r="33"
          stroke="#773D56"
          strokeWidth="1.2"
          fill="rgba(248, 243, 236, 0.75)"
          opacity="0.85"
        />

        {/* ── Refined Child Silhouette & Carriage ── */}
        <g id="child-silhouette">
          {/* Child Head */}
          <circle
            cx="40"
            cy="27"
            r="6"
            fill="url(#childBody)"
            stroke="url(#goldRingChild)"
            strokeWidth="0.8"
          />

          {/* Child Body / Torso */}
          <path
            d="M 33 46 C 33 37 47 37 47 46 L 47 52 C 47 53 45 54 44 54 L 43 54 L 43 59 C 43 60 41.5 60.5 40.5 59.5 L 39.5 59.5 C 38.5 60.5 37 60 37 59 L 37 54 L 36 54 C 35 54 33 53 33 52 Z"
            fill="url(#childBody)"
          />

          {/* Delicate Baby Blocks / Toy Accent beside */}
          <rect
            x="24"
            y="49"
            width="6"
            height="6"
            rx="1.2"
            fill="none"
            stroke="url(#goldRingChild)"
            strokeWidth="1"
          />
          <text
            x="27"
            y="54"
            fontSize="4.5"
            fontFamily="serif"
            fill="#B89A69"
            textAnchor="middle"
          >
            A
          </text>
        </g>

        {/* ── Elegant Prohibition Slash ── */}
        <line
          x1="18"
          y1="18"
          x2="62"
          y2="62"
          stroke="#F8F3EC"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="18"
          x2="62"
          y2="62"
          stroke="url(#plumSlashChild)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="19"
          y1="19"
          x2="61"
          y2="61"
          stroke="url(#goldRingChild)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

