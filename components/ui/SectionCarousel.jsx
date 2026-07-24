import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SectionCarousel({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
}) {
  const items = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerView(itemsPerView.mobile || 1);
      } else if (width < 1024) {
        setPerView(itemsPerView.tablet || 2);
      } else {
        setPerView(itemsPerView.desktop || 3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, items.length - perView);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  useEffect(() => {
    if (!autoPlay || maxIndex === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, maxIndex]);

  if (items.length === 0) return null;

  return (
    <div className="relative space-y-6 group">
      {/* Top Header Controls (when embedded near section title) */}
      {showControls && items.length > perView && (
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#0082AD] hover:bg-[#E6F4F8] hover:border-[#0082AD] transition-all cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#0082AD] hover:bg-[#E6F4F8] hover:border-[#0082AD] transition-all cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Carousel Track Container */}
      <div ref={containerRef} className="overflow-hidden rounded-3xl p-1 -m-1">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `-${currentIndex * (100 / perView)}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {items.map((child, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{
                width: `calc(${100 / perView}% - ${(24 * (perView - 1)) / perView}px)`,
              }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Pagination Dots */}
      {showDots && maxIndex > 0 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all rounded-full ${
                currentIndex === idx
                  ? 'w-8 h-2.5 bg-[#0082AD]'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
