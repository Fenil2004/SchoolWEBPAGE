import React from 'react';

/**
 * SectionWatermark Component Library
 * 
 * Provides dual-side (left & right) vector watermark graphics tailored for white & light sections.
 * Embedded inside relative section wrappers so graphics scroll naturally and stay attached
 * to that specific section.
 */

// 1. Dual-Side Hero & Overview Watermarks (Cap Left, Book Right)
export function HeroWatermarks() {
  return (
    <>
      <div className="absolute top-10 left-4 md:left-8 pointer-events-none select-none z-0 opacity-15 text-[#0082AD]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <polygon points="50,15 90,35 50,55 10,35" stroke="currentColor" strokeWidth="3.5" fill="none" />
          <path d="M25 43 V65 C25 75 75 75 75 65 V43" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M83 40 V75 M83 75 A4,4 0 0,1 87,79 A4,4 0 0,1 83,83 A4,4 0 0,1 79,79 Z" stroke="#7AA13B" strokeWidth="3" fill="#7AA13B" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-4 md:right-8 pointer-events-none select-none z-0 opacity-15 text-[#7AA13B]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <path d="M10 25 Q 50 15 90 25 V 80 Q 50 70 10 80 Z" stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M50 20 V 75" stroke="currentColor" strokeWidth="3.5" />
          <path d="M20 40 Q 35 32 45 40 M20 55 Q 35 47 45 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}

// 2. Dual-Side Bhulka Kindergarten Watermarks (ABC Blocks Left, Stars Right)
export function BhulkaWatermarks() {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-8 pointer-events-none select-none z-0 opacity-15 text-[#7AA13B]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <rect x="10" y="10" width="80" height="80" rx="18" stroke="currentColor" fill="none" />
          <path d="M50 25 L35 70 H65 L50 25 Z M38 58 H62" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-12 right-4 md:right-8 pointer-events-none select-none z-0 opacity-15 text-[#0082AD]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-16 h-16 md:w-24 md:h-24">
          <path d="M50 5 L62 38 L95 38 L68 58 L78 90 L50 70 L22 90 L32 58 L5 38 L38 38 Z" />
        </svg>
      </div>
    </>
  );
}

// 3. Dual-Side Science (NEET/JEE) Watermarks (Atomic Orbitals Left, Beaker Right)
export function ScienceWatermarks() {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-8 pointer-events-none select-none z-0 opacity-15 text-[#0082AD]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-24 h-24 md:w-32 md:h-32">
          <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(30 50 50)" stroke="currentColor" strokeWidth="3" />
          <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(90 50 50)" stroke="#7AA13B" strokeWidth="3" />
          <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(150 50 50)" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-4 md:right-8 pointer-events-none select-none z-0 opacity-15 text-[#7AA13B]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <path d="M35 15 H65 M50 15 V35 L75 80 C80 88 72 95 60 95 H40 C28 95 20 88 25 80 L50 35" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
          <path d="M30 75 H70" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="45" cy="60" r="4" fill="#0082AD" />
        </svg>
      </div>
    </>
  );
}

// 4. Dual-Side Commerce Watermarks (Growth Chart Left, Ledger Shield Right)
export function CommerceWatermarks() {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-8 pointer-events-none select-none z-0 opacity-15 text-[#0082AD]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <path d="M10 90 H90 V10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="20" y="60" width="12" height="30" rx="2" fill="#0082AD" opacity="0.6" />
          <rect x="40" y="45" width="12" height="45" rx="2" fill="#7AA13B" opacity="0.7" />
          <rect x="60" y="25" width="12" height="65" rx="2" fill="#0082AD" opacity="0.6" />
          <path d="M15 65 L40 40 L60 30 L85 12 M72 12 H85 V25" stroke="#7AA13B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-4 md:right-8 pointer-events-none select-none z-0 opacity-15 text-[#7AA13B]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <path d="M50 15 L85 30 V60 C85 75 50 90 50 90 C50 90 15 75 15 60 V30 L50 15 Z" stroke="currentColor" strokeWidth="3.5" fill="none" />
          <path d="M35 50 L45 60 L65 40" stroke="#0082AD" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}

// 5. Dual-Side Trophy & Achievers Watermarks (Gold Trophy Left, Star Badge Right)
export function TrophyWatermarks() {
  return (
    <>
      <div className="absolute top-6 left-4 md:left-8 pointer-events-none select-none z-0 opacity-15 text-[#7AA13B]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-24 h-24 md:w-32 md:h-32">
          <path d="M25 15 H75 V45 C75 60 62 70 50 70 C38 70 25 60 25 45 V15 Z" stroke="#0082AD" strokeWidth="3.5" fill="none" />
          <path d="M25 25 H12 C5 25 5 45 18 45 H25 M75 25 H88 C95 25 95 45 82 45 H75" stroke="#0082AD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 70 V82 M35 82 H65 V92 H35 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-8 right-4 md:right-8 pointer-events-none select-none z-0 opacity-15 text-[#0082AD]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <circle cx="50" cy="45" r="30" stroke="currentColor" strokeWidth="3.5" fill="none" />
          <polygon points="50,25 54,36 65,36 56,43 60,54 50,47 40,54 44,43 35,36 46,36" fill="#7AA13B" stroke="none" />
          <path d="M35 70 L25 95 L50 85 L75 95 L65 70" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}

// 6. Dual-Side General Academic Watermarks (Microscope Left, Globe Right)
export function GeneralAcademicWatermarks() {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-8 pointer-events-none select-none z-0 opacity-15 text-[#7AA13B]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <path d="M35 15 L50 25 L40 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <rect x="25" y="8" width="15" height="15" rx="3" fill="#0082AD" stroke="none" />
          <path d="M20 70 Q 10 30 50 30 T 70 70" stroke="#0082AD" strokeWidth="3" fill="none" />
          <line x1="25" y1="65" x2="65" y2="65" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-4 md:right-8 pointer-events-none select-none z-0 opacity-15 text-[#0082AD]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <circle cx="50" cy="45" r="35" stroke="#0082AD" strokeWidth="3" />
          <ellipse cx="50" cy="45" rx="35" ry="14" stroke="#0082AD" strokeWidth="2.5" />
          <line x1="50" y1="10" x2="50" y2="80" stroke="#0082AD" strokeWidth="2.5" />
          <path d="M25 80 C 15 90, 85 90, 75 80 M50 80 V92 M30 92 H70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}

// 7. Dual-Side Contact & Location Watermarks (Location Pin Left, Mail Right)
export function ContactWatermarks() {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-8 pointer-events-none select-none z-0 opacity-15 text-[#0082AD]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <path d="M50 15 C30 15 15 30 15 50 C15 75 50 95 50 95 C50 95 85 75 85 50 C85 30 70 15 50 15 Z" stroke="currentColor" strokeWidth="3.5" fill="none" />
          <circle cx="50" cy="45" r="12" fill="#7AA13B" stroke="none" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-4 md:right-8 pointer-events-none select-none z-0 opacity-15 text-[#7AA13B]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
          <rect x="10" y="20" width="80" height="60" rx="10" stroke="currentColor" strokeWidth="3.5" fill="none" />
          <path d="M10 25 L50 55 L90 25" stroke="#0082AD" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </div>
    </>
  );
}

// Backward compatibility single exports
export function BhulkaWatermark({ position = "top-4 right-4", className = "" }) {
  return (
    <div className={`absolute ${position} pointer-events-none select-none z-0 opacity-15 text-[#7AA13B] ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
        <rect x="10" y="10" width="80" height="80" rx="18" stroke="currentColor" fill="none" />
        <path d="M50 25 L35 70 H65 L50 25 Z M38 58 H62" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ScienceWatermark({ position = "top-4 right-4", className = "" }) {
  return (
    <div className={`absolute ${position} pointer-events-none select-none z-0 opacity-15 text-[#0082AD] ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-24 h-24 md:w-32 md:h-32">
        <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(30 50 50)" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(90 50 50)" stroke="#7AA13B" strokeWidth="3" />
        <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(150 50 50)" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
      </svg>
    </div>
  );
}

export function CommerceWatermark({ position = "bottom-4 right-4", className = "" }) {
  return (
    <div className={`absolute ${position} pointer-events-none select-none z-0 opacity-15 text-[#0082AD] ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-20 h-20 md:w-28 md:h-28">
        <path d="M10 90 H90 V10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="20" y="60" width="12" height="30" rx="2" fill="#0082AD" opacity="0.6" />
        <rect x="40" y="45" width="12" height="45" rx="2" fill="#7AA13B" opacity="0.7" />
        <rect x="60" y="25" width="12" height="65" rx="2" fill="#0082AD" opacity="0.6" />
        <path d="M15 65 L40 40 L60 30 L85 12 M72 12 H85 V25" stroke="#7AA13B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function AcademicWatermark({ position = "top-4 right-6", className = "" }) {
  return (
    <div className={`absolute ${position} pointer-events-none select-none z-0 opacity-15 text-[#0082AD] ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-24 h-24 md:w-32 md:h-32">
        <polygon points="50,15 90,35 50,55 10,35" stroke="currentColor" strokeWidth="3.5" fill="none" />
        <path d="M25 43 V65 C25 75 75 75 75 65 V43" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M83 40 V75 M83 75 A4,4 0 0,1 87,79 A4,4 0 0,1 83,83 A4,4 0 0,1 79,79 Z" stroke="#7AA13B" strokeWidth="3" fill="#7AA13B" />
      </svg>
    </div>
  );
}

export function TrophyWatermark({ position = "top-4 right-6", className = "" }) {
  return (
    <div className={`absolute ${position} pointer-events-none select-none z-0 opacity-15 text-[#7AA13B] ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-24 h-24 md:w-32 md:h-32">
        <path d="M25 15 H75 V45 C75 60 62 70 50 70 C38 70 25 60 25 45 V15 Z" stroke="#0082AD" strokeWidth="3.5" fill="none" />
        <path d="M25 25 H12 C5 25 5 45 18 45 H25 M75 25 H88 C95 25 95 45 82 45 H75" stroke="#0082AD" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 70 V82 M35 82 H65 V92 H35 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
