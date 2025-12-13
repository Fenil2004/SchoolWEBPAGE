import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
        console.log('Fetched courses:', data); // Debug log
        setCourses(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'NEET': 'bg-red-600',
      'JEE': 'bg-[#76A440]',
      'GUJCET': 'bg-yellow-600',
      'Foundation': 'bg-[#0A94B8]',
    };
    return colors[category] || 'bg-purple-600';
  };

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(course => course.category?.toLowerCase() === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A94B8] mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Our Courses</h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Choose from our comprehensive range of courses designed to help you achieve academic excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-20 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8 md:mb-12 overflow-x-auto"
          >
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white shadow-sm flex-nowrap">
                <TabsTrigger value="all" className="px-3 md:px-6 text-sm md:text-base">All Courses</TabsTrigger>
                <TabsTrigger value="board" className="px-3 md:px-6 text-sm md:text-base">Board Exams</TabsTrigger>
                <TabsTrigger value="jee" className="px-3 md:px-6 text-sm md:text-base">JEE</TabsTrigger>
                <TabsTrigger value="neet" className="px-3 md:px-6 text-sm md:text-base">NEET</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Courses Grid */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            style={{ maxWidth: '100%', width: '100%' }}
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
                style={{ maxWidth: 'calc(100vw - 2rem)' }}
              >
                <Card
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full group"
                  style={{ maxWidth: '100%', width: '100%' }}
                >
                  {/* Image - Fixed height container with inline styles for guaranteed containment */}
                  <div
                    className="relative w-full overflow-hidden bg-gray-200"
                    style={{ height: '192px', maxHeight: '192px' }}
                  >
                    <img
                      src={course.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg'}
                      alt={course.name || course.title}
                      className="group-hover:scale-110 transition-transform duration-500"
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
                        e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(course.category)} z-10`}>
                      {course.category}
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-bold text-white">{course.name || course.title}</h3>
                      <p className="text-white/80 text-sm">₹{course.price?.toLocaleString()}</p>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{course.description}</p>

                    {/* Features - Show max 4 */}
                    <div className="space-y-2 mb-6 min-h-[6rem]">
                      {course.features && Array.isArray(course.features) && course.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pb-4 border-b">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      {course.features && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.features.length} Features
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 flex flex-col items-center gap-3 border-t w-full">
                    <span className="text-xl font-bold text-[#0A94B8] text-center">₹{course.price?.toLocaleString()}</span>
                    <Button className="w-full bg-[#76A440] hover:bg-[#8FC85C] text-white flex items-center justify-center">
                      <span>Enroll Now</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DLP Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
                Distance Learning
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#056C8C] mb-6">
                Distance Learning Program (DLP)
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Can't attend regular classes? Our Distance Learning Program brings GCI's quality education to your home.
                Get access to comprehensive study materials, video lectures, and online test series.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Comprehensive Study Material',
                  'Video Lectures by Expert Faculty',
                  'Online Test Series',
                  'Doubt Resolution Support',
                  'Performance Analysis',
                  'Mobile App Access',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#76A440]" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-[#0A94B8] hover:bg-[#76A440] text-white">
                Know More About DLP
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/course-fallback.jpg"
                alt="Distance Learning"
                className="rounded-2xl shadow-xl w-full"
                onError={(e) => {
                  e.currentTarget.src = '/images/course-fallback.jpg';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}