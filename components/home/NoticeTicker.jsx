import React, { useState, useEffect } from 'react';
import { Bell, Sparkles, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_NOTICES = [
  {
    id: 'd1',
    text: '🎓 Admissions Open for Academic Session 2026-27 — Bhulka (Kindergarten) & Grades 1 to 12 (Science & Commerce)',
    link: '/admissions',
    isActive: true,
  },
  {
    id: 'd2',
    text: '🔬 Grade 11 Science NEET & JEE Integrated Coaching Orientation & Diagnostic Test Registration Active',
    link: '/courses',
    isActive: true,
  },
  {
    id: 'd3',
    text: '🏆 Congratulations to Angels School Board Examination & GUJCET Top Rankers!',
    link: '/achievements',
    isActive: true,
  },
  {
    id: 'd4',
    text: '🏫 Visit Campus Branches to explore our state-of-the-art STEM & Robotics Laboratories',
    link: '/branches',
    isActive: true,
  },
];

/**
 * NoticeTicker Component
 * 
 * Announcement strip at the top of the homepage highlighting urgent news, 
 * admissions status, and administrative notices fetched dynamically from the backend.
 * Features continuous infinite smooth marquee scrolling with hover pause.
 */
export default function NoticeTicker() {
  const [isVisible, setIsVisible] = useState(true);
  const [notices, setNotices] = useState(DEFAULT_NOTICES);

  useEffect(() => {
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((item) => item.isActive);
          if (activeOnly.length > 0) {
            setNotices(activeOnly);
          }
        }
      })
      .catch((err) => console.error('Failed to load notices ticker:', err));
  }, []);

  if (!isVisible || notices.length === 0) return null;

  // Quadruple items if list is short to ensure smooth continuous scrolling across widescreen monitors
  const tickerItems = notices.length < 3 ? [...notices, ...notices, ...notices, ...notices] : [...notices, ...notices];

  return (
    <div className="bg-gradient-to-r from-brand-teal-dark via-brand-teal to-[#004560] text-white py-2.5 px-4 relative shadow-sm z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs md:text-sm font-medium">
        
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-white/15 px-2.5 py-1 rounded-full text-white backdrop-blur-md">
          <Bell className="w-3.5 h-3.5 text-brand-green-light animate-bounce" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">Notice</span>
        </div>

        {/* Dynamic Continuous Ticker Content */}
        <div className="flex-1 overflow-hidden relative h-6">
          <div className="flex items-center gap-8 whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {tickerItems.map((notice, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-brand-green-light" />
                {notice.link ? (
                  <Link href={notice.link} className="hover:underline hover:text-brand-green-light transition-colors">
                    {notice.text}
                  </Link>
                ) : (
                  <span>{notice.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button & Dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admissions"
            className="hidden sm:flex items-center gap-1 bg-brand-green hover:bg-brand-green-light text-white text-xs px-3 py-1 rounded-full font-semibold transition-all shadow-sm hover:scale-105"
          >
            <span>Apply Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          
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
