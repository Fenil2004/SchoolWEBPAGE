import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, Download, School, GraduationCap, Microscope, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BhulkaWatermark, ScienceWatermark, CommerceWatermark, AcademicWatermark } from '@/components/ui/SectionWatermark';

export default function CurriculumTabs() {
  const [activeTab, setActiveTab] = useState('science');

  const tabs = [
    {
      id: 'bhulka',
      label: 'Bhulka Kindergarten',
      subtitle: 'Playgroup to HKG (Ages 2.5 - 6)',
      icon: School,
      badge: 'Early Childhood',
      description: 'Sensory discovery, play-based learning, phonics immersion, and foundational motor skill development in a nurturing environment.',
      highlights: [
        'Interactive Sensory Playrooms & Activity Corners',
        'Phonics-based English Speech & Early Literacy',
        'Montessori-inspired Math & Shapes Discovery',
        'CCTV-monitored safe classrooms & Splash Park',
      ],
      subjects: ['Phonics & Storytelling', 'Early Numbers & Shapes', 'Art, Craft & Clay Modeling', 'Sensory & Physical Play'],
    },
    {
      id: 'secondary',
      label: 'Grades 1 to 10 (Secondary)',
      subtitle: 'Primary & Middle School',
      icon: BookOpen,
      badge: 'Core Schooling',
      description: 'Comprehensive academic rigor focusing on strong STEM foundations, language fluency, computer literacy, and analytical thinking.',
      highlights: [
        'CBSE / State Board Curriculum Alignment',
        'Practical Science & Computer Lab Sessions',
        'Integrated Olympiad & Foundation Prep',
        'Sports, Performing Arts & Co-curricular Clubs',
      ],
      subjects: ['Mathematics & Geometry', 'General Science & Physics', 'English & Gujarati Literature', 'Social Studies & Civics', 'Computer Science & Coding'],
    },
    {
      id: 'science',
      label: 'Grades 11-12 Science (NEET / JEE)',
      subtitle: 'Higher Secondary Science',
      icon: Microscope,
      badge: 'Integrated Prep',
      description: 'Specialized Higher Secondary Science curriculum featuring parallel coaching for NEET (Biology) and JEE Main/Advanced (PCM) within the school schedule.',
      highlights: [
        'Dedicated Physics, Chemistry, Biology & Math Labs',
        'Integrated NEET / JEE / GUJCET Entrance Coaching',
        'Weekly OMR Mock Test Series & Performance Analytics',
        'Doubt-Solving Desks & Senior Expert Faculty',
      ],
      subjects: ['Physics (Theory & Mechanics)', 'Chemistry (Organic, Inorganic, Physical)', 'Mathematics / Higher Calculus', 'Biology (Botany & Zoology)', 'Computer Science'],
    },
    {
      id: 'commerce',
      label: 'Grades 11-12 Commerce',
      subtitle: 'Higher Secondary Commerce',
      icon: ShieldCheck,
      badge: 'Business & Finance',
      description: 'Rigorous commerce education preparing students for professional careers in Chartered Accountancy (CA), Finance, Business Administration, and Economics.',
      highlights: [
        'Practical Accounting & Ledger Applications',
        'Foundation Coaching for CA Foundation & CPT',
        'Business Studies & Real-World Economics Case Studies',
        'Statistics & Financial Data Analysis',
      ],
      subjects: ['Elements of Accountancy', 'Business Administration (B.A.)', 'Economics & Micro-finance', 'Secretarial Practice & Stats', 'English & Computer Studies'],
    },
  ];

  const currentData = tabs.find((t) => t.id === activeTab) || tabs[2];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-8 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-brand-green" />
            <span>Academic Progression</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Stage-wise Curriculum & Subject Breakdown
          </h3>
        </div>

        <button
          onClick={() => alert("Downloading Angels School Academic Prospectus & Syllabus Brochure...")}
          className="inline-flex items-center gap-2 bg-brand-teal-light text-brand-teal hover:bg-brand-teal hover:text-white text-xs px-4 py-2.5 rounded-xl font-bold transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Syllabus PDF</span>
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl text-left transition-all flex flex-col justify-between space-y-3 ${
                isActive
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-green-light' : 'text-brand-teal'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">{tab.label}</div>
                <div className={`text-[11px] mt-0.5 ${isActive ? 'text-cyan-100' : 'text-slate-500'}`}>
                  {tab.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display with Section Specific Watermarks */}
      <div className="bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-100 space-y-6 relative overflow-hidden">
        {/* Render Section Specific Watermark */}
        {activeTab === 'bhulka' && <BhulkaWatermark position="top-2 right-2" />}
        {activeTab === 'secondary' && <AcademicWatermark position="top-2 right-2" />}
        {activeTab === 'science' && <ScienceWatermark position="top-2 right-2" />}
        {activeTab === 'commerce' && <CommerceWatermark position="bottom-2 right-2" />}

        <div className="space-y-2 relative z-10">
          <h4 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>{currentData.label}</span>
          </h4>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {currentData.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-2 relative z-10">
          {/* Key Highlights */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pillar Highlights:
            </h5>
            <ul className="space-y-2">
              {currentData.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Core Subjects & Modules:
            </h5>
            <div className="flex flex-wrap gap-2">
              {currentData.subjects.map((sub, i) => (
                <span
                  key={i}
                  className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 shadow-sm"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

