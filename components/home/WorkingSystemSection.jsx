import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Calendar, Heart, BookOpen, ClipboardCheck, Sparkles, Compass } from 'lucide-react';

export default function WorkingSystemSection() {
  const systems = [
    {
      icon: HelpCircle,
      title: 'Dedicated Doubt Resolution',
      description: 'Specialized 1-on-1 doubt solution desk during and after lectures to ensure every query is completely resolved.',
      color: 'from-[#0082AD] to-[#005F80]',
    },
    {
      icon: Calendar,
      title: 'Structured Timetable',
      description: 'Meticulously planned weekly schedules balancing core lectures, self-study, and mock exam assessments.',
      color: 'from-[#7AA13B] to-[#5E802B]',
    },
    {
      icon: Heart,
      title: 'Mental Wellness & Focus',
      description: 'Morning prayer & mindfulness sessions designed to boost concentration, reduce exam stress, and promote wellness.',
      color: 'from-[#0082AD] to-[#004761]',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Study Modules',
      description: 'Authoritative study notes and problem sheets compiled by senior subject heads specifically for JEE/NEET.',
      color: 'from-[#7AA13B] to-[#8DB843]',
    },
    {
      icon: ClipboardCheck,
      title: 'Weekly Mock Testing',
      description: 'Real exam pattern OMR & CBT tests with detailed analytics to identify weak areas and track growth.',
      color: 'from-[#0082AD] to-[#005F80]',
    },
    {
      icon: Sparkles,
      title: 'Motivational Mentorship',
      description: 'Regular interactive sessions by top rankers and guest educators to inspire peak student performance.',
      color: 'from-[#7AA13B] to-[#5E802B]',
    },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#0082AD]/20 rounded-full text-[#0082AD] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#7AA13B]" />
            <span>Educational Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#005F80] mb-4">
            Our Academic System
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            A proven 360° framework built to foster academic discipline, conceptual clarity, and competitive success
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 h-full border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${system.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <system.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#0082AD] transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {system.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}