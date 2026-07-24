import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Trophy, Sparkles, ArrowRight, Award, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrophyWatermarks } from '@/components/ui/SectionWatermark';
import SectionCarousel from '@/components/ui/SectionCarousel';

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fallbackEvents = [
    {
      id: '1',
      title: 'State Science Fair 1st Rank Champion',
      category: 'Science & Tech',
      eventDate: 'Dec 2025',
      description: 'Angels School STEM team won 1st rank for designing an automated solar hydroponics IoT model.',
      winnerName: 'Aarav Shah & Team (Class 11 Science)',
      image: 'https://images.unsplash.com/photo-1564069114553-74243c4c68e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'National Mathematics Olympiad Gold Medal',
      category: 'Olympiads',
      eventDate: 'Nov 2025',
      description: 'Secured All-India Gold Medal in calculus and rapid problem-solving competition.',
      winnerName: 'Kavya Joshi (Class 10)',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      title: 'Inter-School Autonomous Robotics Championship',
      category: 'Science & Tech',
      eventDate: 'Oct 2025',
      description: 'Autonomous line-follower robot project crowned champion among 40 participating schools.',
      winnerName: 'Rohan Patel (Class 12 Science)',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '4',
      title: 'State Level Sports & Athletics Meet',
      category: 'Sports & Culture',
      eventDate: 'Sep 2025',
      description: 'Secured 3 Gold medals in 100m sprint and high jump at Gujarat State Level Meet.',
      winnerName: 'Priya Sharma & Sports Contingent',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    },
  ];

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(fallbackEvents);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch events, using fallbacks:', err);
        setEvents(fallbackEvents);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'Science & Tech', label: 'Science & Tech' },
    { id: 'Olympiads', label: 'Olympiads' },
    { id: 'Sports & Culture', label: 'Sports & Culture' },
  ];

  const filteredEvents = activeCategory === 'all'
    ? events
    : events.filter((e) => e.category === activeCategory || (activeCategory === 'Science & Tech' && (e.category?.includes('Science') || e.category?.includes('Hackathon'))));

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <TrophyWatermarks />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E6F4F8] text-[#0082AD] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#7AA13B]" />
            <span>Campus Life & Competitions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest Events & Competitions
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Glimpses of robotics hackathons, science fairs, sports meets & national achievements at Angels School.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#0082AD] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#0082AD]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Cards Carousel */}
        <SectionCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }} autoPlay={true}>
          {filteredEvents.map((event, idx) => (
            <div
              key={event.id || idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                {/* Event Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={event.image || 'https://images.unsplash.com/photo-1564069114553-74243c4c68e2?auto=format&fit=crop&w=600&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-[#0082AD] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3 text-cyan-200" />
                    <span>{event.category || 'Event'}</span>
                  </span>

                  {/* Date Badge */}
                  {event.eventDate && (
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#7AA13B]" />
                      <span>{event.eventDate}</span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0082AD] transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {event.winnerName && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#7AA13B] bg-[#F2F7E9] px-2.5 py-1 rounded-lg">
                      <Award className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{event.winnerName}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-[#0082AD]">
                <span>Angels School Event</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </SectionCarousel>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0082AD] to-[#005F80] hover:from-[#006A8D] hover:to-[#004B66] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Explore All Events & Achievements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
