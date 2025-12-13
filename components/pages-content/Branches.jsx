import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Building2, Users, Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      console.log('Fetched branches:', data);
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Our Branches</h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              With 10+ branches across Gujarat, quality education is always within your reach
            </p>
          </motion.div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { value: '10+', label: 'Branches' },
              { value: '8', label: 'Cities' },
              { value: '15000+', label: 'Students' },
              { value: '100+', label: 'Faculty' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <p className="text-3xl font-bold text-[#0A94B8]">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Branches List */}
          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A94B8]"></div>
              </div>
            ) : (
              branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${branch.isHeadquarter ? 'ring-2 ring-[#0A94B8]' : ''}`}>
                    <div className="grid md:grid-cols-2">
                      {/* Image - Fixed height container with inline styles */}
                      <div
                        className="relative w-full overflow-hidden bg-gray-200"
                        style={{ height: '192px', maxHeight: '192px' }}
                      >
                        <img
                          src={branch.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg'}
                          alt={branch.name}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                          }}
                        />
                        {branch.isHeadquarter && (
                          <Badge className="absolute top-4 left-4 bg-[#76A440] z-10">
                            Head Office
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 md:text-left text-center">
                        <div className="flex md:flex-row flex-col items-center md:items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[#056C8C]">{branch.name}</h3>
                            <p className="text-sm text-[#0A94B8]">{branch.city}</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex md:items-start items-center justify-center md:justify-start gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-[#0A94B8] mt-1 flex-shrink-0" />
                            <span className="text-gray-600 line-clamp-2 break-all">{branch.address}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
                            <Phone className="w-4 h-4 text-[#0A94B8] flex-shrink-0" />
                            <a href={`tel:${branch.phone}`} className="text-gray-600 hover:text-[#0A94B8]">
                              {branch.phone}
                            </a>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
                            <Mail className="w-4 h-4 text-[#0A94B8] flex-shrink-0" />
                            <a href={`mailto:${branch.email}`} className="text-gray-600 hover:text-[#0A94B8]">
                              {branch.email}
                            </a>
                          </div>
                        </div>

                        {/* Facilities */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                          {branch.facilities && Array.isArray(branch.facilities) && branch.facilities.map((facility) => (
                            <Badge key={facility} variant="secondary" className="bg-gray-100 text-gray-700">
                              {facility}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="border-[#0A94B8] text-[#0A94B8] hover:bg-[#E8F1F4]">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Directions
                          </Button>
                          <Link href={`/branches/${branch.slug || branch.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            <Button className="w-full bg-[#76A440] hover:bg-[#8FC85C] text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us on Map</h2>
            <p className="text-gray-600">Visit any of our branches across Gujarat</p>
          </motion.div>

          <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.458788!2d72.1519!3d21.7645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQ1JzUyLjIiTiA3MsKwMDknMDYuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GCI Branches Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}