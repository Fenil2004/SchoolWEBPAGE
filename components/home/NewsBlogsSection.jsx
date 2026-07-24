import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Calendar, User, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SectionCarousel from '@/components/ui/SectionCarousel';

export default function NewsBlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      })
      .catch((err) => console.error('Failed to fetch home blogs:', err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4F8] text-[#0082AD] rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#7AA13B]" />
            <span>Latest Insights & Updates</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            News & Educational Articles
          </h2>
          <p className="text-slate-600 text-xs md:text-sm">
            Read guidance articles, entrance preparation strategies, and news updates from our educators.
          </p>
        </div>

        {/* Blogs Carousel */}
        <SectionCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} autoPlay={true}>
          {blogs.map((post, idx) => (
            <Card key={post.id || idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full group">
              <div>
                {post.image ? (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <span className="absolute top-3 left-3 bg-[#0082AD] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                      {post.category || 'News'}
                    </span>
                  </div>
                ) : (
                  <div className="h-2 bg-[#0082AD]" />
                )}

                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base md:text-lg group-hover:text-[#0082AD] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </CardContent>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-[#0082AD]" />
                  <span>{post.date || 'Recent'}</span>
                </div>

                <Link href={`/blog/${post.slug || post.id}`}>
                  <Button variant="ghost" size="sm" className="text-[#0082AD] hover:text-[#005F80] font-bold text-xs p-0 gap-1 hover:bg-transparent">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </SectionCarousel>

        {/* View All Blogs CTA */}
        <div className="text-center pt-4">
          <Link href="/blog">
            <Button size="lg" className="bg-brand-teal hover:bg-brand-teal-dark text-white font-bold text-xs md:text-sm px-8 rounded-xl shadow-md">
              <span>View All News & Blog Articles</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
