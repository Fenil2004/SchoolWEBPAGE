'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';

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
      <section className="relative py-20 bg-gradient-to-br from-[#0A94B8] to-[#056C8C] overflow-hidden">
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
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Our Courses</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive range of courses designed to help you achieve academic excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white shadow-sm">
                <TabsTrigger value="all" className="px-6">All Courses</TabsTrigger>
                <TabsTrigger value="board" className="px-6">Board Exams</TabsTrigger>
                <TabsTrigger value="jee" className="px-6">JEE</TabsTrigger>
                <TabsTrigger value="neet" className="px-6">NEET</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full group">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={course.image || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop&q=80'}
                      alt={course.name || course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(course.category)}`}>
                      {course.category}
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{course.name || course.title}</h3>
                      <p className="text-white/80 text-sm">₹{course.price?.toLocaleString()}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {course.features && Array.isArray(course.features) && course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
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

                  <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
                    <span className="text-xl font-bold text-[#0A94B8]">₹{course.price?.toLocaleString()}</span>
                    <Button className="bg-[#76A440] hover:bg-[#8FC85C] text-white">
                      Enroll Now
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
                src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=80"
                alt="Distance Learning"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}