// components/icons/AmenitiesIcons.tsx
import React from 'react'

interface IconProps {
  size?: number
  strokeWidth?: number
  className?: string
}

// Svi SVG-ovi imaju viewBox 24x24 kao Lucide
export const GrillIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="12" cy="10" rx="8" ry="4" />
    <path d="M4 10v2a8 4 0 0 0 16 0v-2" />
    <path d="M8 14v6" />
    <path d="M16 14v6" />
    <path d="M6 20h4" />
    <path d="M14 20h4" />
    <path d="M9 6V4" />
    <path d="M12 7V3" />
    <path d="M15 6V4" />
  </svg>
)

export const SaunaIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    <path d="M7 12h2" />
    <path d="M7 15h2" />
    <path d="M15 12h2" />
    <path d="M15 15h2" />
    <circle cx="12" cy="13.5" r="2" />
  </svg>
)

export const WellnessIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Jacuzzi/hot tub */}
    <ellipse cx="12" cy="14" rx="8" ry="4" />
    <path d="M4 14v2a8 4 0 0 0 16 0v-2" />
    {/* Steam/para */}
    <path d="M8 10c0-1 .5-2 1-2s1 1 1 2" />
    <path d="M11 8c0-1 .5-2 1-2s1 1 1 2" />
    <path d="M14 10c0-1 .5-2 1-2s1 1 1 2" />
  </svg>
)

export const LoungerIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Ležaljka */}
    <path d="M2 17h14" />
    <path d="M2 17l2-8h10l1 4" />
    <path d="M16 13l4 4" />
    <path d="M6 17v3" />
    <path d="M18 17v3" />
    <circle cx="20" cy="17" r="2" />
  </svg>
)

export const HairdryerIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Tijelo sušila */}
    <ellipse cx="7" cy="10" rx="5" ry="6" />
    <circle cx="7" cy="10" r="2" />
    {/* Ručka */}
    <path d="M12 12l4 8" />
    <path d="M10 13l4 8" />
    {/* Mlaznica */}
    <path d="M12 8h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-6" />
  </svg>
)

export const RobeIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Ovratnik */}
    <path d="M12 4c-1 0-2 1-2 2l-1 3h6l-1-3c0-1-1-2-2-2z" />
    {/* Tijelo ogrtača */}
    <path d="M9 9l-2 11h2l2-4v4h2v-4l2 4h2l-2-11" />
    {/* Pojas */}
    <path d="M8 14h8" />
    {/* Rukavi */}
    <path d="M6 9l-2 4h3" />
    <path d="M18 9l2 4h-3" />
  </svg>
)

export const TowelIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Šipka */}
    <path d="M4 6h16" />
    <circle cx="4" cy="6" r="1" />
    <circle cx="20" cy="6" r="1" />
    {/* Ručnik */}
    <path d="M7 6v10a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V6" />
    <path d="M10 6v12" />
  </svg>
)

export const PoolIcon = ({ size = 24, strokeWidth = 1.5, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Bazen s ljestvama */}
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 12h18" />
    <path d="M7 6v6" />
    <path d="M7 6h2" />
    <path d="M7 9h2" />
    <path d="M5 18c1 0 2-.5 3-1s2-1 3-1 2 .5 3 1 2 1 3 1 2-.5 3-1" />
  </svg>
)
