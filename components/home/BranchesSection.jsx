import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight, Building, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function BranchesSection() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branches', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBranches(Array.isArray(data) ? data.filter(b => b.isActive).slice(0, 4) : []);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4F8] border border-[#0082AD]/20 rounded-full text-[#0082AD] text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5 text-[#7AA13B]" />
            <span>Gujarat Campus Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#005F80] mb-4">
            Our Campus Branches
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Providing accessible, world-class education facilities across Gujarat for student convenience
          </p>
        </motion.div>

        {/* Skeleton Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-2xl border border-slate-100 p-4 space-y-4 shadow-sm">
                <div className="h-40 rounded-xl skeleton-loader w-full" />
                <div className="h-4 skeleton-loader w-3/4 rounded" />
                <div className="h-3 skeleton-loader w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : (
          /* Branches Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id || branch.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden rounded-2xl border border-slate-100 bg-white hover:shadow-card-hover transition-all duration-300 h-full group flex flex-col justify-between">
                  <div>
                    {/* Branch Media Header */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={branch.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg'}
                        alt={branch.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00384D]/85 via-black/20 to-transparent" />
                      
                      {branch.isHeadquarter && (
                        <span className="absolute top-3 right-3 bg-[#7AA13B] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow">
                          HQ Campus
                        </span>
                      )}

                      <h3 className="absolute bottom-3 left-4 right-4 text-white font-extrabold text-base leading-snug">
                        {branch.name}
                      </h3>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start gap-2.5 text-xs text-slate-600">
                        <MapPin className="w-4 h-4 text-[#0082AD] mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{branch.address}, {branch.city}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-600">
                        <Phone className="w-4 h-4 text-[#7AA13B] flex-shrink-0" />
                        <a href={`tel:${branch.phone}`} className="hover:text-[#0082AD] font-semibold truncate">
                          {branch.phone}
                        </a>
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-4 pt-0">
                    <Link href={`/branches/${branch.slug || 'bhavnagar'}`}>
                      <Button variant="outline" size="sm" className="w-full border-[#0082AD] text-[#0082AD] hover:bg-[#E6F4F8] font-bold text-xs">
                        Campus Details
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/branches">
            <Button size="lg" className="bg-[#0082AD] hover:bg-[#005F80] text-white font-bold px-8 shadow-md">
              Explore All Campuses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}