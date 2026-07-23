import React from 'react';
import { Award, Trophy, Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

/**
 * ScholarshipsCards Component
 * 
 * Displays scholarships & concessions available at Angels School:
 * Merit Scholarship (90%+ Board / Olympiad), Sports Scholarship, Sibling Discount, and Defence Concession.
 */
export default function ScholarshipsCards() {
  const scholarships = [
    {
      icon: Trophy,
      title: 'Merit Academic Scholarship',
      criteria: 'For 90%+ Board Exam Scorers & Olympiad Rankers',
      benefit: 'Up to 50% Tuition Fee Waiver',
      color: 'border-brand-teal text-brand-teal',
    },
    {
      icon: Award,
      title: 'Sports & Talent Scholarship',
      criteria: 'For State & National Level Sports Champions',
      benefit: 'Up to 30% Tuition Fee Waiver',
      color: 'border-brand-green text-brand-green',
    },
    {
      icon: Heart,
      title: 'Sibling Discount Program',
      criteria: 'Applicable when 2 or more siblings enroll',
      benefit: '10% Waiver for 2nd Child | 20% for 3rd Child',
      color: 'border-amber-500 text-amber-600',
    },
    {
      icon: ShieldCheck,
      title: 'Defence & Service Concession',
      criteria: 'Wards of Armed Forces & Police Personnel',
      benefit: '15% Dedicated Concession',
      color: 'border-cyan-600 text-cyan-600',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider bg-brand-teal-light px-3.5 py-1 rounded-full">
          <Award className="w-4 h-4 text-brand-green" />
          <span>Financial Support & Rewards</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Scholarships & Merit Concessions
        </h3>
        <p className="text-slate-600 text-xs md:text-sm">
          Recognizing academic brilliance, athletic achievements, and supporting our Angels School community.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {scholarships.map((sch, idx) => {
          const Icon = sch.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-teal/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border ${sch.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">{sch.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{sch.criteria}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 font-extrabold text-xs text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{sch.benefit}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
