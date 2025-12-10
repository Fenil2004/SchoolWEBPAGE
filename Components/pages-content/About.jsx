import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, BookOpen, Target, Eye, Heart, GraduationCap, Building2, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To provide quality education to every student and bring out the best in them through innovative teaching methods.',
      color: 'from-[#0A94B8] to-[#056C8C]',
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'To be the leading educational institution that transforms students into successful professionals and responsible citizens.',
      color: 'from-[#76A440] to-[#8FC85C]',
    },
    {
      icon: Heart,
      title: 'Values',
      description: 'Integrity, Excellence, Innovation, and Student-Centric approach in everything we do.',
      color: 'from-[#0A94B8] to-[#056C8C]',
    },
  ];

  const achievements = [
    { value: '25+', label: 'Years of Excellence' },
    { value: '15000+', label: 'Students Enrolled' },
    { value: '500+', label: 'NEET/JEE Selections' },
    { value: '10+', label: 'Branches in Gujarat' },
    { value: '100+', label: 'Expert Faculty' },
    { value: '95%', label: 'Success Rate' },
  ];

  const team = [
    {
      name: 'Girish Patel',
      role: 'Founder & Chairman',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Satish Patel',
      role: 'Academic Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mahesh Patel',
      role: 'Head of Physics',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mina Patel',
      role: 'Head of Chemistry',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
    },
  ];

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
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">About Us</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Building a great nation through holistic development of the students since 1998
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80"
                alt="GCI Campus"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-[#0A94B8] rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#056C8C] mb-6">
                Welcome to <span className="text-[#0A94B8]">Angels School Career Institute</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Angels School Career Institute is a well-known science education institute in Gujarat, 
                with a focus on preparing students for 11-12 science and competitive exams like JEE and NEET. 
                Founded in 1998, we have grown to become one of the most trusted names in education.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to provide quality education to every student and bring out the best in them. 
                We achieve this through innovative teaching methods, interactive classroom sessions, 
                video lectures, and personalized attention.
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Experienced Faculty',
                  'Modern Infrastructure',
                  'Comprehensive Study Material',
                  'Regular Mock Tests',
                  'Doubt Clearing Sessions',
                  'Career Counseling',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#76A440]" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6`}>
                      <value.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-[#0A94B8] to-[#056C8C]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Numbers that speak for our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
              >
                <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{item.value}</p>
                <p className="text-white/80 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#056C8C] mb-4">
              Leadership Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who drive our mission forward
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6 inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-[#D9EEF4] group-hover:border-[#0A94B8] transition-colors"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#0A94B8]/0 group-hover:bg-[#0A94B8]/20 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#056C8C]">{member.name}</h3>
                <p className="text-[#0A94B8]">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}