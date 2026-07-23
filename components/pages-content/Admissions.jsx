import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, CheckCircle2, ChevronDown, Phone, Mail, ArrowRight, HelpCircle, Calendar, ShieldCheck, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import AgeEligibilityCalculator from '@/components/pages-content/AgeEligibilityCalculator';
import DocumentsChecklist from '@/components/pages-content/DocumentsChecklist';
import ScholarshipsCards from '@/components/pages-content/ScholarshipsCards';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function Admissions() {

  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      num: '01',
      title: 'Submit Online Application',
      desc: 'Fill out student details, target campus, and stream preference (Bhulka, Secondary 1-10, Science NEET/JEE, or Commerce).',
      icon: FileText,
    },
    {
      num: '02',
      title: 'Academic Consultation & Campus Visit',
      desc: 'Meet our senior faculty, visit STEM labs, and explore Bhulka early childhood play zones.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'Document Verification',
      desc: 'Submit birth certificate (for Bhulka) or previous grade marksheets, school leaving certificate, and photos.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Enrollment & Welcome Kit',
      desc: 'Receive seat allocation, student ID credentials, and published study materials.',
      icon: CheckCircle2,
    },
  ];


  const faqs = [
    {
      q: 'Which streams are offered in 11th and 12th Science?',
      a: 'We offer 11th & 12th Science in both PCM (Physics, Chemistry, Mathematics) and PCB (Physics, Chemistry, Biology) streams with integrated JEE Main/Advanced and NEET preparation.',
    },
    {
      q: 'Are instruction mediums available in both English and Gujarati?',
      a: 'Yes! We offer separate English Medium and Gujarati Medium divisions from Bhulka Kindergarten up to Grade 12.',
    },
    {
      q: 'What entrance exams do you train students for?',
      a: 'Our science curriculum includes comprehensive coaching for JEE Main, JEE Advanced, NEET-UG, and GUJCET along with Board examination mastery.',
    },
    {
      q: 'Is there hostel and transportation available?',
      a: 'Yes, hostel facilities are available for outstation students at our primary campuses along with female-attended GPS-tracked school buses.',
    },
    {
      q: 'How can parents track student academic progress?',
      a: 'Parents receive regular performance SMS/notifications and can log into the Student/Parent Portal to view test scores, attendance, and faculty feedback.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Dynamic Page Header Banner */}
      <PageHeaderBanner
        pageSlug="admissions"
        defaultTitle="Join Angels School Family"
        defaultBadge="Admissions Open 2026-27"
        defaultSubtitle="Simple 4-step admission process for Bhulka Kindergarten, Secondary & Higher Secondary"
      />

      {/* Age Eligibility Calculator & Admissions Cards */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <AgeEligibilityCalculator />
          <DocumentsChecklist />
          <ScholarshipsCards />
        </div>
      </section>

      {/* 4-Step Admission Journey Grid */}
      <section className="py-16">


        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#005F80]">4-Step Admission Journey</h2>
            <p className="text-slate-500 text-xs mt-1">Simple, transparent, and student-focused admission process</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <Card key={s.num} className="rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all p-6 relative">
                <div className="w-12 h-12 bg-[#E6F4F8] text-[#0082AD] rounded-2xl flex items-center justify-center font-extrabold text-lg mb-4">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="absolute top-6 right-6 text-3xl font-black text-slate-100">{s.num}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/apply">
              <Button className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-lg gap-2">
                <span>Start Online Application Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive FAQs Accordion */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#E6F4F8] text-[#0082AD] font-bold mb-2">Got Questions?</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#005F80]">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-xs mt-1">Everything you need to know about courses, mediums, and campus admissions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-[#F8FAFC]">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 font-bold text-slate-800 text-sm flex items-center justify-between gap-4"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0082AD] flex-shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#0082AD] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
