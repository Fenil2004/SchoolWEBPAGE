import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Calendar, Heart, BookOpen, ClipboardCheck, Sparkles } from 'lucide-react';

export default function WorkingSystemSection() {
  const systems = [
    {
      icon: HelpCircle,
      title: 'Doubt Solution',
      description: 'Special doubt solution cell for students. During or after lectures, students can get satisfied solutions to all their queries.',
      color: 'from-[#0A94B8] to-[#056C8C]',
    },
    {
      icon: Calendar,
      title: 'Organized Timetable',
      description: 'Well-organized timetable covering lectures, tests, doubt solution sessions for overall student growth.',
      color: 'from-[#76A440] to-[#8FC85C]',
    },
    {
      icon: Heart,
      title: 'Prayer & Pranayam',
      description: 'Students day starts with prayer & pranayam, beneficial for physical and mental health, increasing focus on studies.',
      color: 'from-[#0A94B8] to-[#056C8C]',
    },
    {
      icon: BookOpen,
      title: 'Study Materials',
      description: 'Expert faculty prepared study materials specially designed for exams. Highly beneficial and acceptable for competitive exams.',
      color: 'from-[#76A440] to-[#8FC85C]',
    },
    {
      icon: ClipboardCheck,
      title: 'Mock Test',
      description: 'Regular mock tests for academic development. Students give mock tests and improve their academic performance day by day.',
      color: 'from-[#0A94B8] to-[#056C8C]',
    },
    {
      icon: Sparkles,
      title: 'Motivational Session',
      description: 'When students feel low, our motivational sessions help them boost up and achieve their desired goals.',
      color: 'from-[#76A440] to-[#8FC85C]',
    },
  ];

  return (
    <section className="py-20 bg-[#F5F8FA]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
            Our System
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#056C8C] mb-4">
            Working System
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach ensures holistic development of students through structured learning methods
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${system.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <system.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {system.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {system.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}