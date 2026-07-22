import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery?full=true', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      const activeImages = Array.isArray(data) ? data.filter(img => img.isActive) : [];
      setGalleryItems(activeImages);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (selectedIndex + 1) % filteredItems.length;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="bg-[#F8FAFC]">
      
      {/* Page Header Banner */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-cyan-100 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>Campus Life & Events Showcase</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Media Gallery</h1>
            <p className="text-cyan-100 text-base md:text-lg max-w-2xl mx-auto">
              Explore our state-of-the-art laboratories, smart classrooms, events, and student milestones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Category Filter Tabs */}
          <div className="flex justify-center mb-12">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                <TabsTrigger value="all" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">All Highlights</TabsTrigger>
                <TabsTrigger value="campus" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">Campus</TabsTrigger>
                <TabsTrigger value="classroom" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">Classrooms</TabsTrigger>
                <TabsTrigger value="lab" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">Science Labs</TabsTrigger>
                <TabsTrigger value="events" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">Events</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Skeleton Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="rounded-2xl skeleton-loader aspect-square" />
              ))}
            </div>
          ) : (
            /* Gallery Grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.04 }}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square bg-slate-200 shadow-sm border border-slate-100"
                    onClick={() => openLightbox(item, index)}
                  >
                    <img
                      src={item.imageUrl || item.src || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg'}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00384D]/90 via-[#0082AD]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                        <ZoomIn className="w-4 h-4 text-[#7AA13B]" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-cyan-200 font-medium capitalize">{item.category || 'Angels School'}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4F8] border border-[#0082AD]/20 rounded-full text-[#0082AD] text-xs font-bold uppercase tracking-wider mb-3">
              <Play className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>Video Tours</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#005F80] mb-3">Watch Our Campus Life</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">Experience the vibrant academic atmosphere at Angels School</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Journey of Angels School Vidyapith', thumbnail: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg' },
              { title: 'Academic Excellence & JEE Rankers', thumbnail: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566944/school/gallery/gallery2.jpg' },
              { title: 'State of the Art Science Laboratories', thumbnail: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg' },
            ].map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md border border-slate-100"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#00384D]/50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-[#0082AD] ml-1 fill-[#0082AD]" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold text-sm">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none rounded-2xl overflow-hidden">
          <div className="relative flex items-center justify-center w-full h-[85vh]">
            <img
              src={selectedImage?.imageUrl || selectedImage?.src || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg'}
              alt={selectedImage?.title}
              className="max-w-full max-h-full object-contain p-4"
              onError={(e) => {
                e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
              }}
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {filteredItems.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-7 h-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-7 h-7" />
                </Button>
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent text-center">
              <p className="text-white text-lg font-bold">{selectedImage?.title}</p>
              {selectedImage?.description && (
                <p className="text-cyan-200 text-xs mt-1">{selectedImage?.description}</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}