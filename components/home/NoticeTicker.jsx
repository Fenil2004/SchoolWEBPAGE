import React, { useState } from 'react';
import { Bell, Sparkles, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NoticeTicker Component
 * 
 * Announcement strip at the top of the homepage highlighting urgent news, 
 * admissions status for Bhulka and Grades 1-12, and NEET/JEE orientation dates.
 */
export default function NoticeTicker() {
  const [isVisible, setIsVisible] = useState(true);
  
  const notices = [
    '🎓 Admissions Open for Academic Session 2026-27 — Bhulka (Kindergarten) & Grades 1 to 12 (Science & Commerce)',
    '🔬 Grade 11 Science NEET & JEE Integrated Coaching Orientation & Diagnostic Test Registration Active',
    '🏆 Congratulations to Angels School Board Examination & GUJCET Top Rankers!',
    '🏫 Visit Campus Branches to explore our state-of-the-art STEM & Robotics Laboratories',
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-brand-teal-dark via-brand-teal to-[#004560] text-white py-2.5 px-4 relative shadow-sm z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs md:text-sm font-medium">
        
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-white/15 px-2.5 py-1 rounded-full text-white backdrop-blur-md">
          <Bell className="w-3.5 h-3.5 text-brand-green-light animate-bounce" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">Notice</span>
        </div>

        {/* Ticker Text Content */}
        <div className="flex-1 overflow-hidden relative h-6">
          <div className="flex items-center gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {notices.concat(notices).map((notice, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-green-light" />
                <span>{notice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button & Dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/admissions"
            className="hidden sm:flex items-center gap-1 bg-brand-green hover:bg-brand-green-light text-white text-xs px-3 py-1 rounded-full font-semibold transition-all shadow-sm hover:scale-105"
          >
            <span>Apply Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            title="Dismiss Announcement"
            aria-label="Dismiss Announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
