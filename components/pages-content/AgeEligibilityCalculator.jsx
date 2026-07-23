import React, { useState } from 'react';
import { Calendar, Calculator, CheckCircle2, Sparkles, School, GraduationCap } from 'lucide-react';

/**
 * AgeEligibilityCalculator Component
 * 
 * Interactive admissions widget enabling parents to check eligibility cutoffs
 * for Bhulka (Kindergarten) and Primary / Secondary school entry.
 */
export default function AgeEligibilityCalculator() {
  const [selectedYear, setSelectedYear] = useState('2021');

  const ageCriteria = [
    { year: '2023', stage: 'Bhulka Playgroup', age: '2.5 to 3 Years', cutoff: 'Born between June 2022 - May 2023', focus: 'Sensory discovery & play' },
    { year: '2022', stage: 'Bhulka Nursery', age: '3 to 4 Years', cutoff: 'Born between June 2021 - May 2022', focus: 'Social interaction & verbal skills' },
    { year: '2021', stage: 'Bhulka LKG', age: '4 to 5 Years', cutoff: 'Born between June 2020 - May 2021', focus: 'Early phonics & motor skills' },
    { year: '2020', stage: 'Bhulka HKG', age: '5 to 6 Years', cutoff: 'Born between June 2019 - May 2020', focus: 'Pre-primary writing & numbers' },
    { year: '2019', stage: 'Angels Secondary Class 1', age: '6+ Years', cutoff: 'Born before June 1, 2019', focus: 'Formal schooling & STEM base' },
  ];

  const currentSelection = ageCriteria.find((item) => item.year === selectedYear) || ageCriteria[2];

  return (
    <div className="bg-gradient-to-br from-brand-teal-subtle/50 via-white to-brand-green-tint/40 p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-brand-green" />
            <span>Admissions Guidance</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
            Age Eligibility Calculator (Session 2026-27)
          </h3>
          <p className="text-xs md:text-sm text-slate-600">
            Select your child's birth year to determine exact admission stage for Bhulka or Angels School.
          </p>
        </div>

        <a
          href="/apply"
          className="self-start sm:self-auto bg-brand-green hover:bg-brand-green-light text-white text-xs px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shrink-0"
        >
          Apply Online
        </a>
      </div>

      {/* Year Selection Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select Child's Birth Year:
        </label>
        <div className="flex flex-wrap gap-2">
          {ageCriteria.map((item) => (
            <button
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                selectedYear === item.year
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-teal/40'
              }`}
            >
              {item.year} ({item.stage})
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-white p-6 rounded-2xl border border-brand-teal/20 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-teal font-bold text-sm">
            <School className="w-4 h-4 text-brand-green" />
            <span>Recommended Admission Grade:</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {currentSelection.stage}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-brand-teal" />
            <span>{currentSelection.cutoff}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 max-w-sm space-y-1.5 w-full md:w-auto">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>Academic Focus</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {currentSelection.focus}
          </p>
        </div>
      </div>

    </div>
  );
}
