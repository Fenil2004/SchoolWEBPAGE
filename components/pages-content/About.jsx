import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Eye, Heart, Sparkles, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import GrowthTimeline from '@/components/pages-content/GrowthTimeline';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function About() {
  const [principals, setPrincipals] = useState([]);
  const [trustees, setTrustees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      if (response.ok) {
        const data = await response.json();
        const activeMembers = Array.isArray(data) ? data.filter(m => m.isActive) : [];
        setPrincipals(activeMembers.filter(m => m.type === 'principal'));
        setTrustees(activeMembers.filter(m => m.type === 'trustee'));
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide quality science education to every student, bringing out their highest potential through innovative, concept-driven pedagogy.',
      color: 'from-[#0082AD] to-[#005F80]',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To stand as Gujarat’s premier institution for board and competitive excellence, empowering students into visionary engineers, doctors, and leaders.',
      color: 'from-[#7AA13B] to-[#5E802B]',
    },
    {
      icon: Heart,
      title: 'Core Values',
      description: 'Integrity, academic rigour, student-centric care, and continuous innovation in educational delivery.',
      color: 'from-[#0082AD] to-[#004761]',
    },
  ];

  const achievements = [
    { value: '20+', label: 'Years of Excellence' },
    { value: '15,000+', label: 'Enrolled Alumni' },
    { value: '500+', label: 'NEET & JEE Ranks' },
    { value: '3+', label: 'Gujarat Campuses' },
    { value: '100+', label: 'Expert Faculty' },
    { value: '99.8%', label: 'Success Rate' },
  ];

  const defaultPrincipals = [
    { id: '1', name: 'Girish Patel', role: 'Principal', subtitle: 'Academics & Strategy', image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566950/school/team/admin1.jpg' },
    { id: '2', name: 'Satish Patel', role: 'Principal', subtitle: 'Administration', image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566951/school/team/admin2.jpg' },
    { id: '3', name: 'Mahesh Patel', role: 'Principal', subtitle: 'Student Operations', image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566952/school/team/admin3.jpg' },
  ];

  const defaultTrustees = [
    { id: '1', name: 'Rajesh Shah', role: 'Trustee Board', image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566950/school/team/admin1.jpg' },
    { id: '2', name: 'Mina Patel', role: 'Trustee Board', image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566953/school/team/admin4.jpg' },
    { id: '3', name: 'Amit Sharma', role: 'Trustee Board', image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566951/school/team/admin2.jpg' },
    { id: '4', name: 'Priya Joshi', role: 'Trustee Board', image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566952/school/team/admin3.jpg' },
  ];

  const displayPrincipals = principals.length > 0 ? principals : defaultPrincipals;
  const displayTrustees = trustees.length > 0 ? trustees : defaultTrustees;

  return (
    <div className="bg-[#F8FAFC]">
      {/* Dynamic Page Header Banner */}
      <PageHeaderBanner
        pageSlug="about"
        defaultTitle="About Angels School"
        defaultBadge="Educational Legacy Since 2002"
        defaultSubtitle="Shaping bright futures and rank-one results through dedicated science education"
      />

      {/* Main Overview */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://res.cloudinary.com/dneccresv/image/upload/v1765566943/school/gallery/gallery1.jpg"
                alt="Angels School Campus"
                className="rounded-3xl shadow-xl border-4 border-white w-full h-[300px] md:h-[450px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                }}
              />
              <div className="absolute -bottom-5 -right-5 w-full h-full border-4 border-[#7AA13B] rounded-3xl -z-10 hidden md:block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#0082AD] text-xs font-extrabold uppercase tracking-widest block mb-2">Institutional Heritage</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Welcome to <span className="text-[#0082AD]">Angels School</span> <span className="text-[#7AA13B]">Career Institute</span>
              </h2>
              
              <p className="text-slate-600 leading-relaxed mb-5">
                Established with a vision for educational excellence, Angels School Career Institute is Gujarat's benchmark institution for 11th-12th Science and competitive exam preparation.
              </p>
              
              <p className="text-slate-600 leading-relaxed mb-8">
                Our institute combines experienced faculty mentors, digital classrooms, state-of-the-art laboratory infrastructure, and specialized doubt-solving systems across campuses in Gujarat.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Senior PhD & IITian Faculty',
                  'Digital Smart Classrooms',
                  'Curated Board & JEE/NEET Modules',
                  'CBT & OMR Mock Exam Series',
                  'Dedicated Doubt Solution Cell',
                  'Personalized Performance Tracking',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA13B] flex-shrink-0" />
                    <span className="text-slate-700 text-xs font-bold">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#005F80] mb-3">
              Pillars of Our Institution
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm">
              Core philosophies driving every academic initiative at Angels School
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full rounded-2xl border border-slate-100 bg-white hover:shadow-card-hover transition-all">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6 shadow-md`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Growth Timeline */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <GrowthTimeline />
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-16 bg-gradient-to-br from-[#005F80] to-[#00384D] text-white">

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</p>
                <p className="text-cyan-200 text-xs font-semibold">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#005F80] mb-3">Academic Leadership</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Meet our academic directors guiding student achievement
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {displayPrincipals.slice(0, 3).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-48 h-48 mx-auto overflow-hidden rounded-2xl shadow-lg border-2 border-slate-100 mb-4">
                  <img
                    src={member.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566950/school/team/admin1.jpg'}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566950/school/team/admin1.jpg';
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-[#0082AD]">{member.name}</h3>
                <p className="text-xs font-bold text-[#7AA13B] uppercase">{member.role}</p>
                {member.subtitle && (
                  <p className="text-xs text-slate-500 mt-1">{member.subtitle}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#005F80] mb-3">Board of Trustees</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Institutional guidance and governance body
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {displayTrustees.slice(0, 4).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-40 h-40 mx-auto overflow-hidden rounded-2xl shadow-md border border-slate-200 mb-3">
                  <img
                    src={member.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566950/school/team/admin1.jpg'}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566950/school/team/admin1.jpg';
                    }}
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-800">{member.name}</h3>
                <p className="text-xs text-slate-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

