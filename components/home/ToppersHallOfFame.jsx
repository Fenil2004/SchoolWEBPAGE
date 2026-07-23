import React, { useState } from 'react';
import { Award, Trophy, Star, Sparkles, CheckCircle, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrophyWatermarks } from '@/components/ui/SectionWatermark';

export default function ToppersHallOfFame() {
  const [activeCategory, setActiveCategory] = useState('all');

  const toppers = [
    {
      id: 1,
      name: 'Priya Sharma',
      exam: 'Class 12 Science (NEET)',
      score: '695 / 720 (AIR 142)',
      stream: 'Science (NEET)',
      category: 'neet-jee',
      quote: 'The integrated Science faculty & test series at Angels School gave me complete confidence.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      tag: 'NEET Star',
    },
    {
      id: 2,
      name: 'Rohan Patel',
      exam: 'Class 12 Science (JEE Advanced)',
      score: '99.85 Percentile',
      stream: 'Science (JEE)',
      category: 'neet-jee',
      quote: 'Concept clarity in Physics & Math prepared me for both Board exams and JEE Advanced.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      tag: 'JEE Ranker',
    },
    {
      id: 3,
      name: 'Ananya Mehta',
      exam: 'Class 12 Commerce Board',
      score: '98.4%',
      stream: 'Commerce',
      category: 'board',
      quote: 'Teachers at Angels School made Accountancy & Economics intuitive and enjoyable.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      tag: 'Commerce Topper',
    },
    {
      id: 4,
      name: 'Kavya Joshi',
      exam: 'Class 10 Board Exam',
      score: '99.1%',
      stream: 'Secondary',
      category: 'board',
      quote: 'Studying at Angels School since Class 1 helped build a unbreakable foundation in STEM.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      tag: 'Class 10 Topper',
    },
  ];

  const filteredToppers = activeCategory === 'all'
    ? toppers
    : toppers.filter((t) => t.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <TrophyWatermarks />
      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">


        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-teal-light text-brand-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-brand-green" />
            <span>Academic Excellence</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Hall of Fame & Academic Achievers
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Celebrating our Class 10 & 12 Board examination toppers and Higher Secondary Science NEET & JEE rankers.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Achievers' },
              { id: 'neet-jee', label: 'NEET & JEE Achievers' },
              { id: 'board', label: 'Board Examination Toppers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-brand-teal text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-teal/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toppers Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredToppers.map((topper) => (
            <motion.div
              key={topper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Image & Badge */}
                <div className="relative">
                  <img
                    src={topper.image}
                    alt={topper.name}
                    className="w-24 h-24 rounded-2xl object-cover mx-auto shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-green to-brand-green-light text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                    {topper.tag}
                  </span>
                </div>

                {/* Info */}
                <div className="text-center pt-2 space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-teal transition-colors">
                    {topper.name}
                  </h3>
                  <div className="text-xs font-semibold text-brand-teal">
                    {topper.exam}
                  </div>
                  <div className="text-sm font-extrabold text-brand-green">
                    {topper.score}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-500 italic text-center leading-relaxed pt-2 border-t border-slate-100">
                  "{topper.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <GraduationCap className="w-3.5 h-3.5 text-brand-teal" />
                <span>Angels School Scholar</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
