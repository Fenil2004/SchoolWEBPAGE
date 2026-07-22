import React from 'react';
import { motion } from 'framer-motion';
import { Building2, BookOpen, Users, Award, ShieldCheck, Bus, Wifi, Cpu, Coffee, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Facilities() {
  const facilityList = [
    {
      title: 'STEM Physics & Chemistry Labs',
      desc: 'High-precision experimental stations designed for practical hands-on learning and board practical examinations.',
      icon: Award,
      color: '#0082AD',
    },
    {
      title: 'Digital CBT Computer Centers',
      desc: 'High-speed internet network with online test simulation software matching actual NTA JEE & NEET test engines.',
      icon: Cpu,
      color: '#7AA13B',
    },
    {
      title: 'Comprehensive Science Library',
      desc: 'Over 15,000+ reference volumes, international journals, competitive exam question banks, and quiet study zones.',
      icon: BookOpen,
      color: '#0082AD',
    },
    {
      title: 'GPS-Tracked Campus Buses',
      desc: 'Safe, comfortable transportation covering major routes across Gujarat cities with trained female attendants.',
      icon: Bus,
      color: '#7AA13B',
    },
    {
      title: '24/7 CCTV & Medical Support',
      desc: 'Round-the-clock campus security surveillance, entry biometric checks, and first-aid medical station.',
      icon: ShieldCheck,
      color: '#0082AD',
    },
    {
      title: 'Hygienic Student Cafeteria',
      desc: 'Fresh, nutritious meals and clean drinking water facilities providing a healthy environment for students.',
      icon: Coffee,
      color: '#7AA13B',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center max-w-3xl">
          <Badge className="bg-[#0082AD] text-white font-bold mb-3 uppercase tracking-wider px-3 py-1">
            World-Class Standards
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Campus Infrastructure & Facilities
          </h1>
          <p className="text-cyan-100 text-xs md:text-sm mt-3 leading-relaxed">
            Empowering students with state-of-the-art STEM laboratories, digital testing hubs, and modern learning spaces.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityList.map((f, idx) => (
              <Card key={idx} className="rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all p-6 sm:p-8">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-white shadow-md"
                  style={{ backgroundColor: f.color }}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
