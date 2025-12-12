'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from 'lucide-react';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';

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
      const response = await fetch('/api/gallery', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      console.log('Fetched gallery images:', data);
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
    <div>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-[#0A94B8] to-[#056C8C] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Gallery</h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Explore our campus, facilities, and memorable moments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8 md:mb-12 overflow-x-auto"
          >
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white shadow-sm flex-nowrap">
                <TabsTrigger value="all" className="px-3 md:px-6 text-sm md:text-base">All</TabsTrigger>
                <TabsTrigger value="campus" className="px-3 md:px-6 text-sm md:text-base">Campus</TabsTrigger>
                <TabsTrigger value="classroom" className="px-3 md:px-6 text-sm md:text-base">Classroom</TabsTrigger>
                <TabsTrigger value="lab" className="px-3 md:px-6 text-sm md:text-base">Labs</TabsTrigger>
                <TabsTrigger value="events" className="px-3 md:px-6 text-sm md:text-base">Events</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Gallery Grid - Always 2 columns minimum */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A94B8]"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square bg-gray-200"
                    onClick={() => openLightbox(item, index)}
                  >
                    <img
                      src={item.imageUrl || item.src || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg'}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <ZoomIn className="w-10 h-10 text-white mx-auto mb-2" />
                        <p className="text-white font-medium">{item.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
              Videos
            </span>
            <h2 className="text-3xl font-bold text-[#056C8C] mb-4">Watch Our Journey</h2>
            <p className="text-gray-600">Experience Angels School through our videos</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Journey of Angels School', thumbnail: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg' },
              { title: 'Student Success Stories', thumbnail: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566944/school/gallery/gallery2.jpg' },
              { title: 'Campus Tour', thumbnail: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg' },
            ].map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/images/gallery-fallback.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#0A94B8] ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0">
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Main Image */}
            <img
              src={selectedImage?.imageUrl || selectedImage?.src || '/images/gallery-fallback.jpg'}
              alt={selectedImage?.title}
              className="max-w-full max-h-[90vh] object-contain"
              onError={(e) => {
                e.currentTarget.src = '/images/gallery-fallback.jpg';
              }}
            />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {filteredItems.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
              <p className="text-white text-xl font-semibold text-center">{selectedImage?.title}</p>
              {selectedImage?.description && (
                <p className="text-gray-300 text-sm text-center mt-2">{selectedImage?.description}</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}