import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, BookOpen } from 'lucide-react';

export default function AboutSection() {
  const features = [
    'Innovative teaching methods',
    'Interactive classroom sessions',
    'Video lectures & personalized attention',
    '10 branches across Gujarat',
    'State-of-the-art facilities',
    'Experienced & dedicated faculty',
  ];

  const stats = [
    { icon: Users, value: '15000+', label: 'Students' },
    { icon: Award, value: '500+', label: 'Selections' },
    { icon: BookOpen, value: '10+', label: 'Branches' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dneccresv/image/upload/v1765566945/school/about/about1.jpg"
                alt="Students learning"
                className="rounded-2xl shadow-xl w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg';
                }}
              />

              {/* Accent decoration */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-[#0A94B8] rounded-2xl -z-10" />

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 bg-[#0A94B8] text-white rounded-xl p-6 shadow-xl"
              >
                <p className="text-4xl font-bold">25+</p>
                <p className="text-[#E8F1F4]">Years of Excellence</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
              About Us
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-[#0A94B8]">GCI</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Angels School Career Institute is a well-known science education institute in Gujarat,
              with a focus on preparing students for 11-12 science and competitive exams like JEE and NEET.
              Our mission is to provide quality education to every student and bring out the best in them.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              We achieve this through innovative teaching methods, interactive classroom sessions,
              video lectures, and personalized attention. With 10 branches across Gujarat,
              we can reach a large number of students and provide them with state-of-the-art facilities,
              including libraries, computer labs, and audio-visual aids.
            </p>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#76A440] flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 bg-[#F5F8FA] rounded-xl"
                >
                  <stat.icon className="w-8 h-8 text-[#0A94B8] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#056C8C]">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}