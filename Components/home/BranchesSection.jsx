import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

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
        console.log('Fetched branches:', data); // Debug log
        setBranches(Array.isArray(data) ? data.filter(b => b.isActive).slice(0, 4) : []); // Show first 4 active branches
      } else {
        console.error('Failed to fetch branches:', response.status);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading branches...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
            Our Network
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#056C8C] mb-4">
            Our Branches
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With 10+ branches across Gujarat, we bring quality education closer to you
          </p>
        </motion.div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={branch.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80'}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">
                    {branch.name}
                  </h3>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#0A94B8] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{branch.address}, {branch.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#0A94B8] flex-shrink-0" />
                    <a href={`tel:${branch.phone}`} className="text-gray-600 hover:text-[#0A94B8]">
                      {branch.phone}
                    </a>
                  </div>
                  {branch.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">{branch.email}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href={createPageUrl('Branches')}>
            <Button size="lg" className="bg-[#0A94B8] text-white hover:bg-[#76A440]">
              View All Branches
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}