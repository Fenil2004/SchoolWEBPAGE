import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Microscope, GraduationCap } from 'lucide-react';

/**
 * StreamComparisonTable Component
 * 
 * Detailed comparison matrix comparing Secondary (Grades 1-10) vs
 * Higher Secondary Science (Grades 11-12 NEET/JEE) vs Commerce.
 */
export default function StreamComparisonTable() {
  const comparisonData = [
    {
      feature: 'Grade Target & Stage',
      secondary: 'Grades 1 to 10',
      science: 'Grades 11 & 12 Science',
      commerce: 'Grades 11 & 12 Commerce',
    },
    {
      feature: 'Curriculum Focus',
      secondary: 'STEM Foundations, Languages, Math & Coding',
      science: 'Physics, Chemistry, Math / Bio (NEET & JEE)',
      commerce: 'Accountancy, Business, Economics & Stats',
    },
    {
      feature: 'Integrated Entrance Coaching',
      secondary: 'Olympiad & NTSE Foundation',
      science: 'Parallel NEET-UG & JEE Main/Advanced Prep',
      commerce: 'CA Foundation & CPT Guidance',
    },
    {
      feature: 'Practical Laboratory Exposure',
      secondary: 'General Science & Computer Labs',
      science: 'Dedicated Physics, Chemistry & Bio STEM Labs',
      commerce: 'Financial Accounting & Tally Software Labs',
    },
    {
      feature: 'Career & University Pathways',
      secondary: 'Secondary Board Certification (Class 10)',
      science: 'MBBS/BDS, IITs/NITs, Engineering, Research',
      commerce: 'Chartered Accountancy (CA), BBA/MBA, Finance',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider bg-brand-teal-light px-3.5 py-1 rounded-full">
          <BookOpen className="w-4 h-4 text-brand-green" />
          <span>Stream Matrix Comparison</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Which Academic Pathway Suits Your Goals?
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-200 text-xs md:text-sm">
              <th className="py-4 px-4 font-bold uppercase tracking-wider text-slate-500 w-1/4">Feature</th>
              <th className="py-4 px-4 text-center font-extrabold text-brand-teal w-1/4 bg-brand-teal-subtle/40 rounded-t-2xl">
                Secondary (Grades 1-10)
              </th>
              <th className="py-4 px-4 text-center font-extrabold text-brand-green w-1/4 bg-brand-green-tint/40 rounded-t-2xl">
                Science (NEET & JEE)
              </th>
              <th className="py-4 px-4 text-center font-extrabold text-slate-800 w-1/4 bg-slate-100/60 rounded-t-2xl">
                Commerce Stream
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900">{row.feature}</td>
                <td className="py-4 px-4 text-center text-slate-600 bg-brand-teal-subtle/10 font-medium">{row.secondary}</td>
                <td className="py-4 px-4 text-center text-slate-700 bg-brand-green-tint/10 font-semibold">{row.science}</td>
                <td className="py-4 px-4 text-center text-slate-600 bg-slate-50/50 font-medium">{row.commerce}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
