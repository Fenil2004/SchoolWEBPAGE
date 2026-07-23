import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch((err) => console.error('Failed to fetch blog posts:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Blog & Educational Insights | Angels School</title>
        <meta name="description" content="Read educational articles, parenting guidance, and NEET/JEE preparation tips from Angels School faculty." />
      </Head>

      <div className="bg-[#F8FAFC]">
        {/* Dynamic Admin-controlled Page Banner */}
        <PageHeaderBanner
          pageSlug="blog"
          defaultTitle="Angels School Blog & News"
          defaultBadge="Educational Articles & Insights"
          defaultSubtitle="Guidance articles, study strategies, and early childhood insights from our educators"
        />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 h-64 skeleton-loader" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                  <div
                    key={post.id || idx}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
                  >
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
                          <span className="absolute top-3 left-3 bg-brand-teal text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                            {post.category || 'News'}
                          </span>
                        </div>
                      ) : (
                        <div className="h-2 bg-brand-teal" />
                      )}

                      <div className="p-6 space-y-3">
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-brand-teal transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-brand-green" />
                        <span>{post.author || 'Angels School'}</span>
                      </div>
                      <Link href={`/blog/${post.slug || post.id}`}>
                        <Button variant="ghost" size="sm" className="text-brand-teal hover:text-brand-teal-dark font-bold text-xs p-0 gap-1 hover:bg-transparent">
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
