import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, BookOpen } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses', {
        cache: 'no-store', // Disable caching
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched courses:', data); // Debug log
        setCourses(Array.isArray(data) ? data.slice(0, 4) : []); // Show first 4 courses
      } else {
        console.error('Failed to fetch courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#F5F8FA]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </section>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      'NEET': 'bg-red-600',
      'JEE': 'bg-green-600',
      'GUJCET': 'bg-yellow-600',
      'Foundation': 'bg-blue-600',
    };
    return colors[category] || 'bg-purple-600';
  };

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
            Our Courses
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#056C8C] mb-4">
            Courses + DLP
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of courses designed to help you excel in board exams and crack competitive entrances
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ maxWidth: '100%', width: '100%' }}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ maxWidth: 'calc(100vw - 2rem)' }}
            >
              <Card
                className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group border border-[#D9EEF4]"
                style={{ maxWidth: '100%', width: '100%' }}
              >
                {/* Image - Fixed height container with inline styles */}
                <div
                  className="relative w-full overflow-hidden bg-gray-200"
                  style={{ height: '160px', maxHeight: '160px' }}
                >
                  <img
                    src={course.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566933/school/courses/course1.jpg'}
                    alt={course.name}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(course.category)} z-10`}>
                    {course.category}
                  </Badge>
                </div>

                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#056C8C] mb-1 truncate">{course.name}</h3>
                  <p className="text-sm text-[#0A94B8] font-medium mb-3">₹{course.price?.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">{course.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    {course.features && course.features.length > 0 && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.features.length} Features
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 pt-0">
                  <Button variant="outline" className="w-full group-hover:bg-[#0A94B8] group-hover:text-white group-hover:border-[#0A94B8] transition-colors border-[#D9EEF4]">
                    Course Detail
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
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
          <Link href={createPageUrl('Courses')}>
            <Button size="lg" className="bg-[#0A94B8] hover:bg-[#76A440] transition-colors">
              View All Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}