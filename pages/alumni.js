import React, { useState } from 'react';
import Head from 'next/head';
import { Users, GraduationCap, Globe, Send, CheckCircle2, Building, Sparkles } from 'lucide-react';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function AlumniPage() {
  const [formData, setFormData] = useState({ name: '', year: '', campus: 'angels', profession: '', email: '', linkedin: '' });

  const alumniList = [
    { name: 'Dr. Rahul Mehta', batch: 'Batch of 2014', role: 'Cardiologist, AIIMS New Delhi', quote: 'Angels School Science faculty built my fundamental biology & chemistry foundation for NEET.', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sneha Patel', batch: 'Batch of 2017', role: 'Software Engineer, Google', quote: 'Cracking JEE Advanced was possible thanks to regular mock tests and doubt solving desks at campus.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Harsh Shah', batch: 'Batch of 2016', role: 'Chartered Accountant (CA)', quote: 'The Commerce faculty at Angels School made Accountancy intuitive and career-ready.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <>
      <Head>
        <title>Alumni Network | Angels School</title>
        <meta name="description" content="Connect with Angels School global alumni network excelling in top medical, engineering, and business institutions." />
      </Head>

      <div className="bg-[#F8FAFC]">
        {/* Dynamic Page Header Banner */}
        <PageHeaderBanner
          pageSlug="alumni"
          defaultTitle="Our Alumni — Making Us Proud"
          defaultBadge="Global Network"
          defaultSubtitle="Over 15,000+ Angels School graduates leading innovations in medicine, technology, and finance"
        />


        {/* Stories Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900">Featured Alumni Stories</h2>
              <p className="text-xs text-slate-500 mt-1">Inspiring the next generation of Angels School students</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {alumniList.map((a, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-card-hover transition-all space-y-4">
                  <img src={a.image} alt={a.name} className="w-20 h-20 rounded-2xl object-cover" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{a.name}</h3>
                    <div className="text-xs font-semibold text-brand-teal">{a.batch}</div>
                    <div className="text-xs font-bold text-brand-green">{a.role}</div>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{a.quote}"</p>
                </div>
              ))}
            </div>

            {/* Alumni Registration Form */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-extrabold text-slate-900">Are You an Angels School Alumni?</h3>
                <p className="text-xs text-slate-500">Register to join our alumni portal and mentorship network.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Alumni Registration Submitted!"); }} className="grid sm:grid-cols-2 gap-4 text-xs">
                <input type="text" placeholder="Full Name *" required className="h-11 px-4 rounded-xl border border-slate-200 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="Passout Batch Year (e.g. 2018) *" required className="h-11 px-4 rounded-xl border border-slate-200 outline-none" onChange={(e) => setFormData({...formData, year: e.target.value})} />
                <input type="text" placeholder="Current Profession / University *" required className="h-11 px-4 rounded-xl border border-slate-200 outline-none" onChange={(e) => setFormData({...formData, profession: e.target.value})} />
                <input type="email" placeholder="Email Address *" required className="h-11 px-4 rounded-xl border border-slate-200 outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <button type="submit" className="sm:col-span-2 bg-brand-teal text-white h-11 rounded-xl font-bold hover:bg-brand-teal-dark transition-all">
                  Register as Alumni
                </button>
              </form>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
