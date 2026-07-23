import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Award, Sparkles, Medal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * EventsAchievementsSection Component
 * 
 * Showcases event wins, competitions, and tournament trophies on the Achievements Page.
 * Controlled via Admin Panel (`/api/events`).
 */
export default function EventsAchievementsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
      })
      .catch((err) => console.error('Failed to fetch event achievements:', err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && events.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-green/20 text-brand-green font-bold rounded-full text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-brand-teal" />
            <span>Event Victories & Competitions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Events & Competition Achievements
          </h2>
          <p className="text-slate-600 text-xs md:text-sm">
            Recognizing our student champions in State Science Fairs, Olympiads, Hackathons & Athletic Meets.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-slate-50/70 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {item.image ? (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1564069114553-74243c4c68e2?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-brand-green text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                        {item.category || 'Award'}
                      </span>
                    </div>
                  ) : (
                    <div className="h-2 bg-brand-green" />
                  )}

                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base md:text-lg group-hover:text-brand-teal transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    {item.winnerName && (
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
                        <Medal className="w-3.5 h-3.5 text-amber-500" />
                        <span>{item.winnerName}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </CardContent>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100/60 flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-auto">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-green" />
                    <span>{item.eventDate || 'Recent Event'}</span>
                  </div>
                  <span className="text-brand-teal font-extrabold">Angels Champion</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
