import React from 'react';
import { School, Users, GraduationCap, Award, BookOpen, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * StatsCounterBar Component
 * 
 * 8-metric grid displaying Angels School achievements, campus network,
 * pass rate, NEET & JEE top ranks, and academic legacy.
 */
export default function StatsCounterBar() {
  const stats = [
    { icon: School, value: '2', label: 'Campus Branches', desc: 'State-of-the-Art Infrastructure' },
    { icon: Users, value: '15,000+', label: 'Enrolled & Alumni', desc: 'Successful Students' },
    { icon: GraduationCap, value: '500+', label: 'NEET & JEE Ranks', desc: 'Top Science Entrances' },
    { icon: Award, value: '98.5%', label: 'Board Pass Rate', desc: 'Consistent Academic Excellence' },
    { icon: Calendar, value: '25+ Years', label: 'Legacy of Trust', desc: 'Established 1998' },
    { icon: BookOpen, value: '15,000+', label: 'Library Titles', desc: 'Digital & Physical Books' },
    { icon: ShieldCheck, value: '100+', label: 'Expert Faculty', desc: 'Trained Educators' },
    { icon: Sparkles, value: '100%', label: 'Smart Classrooms', desc: 'Audio-Visual Tech Labs' },
  ];

  return (
    <section className="py-14 bg-gradient-to-r from-brand-dark via-brand-teal-dark to-[#00384D] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 hover:border-brand-green/50 hover:bg-white/15 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/20 text-brand-green-light flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-cyan-100">{stat.label}</div>
                <div className="text-[11px] text-slate-300/80">{stat.desc}</div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
