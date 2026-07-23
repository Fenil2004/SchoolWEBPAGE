import React, { useState } from 'react';
import { Play, Video, X, Sparkles, School, Microscope, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * VirtualTourModal Component
 * 
 * Interactive component allowing parents and students to launch a virtual video/photo tour
 * of Angels School facilities (STEM Physics/Chemistry/Biology Labs, Bhulka Playrooms, Library, Sports fields).
 */
export default function VirtualTourModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const tourFeatures = [
    {
      id: 'bhulka',
      title: 'Bhulka Kindergarten Playrooms',
      category: 'bhulka',
      icon: School,
      desc: 'Sensory learning spaces, indoor play zones, splash park, and early childhood activity hubs.',
      image: 'https://images.unsplash.com/photo-1587691592099-24045742c427?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'stem',
      title: 'Advanced Science & Physics Labs',
      category: 'science',
      icon: Microscope,
      desc: 'Fully equipped practical laboratories supporting CBSE/State curriculum and NEET/JEE experimental learning.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'library',
      title: '15,000+ Volume Central Library',
      category: 'academics',
      icon: BookOpen,
      desc: 'Digital reading pods, reference archives for competitive exams (NEET/JEE/CA), and quiet study zones.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sports',
      title: 'Expansive Sports Complex',
      category: 'campus',
      icon: Compass,
      desc: 'Athletic tracks, basketball courts, badminton arenas, and indoor chess/table tennis training.',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <>
      {/* Banner Strip Component on Home Page */}
      <section className="py-12 bg-gradient-to-r from-brand-dark via-brand-teal-dark to-[#00384D] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 px-3.5 py-1.5 rounded-full text-brand-green-light text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>360° Interactive Campus Tour</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                Experience Angels School Before You Visit
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
                Take a virtual walkthrough of our two main campus branches, modern STEM laboratories, Bhulka kindergarten play zones, and sports facilities.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-4 bg-gradient-to-r from-brand-green to-brand-green-light hover:from-brand-green-light hover:to-brand-green text-white px-7 py-4 rounded-2xl font-bold shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium text-white/80">Launch Video</div>
                  <div className="text-sm font-bold">Start Virtual Tour</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Header Bar */}
              <div className="bg-brand-teal text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video className="w-6 h-6 text-brand-green-light" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Angels School Virtual Campus Walkthrough</h3>
                    <p className="text-xs text-white/80">Explore our 2 Campus Branches & Facilities</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Video Player Placeholder / Feature Showcase Grid */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Simulated Video Player Box */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video shadow-inner group flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
                    alt="Angels School Campus Overview"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-green text-white flex items-center justify-center shadow-glow animate-pulse">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-bold">Angels School Campus & Bhulka Overview</h4>
                      <p className="text-xs text-slate-300">Click to play high-definition campus video tour</p>
                    </div>
                  </div>
                </div>

                {/* Campus Feature Highlights */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-teal" />
                    <span>Featured Facilities & Learning Environments</span>
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {tourFeatures.map((feat) => {
                      const IconComponent = feat.icon;
                      return (
                        <div key={feat.id} className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-teal/30 hover:bg-brand-teal-subtle/30 transition-all">
                          <img
                            src={feat.image}
                            alt={feat.title}
                            className="w-20 h-20 rounded-xl object-cover shrink-0"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-brand-teal font-semibold text-xs">
                              <IconComponent className="w-3.5 h-3.5" />
                              <span>{feat.title}</span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-slate-500">Would you like an in-person guided campus walkthrough?</span>
                <a
                  href="/contact"
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
                >
                  Schedule Campus Visit
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
