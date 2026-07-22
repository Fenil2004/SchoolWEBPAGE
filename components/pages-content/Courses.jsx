import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';


export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');
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
        setCourses(Array.isArray(data) ? data : []);
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
        return <Badge className="bg-[#7AA13B] text-white font-bold">NEET Medical</Badge>;
      case 'JEE':
        return <Badge className="bg-[#0082AD] text-white font-bold">JEE Engineering</Badge>;
      case 'GUJCET':
        return <Badge className="bg-amber-500 text-white font-bold">GUJCET State</Badge>;
      default:
        return <Badge className="bg-[#005F80] text-white font-bold">{category || 'Science Batch'}</Badge>;
    }
  };

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(course => course.category?.toLowerCase() === activeCategory);

  return (
    <div className="bg-[#F8FAFC]">
      
      {/* Page Banner Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-cyan-100 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>Academic Programs & Entrance DLP</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Academic Courses</h1>
            <p className="text-cyan-100 text-base md:text-lg max-w-2xl mx-auto">
              Empowering students for 11th-12th Board Science, JEE, NEET, and GUJCET through targeted learning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Category Filter Tabs */}
          <div className="flex justify-center mb-12">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                <TabsTrigger value="all" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">All Programs</TabsTrigger>
                <TabsTrigger value="board" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">Board Science</TabsTrigger>
                <TabsTrigger value="jee" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">JEE Engineering</TabsTrigger>
                <TabsTrigger value="neet" className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">NEET Medical</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Skeleton Loading State */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm">
                  <div className="h-48 rounded-xl skeleton-loader w-full" />
                  <div className="h-6 skeleton-loader w-3/4 rounded" />
                  <div className="h-4 skeleton-loader w-full rounded" />
                </div>
              ))}
            </div>
          ) : (
            /* Courses Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="overflow-hidden rounded-2xl border border-slate-100 bg-white hover:shadow-card-hover transition-all duration-300 h-full group flex flex-col justify-between">
                    <div>
                      {/* Course Image Banner */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={course.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg'}
                          alt={course.name || course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00384D]/85 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4 z-10">
                          {getCategoryBadge(course.category)}
                        </div>
                        <h3 className="absolute bottom-3 left-4 right-4 text-white font-extrabold text-lg leading-snug">
                          {course.name || course.title}
                        </h3>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {course.description}
                        </p>

                        {course.features && Array.isArray(course.features) && (
                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            {course.features.slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-[#7AA13B] flex-shrink-0" />
                                <span className="truncate">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </div>

                    <CardFooter className="p-6 pt-0">
                      <Link href="/contact" className="w-full">
                        <Button className="w-full bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold text-xs h-10 rounded-xl shadow-sm">
                          Apply / Inquire Course
                          <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* DLP Program Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4F8] border border-[#0082AD]/20 rounded-full text-[#0082AD] text-xs font-bold uppercase tracking-wider mb-4">
                <BookOpen className="w-3.5 h-3.5 text-[#7AA13B]" />
                <span>Distance Learning Program</span>
              </div>

              <h2 className="text-3xl font-extrabold text-[#005F80] mb-6 leading-tight">
                Learn Anywhere with Angels School DLP
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                Designed for students unable to attend daily physical campus sessions. Our Distance Learning Program delivers comprehensive study modules, online video lectures, and test series right to your device.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  'Comprehensive Printed Modules',
                  'Recorded Video Lectures',
                  'Online CBT & OMR Test Series',
                  'Digital Doubt Resolution Desk',
                  'Weekly Analytics & Ranking',
                  'Full Academic Mobile Access',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA13B] flex-shrink-0" />
                    <span className="text-slate-700 text-xs font-bold">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <Button size="lg" className="bg-[#0082AD] hover:bg-[#005F80] text-white font-extrabold px-7 rounded-xl shadow-md">
                  Inquire for DLP Package
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg"
                  alt="Distance Learning"
                  className="w-full h-[320px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00384D]/80 via-transparent to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}