import React from 'react';
import Head from 'next/head';
import ToppersHallOfFame from '@/components/home/ToppersHallOfFame';
import EventsAchievementsSection from '@/components/achievements/EventsAchievementsSection';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';
import { Trophy, Award, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AchievementsPage() {
  const boardStats = [
    { title: 'Class 10 Board Pass Rate', val: '100%' },
    { title: 'Class 12 Science Pass Rate', val: '99.8%' },
    { title: 'Students Above 90% in Boards', val: '450+' },
    { title: 'NEET & JEE Top Ranks', val: '500+' },
  ];

  return (
    <>
      <Head>
        <title>Achievements & Toppers | Angels School</title>
        <meta name="description" content="Explore Board examination toppers, NEET & JEE rankers, and national awards won by Angels School students." />
      </Head>

      <div className="bg-[#F8FAFC]">
        {/* Dynamic Admin-controlled Page Header Banner */}
        <PageHeaderBanner
          pageSlug="achievements"
          defaultTitle="Achievements & Board Toppers"
          defaultBadge="Hall of Excellence"
          defaultSubtitle="Celebrating our stellar Class 10 & 12 Board examination results and Science NEET/JEE top percentile scorers"
        />

        {/* Stats Grid */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {boardStats.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
                <div className="text-3xl font-extrabold text-brand-teal">{s.val}</div>
                <div className="text-xs font-bold text-slate-700">{s.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Toppers Hall of Fame */}
        <ToppersHallOfFame />

        {/* Event & Competition Achievements Section */}
        <EventsAchievementsSection />
      </div>
    </>
  );
}
