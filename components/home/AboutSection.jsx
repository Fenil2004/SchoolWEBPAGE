import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, BookOpen, Sparkles } from 'lucide-react';
import { GeneralAcademicWatermarks } from '@/components/ui/SectionWatermark';

export default function AboutSection() {
  const features = [
    'Innovative Board & Competitive pedagogy',
    'Interactive classroom sessions & Doubt Solving',
    'Video lectures & personalized student tracking',
    'State-of-the-art Science & Computer Labs',
    'Comprehensive Study Materials & Test Series',
    'Experienced & dedicated expert faculty',
  ];

  const stats = [
    { icon: Users, value: '15,000+', label: 'Successful Students' },
    { icon: Award, value: '500+', label: 'Top JEE/NEET Ranks' },
    { icon: BookOpen, value: '3+', label: 'Premier Campuses' },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <GeneralAcademicWatermarks />
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Media Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://res.cloudinary.com/dneccresv/image/upload/v1765566945/school/about/about1.jpg"
                alt="Angels School Classroom"
                className="rounded-3xl shadow-xl border-4 border-white w-full h-[300px] md:h-[450px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg';
                }}
              />

              {/* Decorative Brand Accent Frame */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border-4 border-[#7AA13B] rounded-3xl -z-10 hidden sm:block" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#0082AD] to-[#005F80] text-white rounded-2xl p-6 shadow-xl border-2 border-white"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-[#7AA13B]" />
                  <div>
                    <p className="text-3xl font-extrabold">20+ Years</p>
                    <p className="text-xs text-cyan-100 font-medium">Educational Legacy</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4F8] border border-[#0082AD]/20 rounded-full text-[#0082AD] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>About Angels School</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Shaping Future Leaders with <span className="text-[#0082AD]">Science</span> & <span className="text-[#7AA13B]">Values</span>
            </h2>

            <p className="text-slate-600 leading-relaxed mb-5">
              Angels School Career Institute is Gujarat's leading science education institute dedicated to elevating student potential in 11th-12th Science and entrance exams like JEE, NEET, and GUJCET.
            </p>

            <p className="text-slate-600 leading-relaxed mb-8">
              Through rigorous academic discipline, personalized mentorship, digital learning aids, and supportive campus environments across Gujarat, we ensure every student achieves academic distinction.
            </p>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-slate-100 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#7AA13B] flex-shrink-0" />
                  <span className="text-slate-700 text-xs sm:text-sm font-semibold">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all"
                >
                  <stat.icon className="w-7 h-7 text-[#0082AD] mx-auto mb-2" />
                  <p className="text-xl sm:text-2xl font-extrabold text-[#005F80]">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}