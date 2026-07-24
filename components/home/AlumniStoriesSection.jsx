import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Sparkles, ArrowRight, Award, Quote, Building2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrophyWatermarks } from '@/components/ui/SectionWatermark';
import SectionCarousel from '@/components/ui/SectionCarousel';

export default function AlumniStoriesSection() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackStories = [
    {
      id: '1',
      name: 'Dr. Devansh Parikh',
      batch: 'Batch of 2017 (Science NEET)',
      role: 'MD Resident, AIIMS New Delhi',
      achievement: 'AIR 48 in NEET-UG | Class 12 Science Topper',
      quote: 'The rigorous STEM foundation and mentorship at Angels School paved my journey to AIIMS New Delhi.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      name: 'Riya Patel',
      batch: 'Batch of 2019 (Science JEE)',
      role: 'Software Engineer, Google India',
      achievement: 'IIT Bombay Computer Science Graduate',
      quote: 'Concept clarity in Physics and Advanced Math at Angels School helped me crack JEE Advanced seamlessly.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      name: 'Harsh Shah',
      batch: 'Batch of 2020 (Commerce Stream)',
      role: 'Chartered Accountant (CA)',
      achievement: 'All India Rank 14 in CA Final Exam',
      quote: 'Guidance in Accountancy and Economics at Angels School instilled the discipline needed for CA excellence.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ];

  useEffect(() => {
    fetch('/api/alumni-stories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStories(data);
        } else {
          setStories(fallbackStories);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch alumni stories, using fallbacks:', err);
        setStories(fallbackStories);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <TrophyWatermarks />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E6F4F8] text-[#0082AD] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-[#7AA13B]" />
            <span>Legacy of Excellence</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Featured Alumni Stories
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Inspiring the next generation of Angels School students across Medicine, Engineering, & Finance.
          </p>
        </div>

        {/* Stories Carousel */}
        <SectionCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} autoPlay={true}>
          {stories.map((story, idx) => {
            const quoteText = story.quote || story.message || 'The strong academic environment and guidance at Angels School paved my journey to success.';
            return (
              <div
                key={story.id || idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
              >
                <div className="space-y-4 relative z-10">
                  {/* Header Profile */}
                  <div className="flex items-center gap-4">
                    <img
                      src={story.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'}
                      alt={story.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0082AD] transition-colors leading-tight">
                        {story.name}
                      </h3>
                      <div className="text-xs font-bold text-[#0082AD] mt-0.5">
                        {story.batch}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-[#7AA13B]" />
                        <span>{story.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Pill */}
                  {story.achievement && (
                    <div className="bg-[#F2F7E9] text-[#7AA13B] text-xs font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
                      <Award className="w-4 h-4 flex-shrink-0" />
                      <span>{story.achievement}</span>
                    </div>
                  )}

                  {/* Story Quote */}
                  <div className="relative pt-2">
                    <Quote className="w-6 h-6 text-[#0082AD]/10 absolute -top-1 -left-1 pointer-events-none" />
                    <p className="text-xs md:text-sm text-slate-600 italic leading-relaxed pl-3 border-l-2 border-[#0082AD]">
                      "{quoteText}"
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-[#0082AD]">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Angels School Graduate</span>
                  </span>
                </div>
              </div>
            );
          })}
        </SectionCarousel>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <Link
            href="/alumni"
            className="inline-flex items-center gap-2 bg-[#0082AD] hover:bg-[#005F80] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <GraduationCap className="w-4 h-4 text-[#7AA13B]" />
            <span>Connect with Angels School Alumni Network</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
