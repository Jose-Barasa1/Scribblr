import React from 'react';

export default function ScribbleLogo({ width = 40, height = 40, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Blue Gradients */}
        <linearGradient id="blueTop" x1="25" y1="10" x2="175" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="blueRight" x1="100" y1="50" x2="175" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="blueLeft" x1="25" y1="40" x2="100" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>

        {/* Gold/Yellow Gradients */}
        <linearGradient id="goldTop" x1="25" y1="100" x2="175" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
        <linearGradient id="goldRight" x1="100" y1="140" x2="175" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>
        <linearGradient id="goldLeft" x1="25" y1="130" x2="100" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Soft Drop Shadow Filter */}
        <filter id="layerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#layerShadow)">
        {/* LAYER 1: Top Blue Tile */}
        <g transform="translate(0, 0)">
          {/* Top Surface */}
          <path d="M 100 15 L 170 45 L 100 75 L 30 45 Z" fill="url(#blueTop)" />
          {/* Right Thickness Face */}
          <path d="M 100 75 L 170 45 L 170 57 L 100 87 Z" fill="url(#blueRight)" />
          {/* Left Thickness Face */}
          <path d="M 30 45 L 100 75 L 100 87 L 30 57 Z" fill="url(#blueLeft)" />
        </g>

        {/* LAYER 2: Middle Blue Tile */}
        <g transform="translate(0, 42)">
          {/* Top Surface */}
          <path d="M 100 15 L 170 45 L 100 75 L 30 45 Z" fill="url(#blueTop)" />
          {/* Right Thickness Face */}
          <path d="M 100 75 L 170 45 L 170 57 L 100 87 Z" fill="url(#blueRight)" />
          {/* Left Thickness Face */}
          <path d="M 30 45 L 100 75 L 100 87 L 30 57 Z" fill="url(#blueLeft)" />
        </g>

        {/* LAYER 3: Upper Gold Tile */}
        <g transform="translate(0, 84)">
          {/* Top Surface */}
          <path d="M 100 15 L 170 45 L 100 75 L 30 45 Z" fill="url(#goldTop)" />
          {/* Right Thickness Face */}
          <path d="M 100 75 L 170 45 L 170 57 L 100 87 Z" fill="url(#goldRight)" />
          {/* Left Thickness Face */}
          <path d="M 30 45 L 100 75 L 100 87 L 30 57 Z" fill="url(#goldLeft)" />
        </g>

        {/* LAYER 4: Bottom Gold Tile */}
        <g transform="translate(0, 126)">
          {/* Top Surface */}
          <path d="M 100 15 L 170 45 L 100 75 L 30 45 Z" fill="url(#goldTop)" />
          {/* Right Thickness Face */}
          <path d="M 100 75 L 170 45 L 170 57 L 100 87 Z" fill="url(#goldRight)" />
          {/* Left Thickness Face */}
          <path d="M 30 45 L 100 75 L 100 87 L 30 57 Z" fill="url(#goldLeft)" />
        </g>
      </g>
    </svg>
  );
}