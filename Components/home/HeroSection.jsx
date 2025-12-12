import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, X, ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent } from '@/Components/ui/dialog';

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroContent();
  }, []);

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
        console.log('Fetched hero content:', data); // Debug log
        if (Array.isArray(data) && data.length > 0) {
          // Get the first active hero content
          const activeHero = data.find(h => h.isActive) || data[0];
          console.log('Selected active hero:', activeHero); // Debug log
          console.log('All heroes isActive status:', data.map(h => ({ title: h.title, isActive: h.isActive }))); // Debug log
          setHeroContent(activeHero);
        } else {
          console.log('No hero content found in response'); // Debug log
        }
      } else {
        console.error('Failed to fetch hero content:', response.status);
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default content if no hero content is found
  const title = heroContent?.title || 'Angels School';
  const subtitle = heroContent?.subtitle || 'CAREER INSTITUTE';
  const ctaText = heroContent?.ctaText || 'Enroll Now';
  const ctaLink = heroContent?.ctaLink || '/contact';
  const backgroundImage = heroContent?.imageUrl || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg';

  return (
    <section className="relative min-h-[400px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background with gradient overlay - Updated to brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A94B8] via-[#0680A0] to-[#056C8C]">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating circles decoration - Updated colors */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#0A94B8] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#76A440] rounded-full opacity-15 blur-3xl" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#056C8C]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6"
            >
              🎓 Welcome to Excellence in Education
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {title}
              <span className="block text-[#E8F1F4]">{subtitle}</span>
            </h1>

            <p className="text-lg text-[#E8F1F4] mb-8 max-w-xl mx-auto lg:mx-0">
              Building a great nation through holistic development of the students.
              Prepare for JEE, NEET & Board Exams with Gujarat's leading institute.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#76A440] hover:bg-[#8FC85C] text-white font-semibold px-8 transition-colors"
                onClick={() => window.location.href = ctaLink}
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8"
              >
                Scholarship Exam
              </Button>
            </div>
          </motion.div>

          {/* Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={backgroundImage}
                alt={title}
                className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#056C8C]/80 via-[#0A94B8]/40 to-transparent" />

              {/* Play Button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#0A94B8] ml-1" />
                </div>
              </button>

              {/* Video Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">Journey Of Angels School Vidhyapith</p>
                <p className="text-[#E8F1F4] text-sm">Watch our story</p>
              </div>
            </div>

            {/* Stats Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#E8F1F4] rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#056C8C]">10+</p>
                  <p className="text-sm text-gray-500">Branches</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
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
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}