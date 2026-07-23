import React from 'react';
import { FileText, Download, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

/**
 * DocumentsChecklist Component
 * 
 * Grid outlining required admission documents for Bhulka (Kindergarten),
 * Secondary (1-10), and Higher Secondary (11-12 Science/Commerce), with PDF download trigger.
 */
export default function DocumentsChecklist() {
  const documents = [
    { title: 'Student Birth Certificate', req: 'Mandatory for Bhulka & Class 1', note: 'Original + 2 photocopies' },
    { title: 'Previous School TC / LC', req: 'Grades 2 to 12', note: 'Original Transfer Certificate from previous school' },
    { title: 'Last Academic Marksheet', req: 'Grades 2 to 12', note: 'Certified copy of last year report card' },
    { title: 'Passport Photographs', req: 'All Applicants', note: '4 recent color passport-size photos of child' },
    { title: 'Aadhaar Card Copy', req: 'Child & Both Parents', note: 'Clear photocopy of Aadhaar cards' },
    { title: 'Medical Fitness Certificate', req: 'All Applicants', note: 'Signed by registered medical practitioner' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider bg-brand-teal-light px-3.5 py-1 rounded-full">
            <FileText className="w-4 h-4 text-brand-green" />
            <span>Application Checklist</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
            Required Documents for Admission
          </h3>
        </div>

        <button
          onClick={() => alert("Downloading Admission Documents Checklist PDF...")}
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-light text-white text-xs px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Checklist PDF</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover:border-brand-teal/30 transition-all">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
              <span>{doc.title}</span>
            </div>
            <div className="text-xs font-semibold text-brand-teal">{doc.req}</div>
            <div className="text-[11px] text-slate-500">{doc.note}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
