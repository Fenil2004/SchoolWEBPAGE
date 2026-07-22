import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTestimonials(Array.isArray(data) ? data.filter(t => t.isActive) : []);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#0082AD] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-10 skeleton-loader h-64" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0082AD] via-[#005F80] to-[#004761] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-cyan-100 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7AA13B]" />
            <span>Success Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            What Our Students & Parents Say
          </h2>
          <p className="text-cyan-100 max-w-2xl mx-auto text-sm sm:text-base">
            Real experiences from students who transformed their academic goals into top achievements at Angels School
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative text-slate-900 border border-slate-100"
            >
              <div className="absolute top-6 right-8 opacity-10 pointer-events-none">
                <Quote className="w-28 h-28 text-[#0082AD]" />
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start relative z-10">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].image || 'https://ui-avatars.com/api/?background=0082AD&color=fff&name=' + encodeURIComponent(testimonials[currentIndex].name)}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#E6F4F8] shadow-md"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#7AA13B] rounded-lg p-1.5 shadow">
                      <div className="flex">
                        {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-white fill-white" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start gap-1 mb-3">
                    {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
                    "{testimonials[currentIndex].message}"
                  </p>

                  <div>
                    <h4 className="text-lg font-bold text-[#005F80]">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-xs font-semibold text-[#7AA13B]">
                      {testimonials[currentIndex].role} — {testimonials[currentIndex].course}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-white/20 bg-white/10 hover:bg-white text-white hover:text-[#0082AD]"
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-[#7AA13B] w-7' : 'bg-white/40 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-white/20 bg-white/10 hover:bg-white text-white hover:text-[#0082AD]"
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}