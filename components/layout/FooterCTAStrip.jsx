import React from 'react';
import { ArrowRight, Phone, Download, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * FooterCTAStrip Component
 * 
 * Global top footer CTA strip encouraging parents to apply for admission,
 * download the syllabus brochure, or log into the Student Portal.
 */
export default function FooterCTAStrip() {
  return (
    <div className="bg-gradient-to-r from-brand-teal via-brand-teal-dark to-[#004761] text-white py-12 px-4 relative overflow-hidden border-t border-b border-brand-teal-dark">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Column Text */}
        <div className="space-y-2 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 px-3.5 py-1 rounded-full text-brand-green-light text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Open 2026-27</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">
            Ready to Give Your Child a Confident Future?
          </h3>
          <p className="text-cyan-100 text-xs md:text-sm leading-relaxed">
            Enroll today in Bhulka (Kindergarten) or Angels School Secondary & Higher Secondary (Science NEET/JEE & Commerce).
          </p>
        </div>

        {/* Right Column Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/admissions">
            <button className="bg-brand-green hover:bg-brand-green-light text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105">
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <Link href="/student-login">
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs md:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-brand-green-light" />
              <span>Student / Parent Portal</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
