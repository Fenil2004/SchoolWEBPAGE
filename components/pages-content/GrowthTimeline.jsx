import React from 'react';
import { Calendar, Award, GraduationCap, School, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * GrowthTimeline Component
 * 
 * Timeline detailing Angels School historical growth from 1998 founding,
 * Bhulka kindergarten launch, expansion to 2 campus branches, and NEET/JEE Science excellence.
 */
export default function GrowthTimeline() {
  const milestones = [
    {
      year: '1998',
      title: 'Foundation of Angels School',
      desc: 'Established with a vision to deliver benchmark K-12 education combining academic rigor and moral values.',
      badge: 'Establishment',
    },
    {
      year: '2004',
      title: 'Launch of Bhulka Kindergarten',
      desc: 'Dedicated pre-primary division created for Playgroup, Nursery, LKG, and HKG young learners with sensory playrooms.',
      badge: 'Pre-Primary',
    },
    {
      year: '2012',
      title: 'Science & Entrance Coaching Integration',
      desc: 'Introduced integrated Higher Secondary Science curriculum pairing Board exams with NEET & JEE Main/Advanced coaching.',
      badge: 'Higher Secondary',
    },
    {
      year: '2018',
      title: 'Expansion to 2 Main Campus Branches',
      desc: 'Operates 2 campus branches in Gujarat featuring STEM robotics labs, computer centers, and athletic tracks.',
      badge: 'Infrastructure',
    },
    {
      year: '2026',
      title: '15,000+ Students & Digital Excellence',
      desc: 'Over 15,000 successful alumni excelling in medical colleges (NEET), engineering institutes (JEE), and CA pathways.',
      badge: 'Present Day',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider bg-brand-teal-light px-3.5 py-1 rounded-full">
          <Calendar className="w-4 h-4 text-brand-green" />
          <span>Our Journey Through The Years</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          25+ Years Legacy of Educational Excellence
        </h3>
      </div>

      <div className="relative max-w-3xl mx-auto pl-6 border-l-2 border-brand-teal/30 space-y-8 my-8">
        {milestones.map((m, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-teal border-4 border-white shadow-md group-hover:bg-brand-green transition-colors" />

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2 hover:border-brand-teal/30 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-lg font-extrabold text-brand-teal">{m.year}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                  {m.badge}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
