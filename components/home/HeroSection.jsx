import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Award, Users, BookOpen, GraduationCap, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { HeroWatermarks } from '@/components/ui/SectionWatermark';
import { useLanguage } from '@/context/LanguageContext';

const DEFAULT_HERO = {
  title: 'Angels School',
  subtitle: 'CAREER INSTITUTE',
  ctaText: 'Enroll Now',
  ctaLink: '/contact',
  videoUrl: '',
  imageUrl: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg'
};

function getYouTubeEmbedUrl(url) {
  if (!url) return 'https://www.youtube.com/embed/3wu0iQeJKyg?autoplay=1';
  let videoId = '';
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
  } else if (url.includes('youtube.com/watch')) {
    const parts = url.split('?')[1] || '';
    const params = new URLSearchParams(parts);
    videoId = params.get('v');
  } else if (url.includes('youtube.com/embed/')) {
    return url.includes('autoplay') ? url : `${url}?autoplay=1`;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
}

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('https://www.youtube.com/embed/3wu0iQeJKyg?autoplay=1');
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
            setHeroItems(activeHeroes);
          } else {
            setHeroItems([DEFAULT_HERO]);
          }
        } else {
          setHeroItems([DEFAULT_HERO]);
        }
      } else {
        setHeroItems([DEFAULT_HERO]);
      }
    } catch (error) {
      setHeroItems([DEFAULT_HERO]);
    } finally {
      setLoading(false);
    }
  };

  const currentHero = heroItems[currentIndex] || DEFAULT_HERO;

  const handleCtaClick = (link) => {
    if (!link) {
      window.location.href = '/contact';
      return;
    }

    const isYouTube = link.includes('youtube.com') || link.includes('youtu.be');
    if (isYouTube) {
      setActiveVideoUrl(getYouTubeEmbedUrl(link));
      setVideoOpen(true);
    } else if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = link;
    }
  };

  const openHeroVideo = (url) => {
    const embedUrl = getYouTubeEmbedUrl(url || 'https://www.youtube.com/embed/3wu0iQeJKyg');
    setActiveVideoUrl(embedUrl);
    setVideoOpen(true);
  };

  return (
    <section className="relative min-h-[550px] lg:min-h-[680px] bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] overflow-hidden flex flex-col justify-between pt-12 pb-16">
      <HeroWatermarks />
      
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0082AD]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7AA13B]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full my-auto">
        <AnimatePresence mode="wait">
          <div key={currentIndex} className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t('heroBadge')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                {language === 'gu' ? (
                  <>
                    {t('heroTitle1')}
                    <span className="block text-[#7AA13B] text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 tracking-normal">
                      {t('heroTitle2')}
                    </span>
                  </>
                ) : (
                  <>
                    {currentHero.title}
                    {currentHero.subtitle && (
                      <span className="block text-[#7AA13B] text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 tracking-normal">
                        {currentHero.subtitle}
                      </span>
                    )}
                  </>
                )}
              </h1>

              <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                {currentHero.description || t('heroSubtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                <Button
                  size="lg"
                  className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold px-8 py-4 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleCtaClick(currentHero.ctaLink || '/contact')}
                >
                  {currentHero.ctaText || t('applyOnline')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-white/10 hover:bg-white text-white hover:text-[#005F80] font-bold px-7 py-4 text-base rounded-xl transition-all"
                  onClick={() => window.location.href = '/courses'}
                >
                  {t('exploreCourses')}
                </Button>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/15 max-w-xl mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white">2002</p>
                  <p className="text-xs text-cyan-200 font-medium">Established</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-[#7AA13B]">4+</p>
                  <p className="text-xs text-cyan-200 font-medium">Major Campuses</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white">99.4%</p>
                  <p className="text-xs text-cyan-200 font-medium">Success Rate</p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Media Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                <img
                  src={currentHero.imageUrl || DEFAULT_HERO.imageUrl}
                  alt={currentHero.title}
                  className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004761]/80 via-[#0082AD]/20 to-transparent" />

                {/* Video Play Button (Renders ONLY if videoUrl is present) */}
                {currentHero.videoUrl && (
                  <button
                    onClick={() => openHeroVideo(currentHero.videoUrl)}
                    className="absolute inset-0 flex flex-col items-center justify-center group"
                  >
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-[#0082AD] ml-1 fill-[#0082AD]" />
                    </div>
                    <span className="mt-3 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wide">
                      Watch Campus Video
                    </span>
                  </button>
                )}
              </div>

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute -top-4 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 hidden sm:flex animate-bounce-slow">
                <div className="w-10 h-10 bg-[#E6F4F8] rounded-xl flex items-center justify-center text-[#0082AD]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Rank #1 Institute</p>
                  <p className="text-sm font-bold text-slate-800">Gujarat Education</p>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute -bottom-6 -left-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 bg-[#F2F7E9] rounded-xl flex items-center justify-center text-[#7AA13B]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Over 10,000+</p>
                  <p className="text-sm font-bold text-slate-800">Alumni Engineers & Doctors</p>
                </div>
              </div>

            </motion.div>

          </div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        {heroItems.length > 1 && (
          <div className="flex justify-center gap-2 mt-8 z-20">
            {heroItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#7AA13B] w-8' : 'bg-white/40 hover:bg-white/70 w-2.5'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none rounded-2xl overflow-hidden">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={activeVideoUrl}
              title="Angels School Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Curve Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16 text-[#F8FAFC]">
          <path d="M0 80C240 20 480 20 720 40C960 60 1200 60 1440 20V80H0Z" fill="currentColor" />
        </svg>
      </div>

    </section>
  );
}