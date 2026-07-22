import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, CheckCircle2, ArrowRight, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PathFinder() {
  const { t } = useLanguage();
  const [selectedStage, setSelectedStage] = useState('higher-secondary');
  const [selectedMedium, setSelectedMedium] = useState('english');

  const pathOptions = [
    {
      id: 'foundation',
      title: 'Foundation (Grades 8-10)',
      target: 'Class 8, 9, 10 Students',
      focus: 'Strong Science & Math Olympiad Foundation',
      recommendedCampus: 'Deesa HQ & Bhavnagar',
      href: '/courses',
    },
    {
      id: 'higher-secondary',
      title: '11th - 12th Science (PCM/PCB)',
      target: 'Class 11 & 12 Science Aspirants',
      focus: 'Board Exam Mastery + Integrated JEE Main / NEET Prep',
      recommendedCampus: 'All Campuses (Deesa, Ahmedabad, Bhavnagar)',
      href: '/courses',
    },
    {
      id: 'repeaters',
      title: 'NEET / JEE Target Batch',
      target: '12th Pass / Droppers',
      focus: 'Intensive 1-Year Rank Booster & Daily Practice Tests',
      recommendedCampus: 'Bhavnagar Head Office',
      href: '/courses',
    },
  ];

  const currentRecommendation = pathOptions.find((p) => p.id === selectedStage) || pathOptions[1];

  return (
    <section className="py-16 bg-gradient-to-br from-[#E6F4F8] via-[#F8FAFC] to-[#F0F8FA] border-y border-cyan-100/50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge className="bg-[#E6F4F8] text-[#0082AD] border border-[#0082AD]/20 font-bold mb-3 px-3 py-1">
            <Compass className="w-3.5 h-3.5 mr-1.5 text-[#7AA13B]" />
            {t('findYourPath')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#005F80] tracking-tight">
            Interactive Stream & Campus Finder
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-2">
            Select your student's current grade or goal to discover the optimal program & campus setup
          </p>
        </div>

        {/* Pathfinder Selection Box */}
        <Card className="rounded-3xl border border-slate-100 bg-white shadow-xl max-w-4xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-12">
            
            {/* Left Controls */}
            <div className="md:col-span-5 bg-slate-50/70 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 space-y-6">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
                  1. Academic Stage / Target
                </label>
                <div className="space-y-2">
                  {pathOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedStage(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border ${
                        selectedStage === opt.id
                          ? 'bg-[#0082AD] text-white border-[#0082AD] shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-[#0082AD]'
                      }`}
                    >
                      <span>{opt.title}</span>
                      {selectedStage === opt.id && <CheckCircle2 className="w-4 h-4 text-[#7AA13B]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
                  2. Instruction Medium
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedMedium('english')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedMedium === 'english'
                        ? 'bg-[#7AA13B] text-white border-[#7AA13B]'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    English Medium
                  </button>
                  <button
                    onClick={() => setSelectedMedium('gujarati')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedMedium === 'gujarati'
                        ? 'bg-[#7AA13B] text-white border-[#7AA13B]'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    ગુજરાતી માધ્યમ
                  </button>
                </div>
              </div>
            </div>

            {/* Right Recommended Output */}
            <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#7AA13B]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0082AD]">
                    Recommended Program
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900">{currentRecommendation.title}</h3>
                
                <div className="space-y-3 text-xs text-slate-600 pt-2">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#0082AD] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">Target Group: </span>
                      <span>{currentRecommendation.target}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#7AA13B] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">Academic Focus: </span>
                      <span>{currentRecommendation.focus}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-[#0082AD] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">Available Campuses: </span>
                      <span>{currentRecommendation.recommendedCampus}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Dual Medium (English & Gujarati) Options</span>
                <Link href={currentRecommendation.href}>
                  <Button className="bg-[#0082AD] hover:bg-[#005F80] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md">
                    <span>Explore Program</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </Card>

      </div>
    </section>
  );
}
