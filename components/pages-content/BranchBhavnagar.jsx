import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Building2, Users, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BranchSidebar from '@/components/branches/BranchSidebar';
import Link from 'next/link';

export default function BranchBhavnagar() {
  const branchInfo = {
    name: 'Bhavnagar Campus',
    type: 'Regional Branch',
    address: 'Angels School Vidyapith Campus, Ghogha Circle, Bhavnagar - 364001',
    phone: '+91 8401278780',
    email: 'bhavnagar@angelsschool.co.in',
    timing: '7:00 AM - 7:00 PM',
    established: '2004',
    students: '4,000+',
    faculty: '40+',
  };

  const facilities = [
    { name: 'Air-Conditioned Classrooms', icon: Building2 },
    { name: 'Digital Science Library', icon: BookOpen },
    { name: 'Physics Laboratory', icon: Award },
    { name: 'Chemistry Laboratory', icon: Award },
    { name: 'Biology Laboratory', icon: Award },
    { name: 'Computer & CBT Test Lab', icon: Users },
    { name: 'Hostel Facilities', icon: Building2 },
    { name: 'Student Cafeteria', icon: Building2 },
  ];

  const achievements = [
    'Established regional science centre in 2004',
    '350+ Rankers in NEET & GUJCET',
    'High-tech smart classroom infrastructure',
    'Full doubt cell & library access',
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Link href="/branches" className="hover:text-white">Campuses</Link>
            <span>/</span>
            <span className="text-white">Bhavnagar</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{branchInfo.name}</h1>
              <Badge className="bg-[#7AA13B] text-white font-bold">Regional Campus</Badge>
            </div>
            <p className="text-cyan-100 text-sm font-medium">Established {branchInfo.established} • {branchInfo.students} Active Students</p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <BranchSidebar currentBranch="BranchBhavnagar" />
            </div>

            <div className="lg:col-span-3 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl overflow-hidden shadow-card border-4 border-white">
                <img
                  src="https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg"
                  alt="Bhavnagar Campus"
                  className="w-full h-56 md:h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                  }}
                />
              </motion.div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 text-center">
                  <Users className="w-8 h-8 text-[#0082AD] mx-auto mb-2" />
                  <p className="text-2xl font-extrabold text-slate-900">{branchInfo.students}</p>
                  <p className="text-slate-500 text-xs font-bold">Students</p>
                </Card>
                <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 text-center">
                  <Award className="w-8 h-8 text-[#7AA13B] mx-auto mb-2" />
                  <p className="text-2xl font-extrabold text-slate-900">{branchInfo.faculty}</p>
                  <p className="text-slate-500 text-xs font-bold">Faculty Members</p>
                </Card>
                <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 text-center">
                  <BookOpen className="w-8 h-8 text-[#0082AD] mx-auto mb-2" />
                  <p className="text-2xl font-extrabold text-slate-900">20+</p>
                  <p className="text-slate-500 text-xs font-bold">Years Heritage</p>
                </Card>
              </div>

              <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8">
                <CardContent className="p-0 space-y-6">
                  <h2 className="text-2xl font-bold text-[#005F80]">About Bhavnagar Campus</h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Located near Ghogha Circle in Bhavnagar, our regional campus offers a serene and dedicated environment for 11th-12th Science and entrance prep.
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Key Highlights</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {achievements.map((achievement) => (
                        <div key={achievement} className="flex items-start gap-2 text-xs font-bold text-slate-700 p-2 bg-[#F8FAFC] rounded-xl border border-slate-100">
                          <Award className="w-4 h-4 text-[#7AA13B] mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8">
                <CardContent className="p-0 space-y-6">
                  <h2 className="text-xl font-bold text-[#005F80]">Contact Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-600">
                    <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                      <MapPin className="w-5 h-5 text-[#0082AD] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800 mb-0.5">Address</p>
                        <p className="leading-relaxed">{branchInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                      <Phone className="w-5 h-5 text-[#7AA13B] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800 mb-0.5">Helpline</p>
                        <a href={`tel:${branchInfo.phone}`} className="font-extrabold text-[#0082AD]">{branchInfo.phone}</a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}