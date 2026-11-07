import React from 'react';

/**
 * FloralDecorations.jsx
 *
 * Luxury botanical illustrations and photorealistic floral arrangements
 * for Warda & Yasser's wedding website.
 *
 * Official Palette:
 *  - Blush Pink:     #F5E5E4
 *  - Dusty Rose:     #D9A6AE
 *  - Mauve:          #B77D91
 *  - Wood Rose:      #A66F79
 *  - Deep Plum:      #773D56
 *  - Mulberry:       #57263E
 *  - Warm Ivory:     #F8F3EC
 *  - Cream:          #F3EBDD
 *  - Champagne Gold: #B89A69
 *  - Soft Sage Green:#8A9E8A
 */

/** Photorealistic luxury floral corner arrangement using studio photography */
export function PhotoFloralCorner({
  position = 'top-left',
  size = 240,
  className = '',
  style = {},
  opacity = 0.95,
}) {
  const isRight = position.includes('right');
  const isBottom = position.includes('bottom');
  const transform = `${isRight ? 'scaleX(-1)' : ''} ${isBottom ? 'scaleY(-1)' : ''}`.trim();

  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        transform: transform || undefined,
        transformOrigin: 'center center',
        opacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src="/floral_corner_luxury.jpg"
        alt=""
        loading="lazy"
        className="w-full h-full object-contain"
        style={{
          mixBlendMode: 'multiply',
          filter: 'contrast(1.02) saturate(1.04)',
        }}
      />
    </div>
  );
}

/** Photorealistic horizontal luxury floral garland banner */
export function PhotoFloralGarland({
  width = '100%',
  className = '',
  style = {},
  opacity = 0.92,
}) {
  return (
    <div
      className={`pointer-events-none select-none flex items-center justify-center overflow-hidden ${className}`}
      style={{ width, opacity, ...style }}
      aria-hidden="true"
    >
      <img
        src="/floral_garland_luxury.jpg"
        alt=""
        loading="lazy"
        className="w-full h-auto object-contain max-h-[120px] sm:max-h-[160px]"
        style={{
          mixBlendMode: 'multiply',
          filter: 'contrast(1.02) saturate(1.05)',
        }}
      />
    </div>
  );
}

/** High-detail vector floral corner with gold botanicals */
export function FloralCorner({ position = 'top-left', className = '', style = {}, size = 220 }) {
  const isRight = position.includes('right');
  const isBottom = position.includes('bottom');
  const transform = `${isRight ? 'scaleX(-1)' : ''} ${isBottom ? 'scaleY(-1)' : ''}`.trim();

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: transform || undefined,
        transformOrigin: 'center center',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <radialGradient id="plumRose" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#773D56" />
            <stop offset="45%" stopColor="#57263E" />
            <stop offset="85%" stopColor="#3D1528" />
            <stop offset="100%" stopColor="#25041E" />
          </radialGradient>

          <radialGradient id="mauveRose" cx="40%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#D9A6AE" />
            <stop offset="50%" stopColor="#B77D91" />
            <stop offset="85%" stopColor="#8D5577" />
            <stop offset="100%" stopColor="#5A2E4B" />
          </radialGradient>

          <radialGradient id="blushRose" cx="42%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#FFF0EE" />
            <stop offset="35%" stopColor="#F5E5E4" />
            <stop offset="70%" stopColor="#D9A6AE" />
            <stop offset="95%" stopColor="#A66F79" />
          </radialGradient>

          <radialGradient id="dustyRose" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#F5E5E4" />
            <stop offset="45%" stopColor="#D9A6AE" />
            <stop offset="85%" stopColor="#A66F79" />
            <stop offset="100%" stopColor="#773D56" />
          </radialGradient>

          <radialGradient id="ivoryFlower" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F8F3EC" />
            <stop offset="80%" stopColor="#F3EBDD" />
            <stop offset="100%" stopColor="#D8C6B0" />
          </radialGradient>

          <linearGradient id="eucalyptusLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A3B5A3" />
            <stop offset="50%" stopColor="#8A9E8A" />
            <stop offset="100%" stopColor="#5A6D5A" />
          </linearGradient>

          <linearGradient id="goldBotanical" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC285" />
            <stop offset="50%" stopColor="#B89A69" />
            <stop offset="100%" stopColor="#8C6E3D" />
          </linearGradient>

          <radialGradient id="mulberryBerry" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#8C355E" />
            <stop offset="60%" stopColor="#57263E" />
            <stop offset="100%" stopColor="#2E0B1C" />
          </radialGradient>
        </defs>

        {/* ─── 1. GOLD BOTANICAL BRANCHES ─── */}
        <g opacity="0.85">
          <path
            d="M 12 12 Q 60 20 110 50 Q 155 78 185 130"
            stroke="url(#goldBotanical)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 12 12 Q 22 65 52 115 Q 80 160 135 190"
            stroke="url(#goldBotanical)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <path d="M 68 26 C 75 16 90 18 92 27 C 90 35 78 36 68 26 Z" fill="url(#goldBotanical)" />
          <path d="M 112 52 C 122 45 136 50 135 60 C 130 68 118 64 112 52 Z" fill="url(#goldBotanical)" />
          <path d="M 152 86 C 165 80 176 89 172 98 C 165 105 154 98 152 86 Z" fill="url(#goldBotanical)" />
          <path d="M 180 126 C 192 122 201 133 196 142 C 188 147 178 138 180 126 Z" fill="url(#goldBotanical)" />

          <path d="M 28 72 C 18 78 18 94 28 94 C 36 90 36 78 28 72 Z" fill="url(#goldBotanical)" />
          <path d="M 54 118 C 46 128 50 142 60 140 C 68 135 64 122 54 118 Z" fill="url(#goldBotanical)" />
          <path d="M 88 158 C 82 170 92 182 102 178 C 108 170 100 160 88 158 Z" fill="url(#goldBotanical)" />
          <path d="M 130 188 C 126 200 138 209 146 203 C 151 195 142 186 130 188 Z" fill="url(#goldBotanical)" />

          <path d="M 95 38 Q 120 22 135 32" stroke="url(#goldBotanical)" strokeWidth="1" fill="none" />
          <circle cx="137" cy="33" r="2.2" fill="url(#goldBotanical)" />
          <path d="M 40 102 Q 24 126 34 140" stroke="url(#goldBotanical)" strokeWidth="1" fill="none" />
          <circle cx="35" cy="142" r="2.2" fill="url(#goldBotanical)" />
        </g>

        {/* ─── 2. EUCALYPTUS FOLIAGE ─── */}
        <g opacity="0.95">
          <path d="M 16 16 Q 70 35 130 80 Q 170 115 200 165" stroke="#5A6D5A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 16 16 Q 35 70 80 130 Q 115 170 165 200" stroke="#5A6D5A" strokeWidth="1.8" strokeLinecap="round" />

          <ellipse cx="65" cy="42" rx="14" ry="9" transform="rotate(-15 65 42)" fill="url(#eucalyptusLeaf)" opacity="0.9" />
          <ellipse cx="98" cy="62" rx="15" ry="10" transform="rotate(20 98 62)" fill="url(#eucalyptusLeaf)" opacity="0.95" />
          <ellipse cx="138" cy="92" rx="16" ry="11" transform="rotate(35 138 92)" fill="url(#eucalyptusLeaf)" />
          <ellipse cx="170" cy="128" rx="14" ry="10" transform="rotate(45 170 128)" fill="url(#eucalyptusLeaf)" opacity="0.9" />
          <ellipse cx="195" cy="168" rx="12" ry="8" transform="rotate(55 195 168)" fill="url(#eucalyptusLeaf)" opacity="0.85" />

          <ellipse cx="42" cy="65" rx="9" ry="14" transform="rotate(15 42 65)" fill="url(#eucalyptusLeaf)" opacity="0.9" />
          <ellipse cx="62" cy="98" rx="10" ry="15" transform="rotate(-20 62 98)" fill="url(#eucalyptusLeaf)" opacity="0.95" />
          <ellipse cx="92" cy="138" rx="11" ry="16" transform="rotate(-35 92 138)" fill="url(#eucalyptusLeaf)" />
          <ellipse cx="128" cy="170" rx="10" ry="14" transform="rotate(-45 128 170)" fill="url(#eucalyptusLeaf)" opacity="0.9" />
          <ellipse cx="168" cy="195" rx="8" ry="12" transform="rotate(-55 168 195)" fill="url(#eucalyptusLeaf)" opacity="0.85" />
        </g>

        {/* ─── 3. MULBERRY BERRIES & ACCENTS ─── */}
        <g>
          <circle cx="118" cy="42" r="4.5" fill="url(#mulberryBerry)" />
          <circle cx="126" cy="47" r="3.8" fill="url(#mulberryBerry)" />
          <circle cx="123" cy="37" r="3.2" fill="url(#mulberryBerry)" />
          <circle cx="132" cy="41" r="2.8" fill="url(#goldBotanical)" opacity="0.9" />

          <circle cx="42" cy="118" r="4.5" fill="url(#mulberryBerry)" />
          <circle cx="47" cy="126" r="3.8" fill="url(#mulberryBerry)" />
          <circle cx="37" cy="123" r="3.2" fill="url(#mulberryBerry)" />
          <circle cx="41" cy="132" r="2.8" fill="url(#goldBotanical)" opacity="0.9" />
        </g>

        {/* ─── 4. MAUVE & DEEP PLUM ROSES ─── */}
        <g transform="translate(38, 78)">
          <circle cx="0" cy="0" r="20" fill="url(#plumRose)" />
          <path d="M -16 -6 C -18 8 -4 18 10 16 C 18 10 18 -6 8 -16 C -4 -18 -12 -14 -16 -6 Z" fill="#57263E" opacity="0.85" />
          <path d="M -10 -4 C -12 6 -2 12 6 10 C 12 6 12 -4 4 -10 C -4 -12 -8 -8 -10 -4 Z" fill="#773D56" />
          <path d="M -6 -2 C -8 3 -2 7 3 6 C 7 4 7 -2 2 -6 C -3 -7 -5 -4 -6 -2 Z" fill="#B77D91" opacity="0.8" />
          <circle cx="0" cy="0" r="3" fill="#F8F3EC" opacity="0.6" />
        </g>

        <g transform="translate(78, 38)">
          <circle cx="0" cy="0" r="20" fill="url(#mauveRose)" />
          <path d="M -6 -16 C 8 -18 18 -4 16 10 C 10 18 -6 18 -16 8 C -18 -4 -14 -12 -6 -16 Z" fill="#A66F79" opacity="0.9" />
          <path d="M -4 -10 C 6 -12 12 -2 10 6 C 6 12 -4 12 -10 4 C -12 -4 -8 -8 -4 -10 Z" fill="#B77D91" />
          <path d="M -2 -6 C 3 -8 7 -2 6 3 C 4 7 -2 7 -6 2 C -7 -3 -4 -5 -2 -6 Z" fill="#F5E5E4" opacity="0.75" />
          <circle cx="0" cy="0" r="3" fill="#F8F3EC" opacity="0.7" />
        </g>

        {/* ─── 5. IVORY BLOSSOMS ─── */}
        <g transform="translate(112, 106)">
          <circle cx="0" cy="0" r="14" fill="url(#ivoryFlower)" />
          <ellipse cx="0" cy="-11" rx="6" ry="8" fill="url(#ivoryFlower)" />
          <ellipse cx="10" cy="-3" rx="6" ry="8" transform="rotate(72 10 -3)" fill="url(#ivoryFlower)" />
          <ellipse cx="6" cy="9" rx="6" ry="8" transform="rotate(144 6 9)" fill="url(#ivoryFlower)" />
          <ellipse cx="-6" cy="9" rx="6" ry="8" transform="rotate(216 -6 9)" fill="url(#ivoryFlower)" />
          <ellipse cx="-10" cy="-3" rx="6" ry="8" transform="rotate(288 -10 -3)" fill="url(#ivoryFlower)" />
          <circle cx="0" cy="0" r="4.5" fill="url(#goldBotanical)" />
          <circle cx="0" cy="0" r="2" fill="#57263E" />
        </g>

        {/* ─── 6. BLUSH PINK & DUSTY ROSE GARDEN ROSE ─── */}
        <g transform="translate(56, 56)">
          <circle cx="0" cy="0" r="38" fill="url(#dustyRose)" opacity="0.7" />
          <path d="M -28 -18 C -36 -2 -34 22 -14 34 C 4 42 28 36 36 16 C 42 -4 32 -28 12 -36 C -8 -40 -22 -30 -28 -18 Z" fill="url(#blushRose)" />
          <path d="M -22 -14 C -28 -2 -26 18 -10 26 C 4 32 22 28 28 12 C 32 -4 24 -22 8 -28 C -6 -32 -18 -24 -22 -14 Z" fill="#D9A6AE" opacity="0.8" />
          <path d="M -18 -8 C -22 2 -20 14 -8 20 C 2 24 16 22 20 10 C 24 -2 18 -16 6 -20 C -4 -24 -14 -18 -18 -8 Z" fill="url(#blushRose)" />
          <path d="M -12 -5 C -16 2 -14 10 -5 14 C 2 17 12 15 15 7 C 18 -1 13 -11 4 -14 C -3 -17 -10 -12 -12 -5 Z" fill="#F5E5E4" />
          <path d="M -8 -3 C -10 2 -8 7 -3 10 C 2 12 9 10 11 5 C 13 0 9 -7 3 -9 C -2 -11 -7 -8 -8 -3 Z" fill="#A66F79" />
          <path d="M -5 -2 C -7 1 -5 5 -1 7 C 3 8 7 6 8 3 C 9 0 6 -4 2 -6 C -1 -7 -4 -5 -5 -2 Z" fill="#773D56" />
          <circle cx="1" cy="0" r="2.2" fill="#F8F3EC" opacity="0.9" />
        </g>

        {/* ─── 7. FOREGROUND GOLD SPECKS ─── */}
        <circle cx="78" cy="88" r="2.5" fill="url(#goldBotanical)" />
        <circle cx="88" cy="78" r="2.2" fill="url(#goldBotanical)" />
        <circle cx="145" cy="118" r="1.8" fill="url(#goldBotanical)" />
        <circle cx="118" cy="145" r="1.8" fill="url(#goldBotanical)" />
      </svg>
    </div>
  );
}

/** Reusable Floral Frame for any section or page with responsive corner scaling */
export function FloralFrame({
  corners = ['top-left', 'top-right'],
  size = 230,
  mobileSize = 110,
  className = '',
  opacity = 0.9,
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-10 overflow-hidden ${className}`} aria-hidden="true">
      {corners.includes('top-left') && (
        <div className="absolute top-0 left-0">
          <FloralCorner position="top-left" size={size} className="hidden sm:block" style={{ opacity }} />
          <FloralCorner position="top-left" size={mobileSize} className="sm:hidden" style={{ opacity }} />
        </div>
      )}
      {corners.includes('top-right') && (
        <div className="absolute top-0 right-0">
          <FloralCorner position="top-right" size={size} className="hidden sm:block" style={{ opacity }} />
          <FloralCorner position="top-right" size={mobileSize} className="sm:hidden" style={{ opacity }} />
        </div>
      )}
      {corners.includes('bottom-left') && (
        <div className="absolute bottom-0 left-0">
          <FloralCorner position="bottom-left" size={size} className="hidden sm:block" style={{ opacity }} />
          <FloralCorner position="bottom-left" size={mobileSize} className="sm:hidden" style={{ opacity }} />
        </div>
      )}
      {corners.includes('bottom-right') && (
        <div className="absolute bottom-0 right-0">
          <FloralCorner position="bottom-right" size={size} className="hidden sm:block" style={{ opacity }} />
          <FloralCorner position="bottom-right" size={mobileSize} className="sm:hidden" style={{ opacity }} />
        </div>
      )}
    </div>
  );
}

/** Horizontal floral divider with gold bar, roses & eucalyptus */
export function FloralDivider({ className = '', style = {}, width = '100%', opacity = 0.9 }) {
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width, opacity, ...style }}
      aria-hidden="true"
    >
      <div
        className="flex-1 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(184, 154, 105, 0.2), rgba(184, 154, 105, 0.75))',
        }}
      />

      <div className="mx-3 flex items-center gap-2">
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="transform scale-x-[-1]">
          <path d="M 1 7 Q 10 3 19 1 C 15 7 12 11 1 7 Z" fill="#B89A69" opacity="0.85" />
          <path d="M 6 7 Q 14 8 18 12 C 13 13 9 10 6 7 Z" fill="#8A9E8A" opacity="0.8" />
        </svg>

        <span
          className="inline-block transform scale-110"
          style={{
            color: '#D9A6AE',
            fontSize: '15px',
            textShadow: '0 1px 6px rgba(217, 166, 174, 0.35)',
          }}
        >
          ❀
        </span>

        <span
          style={{
            color: '#B89A69',
            fontSize: '11px',
            margin: '0 -2px',
          }}
        >
          ✦
        </span>

        <span
          className="inline-block transform scale-110"
          style={{
            color: '#B77D91',
            fontSize: '15px',
            textShadow: '0 1px 6px rgba(183, 125, 145, 0.35)',
          }}
        >
          ❀
        </span>

        <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
          <path d="M 1 7 Q 10 3 19 1 C 15 7 12 11 1 7 Z" fill="#B89A69" opacity="0.85" />
          <path d="M 6 7 Q 14 8 18 12 C 13 13 9 10 6 7 Z" fill="#8A9E8A" opacity="0.8" />
        </svg>
      </div>

      <div
        className="flex-1 h-px"
        style={{
          background: 'linear-gradient(to left, transparent, rgba(184, 154, 105, 0.2), rgba(184, 154, 105, 0.75))',
        }}
      />
    </div>
  );
}

/** Floral Header Wreath */
export function FloralHeaderWreath({ className = '', style = {}, size = 160 }) {
  return (
    <div
      className={`pointer-events-none select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size * 0.45, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M 10 50 Q 60 75 100 70 Q 140 75 190 50"
          stroke="#B89A69"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.6"
        />

        <g transform="translate(50, 60)">
          <ellipse cx="-15" cy="-6" rx="9" ry="5" transform="rotate(-25 -15 -6)" fill="#8A9E8A" opacity="0.85" />
          <ellipse cx="-25" cy="-14" rx="8" ry="4" transform="rotate(-40 -25 -14)" fill="#A3B5A3" opacity="0.8" />
          <circle cx="-10" cy="-12" r="7" fill="#D9A6AE" opacity="0.9" />
          <circle cx="-10" cy="-12" r="2" fill="#F8F3EC" />
          <path d="M -30 -18 Q -18 -8 -5 0" stroke="#DFC285" strokeWidth="1" />
          <circle cx="-32" cy="-20" r="2" fill="#B89A69" />
        </g>

        <g transform="translate(100, 64)">
          <circle cx="0" cy="0" r="14" fill="#57263E" opacity="0.95" />
          <circle cx="0" cy="0" r="11" fill="#B77D91" />
          <circle cx="0" cy="0" r="8" fill="#F5E5E4" />
          <circle cx="0" cy="0" r="4" fill="#A66F79" />
          <circle cx="0" cy="0" r="1.8" fill="#F8F3EC" />

          <circle cx="-13" cy="2" r="5" fill="#F8F3EC" />
          <circle cx="-13" cy="2" r="1.5" fill="#B89A69" />
          <circle cx="13" cy="2" r="5" fill="#F8F3EC" />
          <circle cx="13" cy="2" r="1.5" fill="#B89A69" />

          <path d="M 0 -14 L -4 -8 L 0 -10 L 4 -8 Z" fill="#DFC285" />
          <circle cx="0" cy="-17" r="1.8" fill="#B89A69" />
        </g>

        <g transform="translate(150, 60) scale(-1, 1)">
          <ellipse cx="-15" cy="-6" rx="9" ry="5" transform="rotate(-25 -15 -6)" fill="#8A9E8A" opacity="0.85" />
          <ellipse cx="-25" cy="-14" rx="8" ry="4" transform="rotate(-40 -25 -14)" fill="#A3B5A3" opacity="0.8" />
          <circle cx="-10" cy="-12" r="7" fill="#D9A6AE" opacity="0.9" />
          <circle cx="-10" cy="-12" r="2" fill="#F8F3EC" />
          <path d="M -30 -18 Q -18 -8 -5 0" stroke="#DFC285" strokeWidth="1" />
          <circle cx="-32" cy="-20" r="2" fill="#B89A69" />
        </g>
      </svg>
    </div>
  );
}
