import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const DEFAULT_HERO = {
  title: 'Angels School',
  subtitle: 'CAREER INSTITUTE',
  ctaText: 'Enroll Now',
  ctaLink: '/contact',
  imageUrl: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg'
};

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [heroItems, setHeroItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  useEffect(() => {
    if (heroItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroItems.length]);

  const fetchHeroContent = async () => {
    try {
      const response = await fetch('/api/hero', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const activeHeroes = data.filter(h => h.isActive);
          if (activeHeroes.length > 0) {
            // Sort by displayOrder if needed, currently API does it
            setHeroItems(activeHeroes);
          } else {
            setHeroItems([DEFAULT_HERO]);
          }
        } else {
          setHeroItems([DEFAULT_HERO]);
        }
      } else {
        console.error('Failed to fetch hero content:', response.status);
        setHeroItems([DEFAULT_HERO]);
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
      setHeroItems([DEFAULT_HERO]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  const currentHero = heroItems[currentIndex] || DEFAULT_HERO;

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A94B8] via-[#0680A0] to-[#056C8C]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#0A94B8] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#76A440] rounded-full opacity-15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#056C8C]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <AnimatePresence mode="wait">
          <div key={currentIndex} className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6"
              >
                🎓 Welcome to Excellence in Education
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 min-h-[3em] lg:min-h-[2.5em]">
                {currentHero.title}
                {currentHero.subtitle && (
                  <span className="block text-[#E8F1F4] text-2xl md:text-3xl lg:text-4xl mt-2 font-medium">
                    {currentHero.subtitle}
                  </span>
                )}
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-[#76A440] hover:bg-[#8FC85C] text-white font-semibold px-8 transition-colors"
                  onClick={() => window.location.href = currentHero.ctaLink || '/contact'}
                >
                  {currentHero.ctaText || 'Enroll Now'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-semibold px-8"
                >
                  Scholarship Exam
                </Button>
              </div>
            </motion.div>

            {/* Video Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/20">
                <img
                  src={currentHero.imageUrl || DEFAULT_HERO.imageUrl}
                  alt={currentHero.title}
                  className="w-full h-[300px] lg:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#056C8C]/80 via-[#0A94B8]/40 to-transparent" />

                <button
                  onClick={() => setVideoOpen(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#0A94B8] ml-1" />
                  </div>
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold text-lg line-clamp-1">{currentHero.title}</p>
                  <p className="text-[#E8F1F4] text-sm">Watch our story</p>
                </div>
              </div>

              {/* Stats Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#E8F1F4] rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#056C8C]">10+</p>
                    <p className="text-sm text-gray-500">Branches</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>

        {/* Navigation Dots */}
        {heroItems.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows removed as per user request */}

      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/3wu0iQeJKyg"
              title="Journey Of Angels School Vidhyapith"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}