import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setBlog(data);
        }
      })
      .catch((err) => console.error('Failed to fetch article details:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-bold">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Article Not Found</h1>
        <p className="text-xs text-slate-500">The requested blog post could not be located.</p>
        <Link href="/blog">
          <Button className="bg-brand-teal text-white text-xs font-bold px-6 py-2 rounded-xl">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${blog.title} | Angels School Blog`}</title>
        <meta name="description" content={blog.summary || blog.title} />
      </Head>

      <div className="bg-[#F8FAFC] min-h-screen pb-20">
        {/* Dynamic Admin-controlled Header Banner */}
        <PageHeaderBanner
          pageSlug="blog"
          defaultTitle={blog.title}
          defaultBadge={blog.category || "Educational Insight"}
          defaultSubtitle={`Published by ${blog.author || 'Angels School'} on ${blog.date || 'Recent'}`}
        />

        <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20 space-y-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-6">
            
            {/* Navigation & Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 text-xs font-bold text-slate-500">
              <Link href="/blog">
                <button className="inline-flex items-center gap-1.5 text-brand-teal hover:text-brand-teal-dark transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Articles</span>
                </button>
              </Link>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-brand-green" />
                  <span>{blog.author}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{blog.date}</span>
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {blog.image && (
              <div className="rounded-2xl overflow-hidden shadow-md max-h-[420px]">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Summary Callout */}
            <div className="p-4 rounded-2xl bg-brand-teal-light border border-brand-teal/20 text-brand-teal text-sm font-semibold leading-relaxed">
              {blog.summary}
            </div>

            {/* Article Content Body */}
            <div className="prose max-w-none text-slate-700 text-sm md:text-base leading-relaxed space-y-4 pt-2">
              {(blog.content || blog.summary).split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Share & Footer CTA */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-bold text-slate-500">Category: <span className="text-brand-teal font-extrabold">{blog.category}</span></div>
              <Button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: blog.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }
                }}
                variant="outline"
                className="text-xs font-bold gap-2 rounded-xl border-slate-200"
              >
                <Share2 className="w-3.5 h-3.5 text-brand-teal" />
                <span>Share Article</span>
              </Button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

