import React from 'react';
import { BhulkaWatermark, ScienceWatermark, CommerceWatermark, AcademicWatermark, TrophyWatermark } from '@/components/ui/SectionWatermark';

/**
 * BackgroundDecorations Component
 * 
 * Non-sticky, section-anchored SVG vector watermarks.
 * Rendered in natural page document flow so icons scroll smoothly with specific sections.
 */
export default function BackgroundDecorations() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden min-h-full" 
      aria-hidden="true"
    >
      {/* Top Banner & Hero Watermarks */}
      <AcademicWatermark position="top-24 right-8" />
      <BhulkaWatermark position="top-36 left-6" />

      {/* Mid Page Science & Commerce Watermarks */}
      <ScienceWatermark position="top-[35%] left-8" />
      <CommerceWatermark position="top-[45%] right-8" />

      {/* Lower Page Achievements & Science Watermarks */}
      <TrophyWatermark position="top-[65%] right-10" />
      <ScienceWatermark position="top-[80%] left-10" />
    </div>
  );
}
