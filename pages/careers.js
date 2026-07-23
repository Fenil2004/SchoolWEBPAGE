import React, { useState } from 'react';
import Head from 'next/head';
import { Briefcase, Send, CheckCircle2, Building, Sparkles, UserCheck } from 'lucide-react';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function CareersPage() {
  const jobs = [
    { title: 'PGT Senior Science Faculty (Physics / Chemistry / Math / Bio)', dept: 'Higher Secondary Science (NEET / JEE)', type: 'Full-time', exp: '3+ Years' },
    { title: 'Early Childhood Educators', dept: 'Bhulka Kindergarten Division', type: 'Full-time', exp: '1+ Years' },
    { title: 'Commerce PGT Faculty (Accountancy & Economics)', dept: 'Higher Secondary Commerce', type: 'Full-time', exp: '2+ Years' },
    { title: 'STEM & Robotics Lab Coordinator', dept: 'Science Laboratories', type: 'Full-time', exp: '2+ Years' },
  ];

  return (
    <>
      <Head>
        <title>Careers & Job Openings | Angels School</title>
        <meta name="description" content="Join the faculty & staff team at Angels School and Bhulka Kindergarten in Gujarat." />
      </Head>

      <div className="bg-[#F8FAFC]">
        {/* Dynamic Page Header Banner */}
        <PageHeaderBanner
          pageSlug="careers"
          defaultTitle="Careers at Angels School"
          defaultBadge="Join Our Educator Team"
          defaultSubtitle="Shape young minds alongside Gujarat’s leading educators at Angels School & Bhulka"
        />


        {/* Job List */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-extrabold text-slate-900">Current Openings</h2>
              <p className="text-xs text-slate-500">Apply online for teaching & administrative positions across our campuses</p>
            </div>

            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                    <div className="text-xs text-brand-teal font-semibold">{job.dept}</div>
                    <div className="text-xs text-slate-400">Experience: {job.exp} | Type: {job.type}</div>
                  </div>

                  <button
                    onClick={() => alert(`Applying for position: ${job.title}`)}
                    className="bg-brand-green hover:bg-brand-green-light text-white text-xs px-5 py-2.5 rounded-xl font-bold transition-all shrink-0"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
