import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { CommerceWatermarks } from '@/components/ui/SectionWatermark';

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data.slice(0, 4) : []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'NEET':
        return <Badge className="bg-[#7AA13B] text-white">NEET Medical</Badge>;
      case 'JEE':
        return <Badge className="bg-[#0082AD] text-white">JEE Engineering</Badge>;
      case 'GUJCET':
        return <Badge className="bg-amber-500 text-white">GUJCET State</Badge>;
      default:
        return <Badge className="bg-[#005F80] text-white">{category || 'Science Program'}</Badge>;
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <CommerceWatermarks />
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#0082AD]/20 rounded-full text-[#0082AD] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#7AA13B]" />
            <span>Academic Programs & DLP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#005F80] mb-4">
            Specialized Science Courses
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Comprehensive curriculum designed for 11th-12th Science board mastery and competitive entrance dominance
          </p>
        </motion.div>

        {/* Skeleton Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4 shadow-sm">
                <div className="h-40 rounded-xl skeleton-loader w-full" />
                <div className="h-5 skeleton-loader w-2/3 rounded" />
                <div className="h-4 skeleton-loader w-full rounded" />
                <div className="h-4 skeleton-loader w-4/5 rounded" />
              </div>
            ))}
          </div>
        ) : (
          /* Courses Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden rounded-2xl border border-slate-100 bg-white hover:shadow-card-hover transition-all duration-300 h-full group flex flex-col justify-between">
                  <div>
                    {/* Media Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={course.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg'}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 z-10">
                        {getCategoryBadge(course.category)}
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0082AD] transition-colors leading-snug line-clamp-1">
                        {course.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                        {course.description}
                      </p>

                      {course.features && course.features.length > 0 && (
                        <div className="pt-2 space-y-1.5 border-t border-slate-100">
                          {course.features.slice(0, 2).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#7AA13B] flex-shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </div>

                  <CardFooter className="p-5 pt-0">
                    <Link href={`/courses#${course.slug || 'courses'}`} className="w-full">
                      <Button variant="outline" className="w-full border-[#0082AD] text-[#0082AD] group-hover:bg-[#0082AD] group-hover:text-white font-bold text-xs transition-colors">
                        View Course
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Courses CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/courses">
            <Button size="lg" className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold px-8 shadow-md">
              View All Academic Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}