import React from 'react';
import { School, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, Sparkles, Building } from 'lucide-react';

/**
 * CampusComparison Component
 * 
 * Side-by-side matrix comparing the facilities, STEM labs, Bhulka play zones,
 * and academic streams across the 2 main Angels School campus branches.
 */
export default function CampusComparison() {
  const features = [
    { name: 'Bhulka Kindergarten (Playgroup to HKG)', branch1: true, branch2: true, desc: 'Sensory playrooms & splash park' },
    { name: 'Primary & Secondary (Grades 1 to 10)', branch1: true, branch2: true, desc: 'Full CBSE/State board schooling' },
    { name: 'Higher Secondary Science (NEET & JEE)', branch1: true, branch2: true, desc: 'Physics, Chemistry, Biology & Math' },
    { name: 'Higher Secondary Commerce Stream', branch1: true, branch2: true, desc: 'Accounts, Business & Economics' },
    { name: 'STEM & Robotics Laboratories', branch1: true, branch2: true, desc: 'Practical hands-on science' },
    { name: '15,000+ Book Central Library', branch1: true, branch2: true, desc: 'Digital pods & competitive archives' },
    { name: 'Expansive Sports Complex', branch1: true, branch2: true, desc: 'Athletic tracks & basketball arena' },
    { name: 'GPS-Tracked School Bus Fleet', branch1: true, branch2: true, desc: 'Female-attended safe transportation' },
    { name: '24/7 CCTV & Campus Security', branch1: true, branch2: true, desc: 'Monitored classrooms & play zones' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider bg-brand-teal-light px-3.5 py-1 rounded-full">
          <Building className="w-4 h-4 text-brand-green" />
          <span>Campus Infrastructure Matrix</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Compare Our 2 Campus Branches
        </h3>
        <p className="text-slate-600 text-xs md:text-sm">
          Both campus branches are fully equipped with state-of-the-art facilities for Bhulka, Secondary, and Higher Secondary streams.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/2">
                Facility / Academic Program
              </th>
              <th className="py-4 px-4 text-center text-sm font-extrabold text-brand-teal w-1/4 bg-brand-teal-subtle/50 rounded-t-2xl">
                Campus Branch 1
              </th>
              <th className="py-4 px-4 text-center text-sm font-extrabold text-brand-green w-1/4 bg-brand-green-tint/50 rounded-t-2xl">
                Campus Branch 2
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
            {features.map((feat, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-800">
                  <div>{feat.name}</div>
                  <div className="text-[11px] font-normal text-slate-400">{feat.desc}</div>
                </td>
                <td className="py-3.5 px-4 text-center bg-brand-teal-subtle/20">
                  {feat.branch1 ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-teal mx-auto" />
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center bg-brand-green-tint/20">
                  {feat.branch2 ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-green mx-auto" />
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-slate-600 font-medium">Have questions about branch allocation or admissions?</span>
        <a
          href="/contact"
          className="bg-brand-teal hover:bg-brand-teal-dark text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shrink-0"
        >
          Contact Campus Admin
        </a>
      </div>

    </div>
  );
}
