import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink, Sparkles, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Branches() {
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
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      const activeBranches = Array.isArray(data) ? data.filter(branch => branch.isActive) : [];
      setBranches(activeBranches);
    } catch (error) {
      console.error('Error fetching branches:', error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
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
              <span>Gujarat Campus Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our School Campuses</h1>
            <p className="text-cyan-100 text-base md:text-lg max-w-2xl mx-auto">
              Delivering benchmark science education across our state-of-the-art academic branches
            </p>
          </motion.div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '3+', label: 'Major Campuses' },
              { value: '15,000+', label: 'Enrolled Alumni' },
              { value: '100+', label: 'Senior Faculty' },
              { value: '100%', label: 'Smart Classrooms' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-3xl font-extrabold text-[#0082AD] mb-1">{stat.value}</p>
                <p className="text-slate-600 text-xs font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches List Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm">
                  <div className="h-48 rounded-xl skeleton-loader w-full" />
                  <div className="h-6 skeleton-loader w-1/2 rounded" />
                  <div className="h-4 skeleton-loader w-full rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden rounded-2xl border border-slate-100 bg-white hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      {/* Image Container */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <img
                          src={branch.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg'}
                          alt={branch.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00384D]/80 via-transparent to-transparent" />
                        {branch.isHeadquarter && (
                          <Badge className="absolute top-4 left-4 bg-[#7AA13B] text-white font-extrabold text-xs shadow-md">
                            Headquarters
                          </Badge>
                        )}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-extrabold">{branch.name}</h3>
                          <p className="text-xs text-cyan-200 font-bold">{branch.city}</p>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2.5 text-xs text-slate-600">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-[#0082AD] mt-0.5 flex-shrink-0" />
                            <span className="font-medium leading-relaxed">{branch.address}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-[#7AA13B] flex-shrink-0" />
                            <a href={`tel:${branch.phone}`} className="font-bold text-slate-800 hover:text-[#0082AD]">
                              {branch.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Mail className="w-4 h-4 text-[#0082AD] flex-shrink-0" />
                            <a href={`mailto:${branch.email}`} className="font-medium text-slate-700 hover:text-[#0082AD]">
                              {branch.email}
                            </a>
                          </div>
                        </div>

                        {branch.facilities && Array.isArray(branch.facilities) && (
                          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {branch.facilities.map((facility) => (
                              <span key={facility} className="px-2.5 py-1 bg-[#E6F4F8] text-[#0082AD] text-[11px] font-bold rounded-lg">
                                {facility}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </div>

                    <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="border-[#0082AD] text-[#0082AD] hover:bg-[#E6F4F8] font-bold text-xs h-10 rounded-xl"
                        onClick={() => {
                          const url = branch.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ', ' + branch.city)}`;
                          window.open(url, '_blank');
                        }}
                      >
                        <Navigation className="w-3.5 h-3.5 mr-1.5" />
                        Map Route
                      </Button>
                      <Link href={`/branches/${branch.slug || branch.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button className="w-full bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold text-xs h-10 rounded-xl">
                          Campus Info
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-extrabold text-[#005F80] mb-2">Angels School Campus Network</h2>
            <p className="text-slate-600 text-sm">Interactive map of our branches in Gujarat</p>
          </motion.div>

          <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white h-[380px] bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.1!2d72.1844!3d24.2567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cd8e84d77df3d%3A0x9b7d05c2e5c3a3b1!2sAngels%20School!5e0!3m2!1sen!2sin!4v1703506392000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Angels School Campus Map"
            />
          </div>
        </div>
      </section>

    </div>
  );
}