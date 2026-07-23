import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * PageHeaderBanner Component
 * 
 * Reusable dynamic header banner rendered at the top of pages.
 * Controlled via Admin Panel with dynamic badge, title, subtitle, and custom bgImage URL.
 * If bgImage is null/empty, gracefully falls back to default brand gradient.
 */
export default function PageHeaderBanner({
  pageSlug,
  defaultTitle = "Angels School",
  defaultBadge = "Educational Excellence Since 2002",
  defaultSubtitle = "Shaping bright futures and rank-one results through dedicated science education",
}) {
  const [bannerData, setBannerData] = useState({
    title: defaultTitle,
    badge: defaultBadge,
    subtitle: defaultSubtitle,
    bgImage: null,
  });

  useEffect(() => {
    if (!pageSlug) return;
    fetch(`/api/banners?slug=${pageSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setBannerData({
            title: data.title || defaultTitle,
            badge: data.badge || defaultBadge,
            subtitle: data.subtitle || defaultSubtitle,
            bgImage: data.bgImage || null,
          });
        }
      })
      .catch((err) => console.error('Failed to fetch banner data:', err));
  }, [pageSlug, defaultTitle, defaultBadge, defaultSubtitle]);

  return (
    <section className="relative py-24 md:py-32 lg:py-36 min-h-[380px] md:min-h-[460px] flex items-center justify-center bg-gradient-to-r from-[#005F80] via-[#0082AD] to-[#7AA13B] overflow-hidden text-white w-full">
      {/* Dynamic Background Image Overlay with Low-Opacity Blue & Green Gradient */}
      {bannerData.bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bannerData.bgImage}
            alt={bannerData.title}
            className="w-full h-full object-cover"
          />
          {/* Low Opacity Blue & Green Mix Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00384D]/45 via-[#005F80]/35 to-[#7AA13B]/40 backdrop-blur-[0.5px]" />
        </div>
      )}


      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {bannerData.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-cyan-100 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-[#7AA13B]" />
              <span>{bannerData.badge}</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md leading-tight">
            {bannerData.title}
          </h1>

          {bannerData.subtitle && (
            <p className="text-cyan-100 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-sm">
              {bannerData.subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

