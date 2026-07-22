import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] relative overflow-hidden text-white">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0082AD]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7AA13B]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-cyan-100 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>Admissions Open for 2026-2027</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Ready to Secure Top Ranks in <span className="text-[#7AA13B]">Science & Entrance</span> Exams?
            </h2>
            
            <p className="text-cyan-100 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
              Take the first step towards an engineering or medical career with Angels School Career Institute's proven academic environment.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold px-8 py-4 text-base rounded-xl shadow-lg">
                  Apply Online Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <a href="tel:+918401278780">
                <Button size="lg" variant="outline" className="border-2 border-white bg-white/10 hover:bg-white text-white hover:text-[#005F80] font-bold px-7 py-4 text-base rounded-xl">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Admissions (+91 8401278780)
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
                <GraduationCap className="w-7 h-7 text-[#0082AD]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Direct Helpline</h3>
                <p className="text-xs text-cyan-200 font-medium">Bhavnagar & Gujarat Campuses</p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+918401278780"
                className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group border border-white/10"
              >
                <div className="w-10 h-10 bg-[#0082AD] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">+91 8401278780</p>
                  <p className="text-cyan-200 text-xs">Mon - Sat: 8:00 AM to 7:00 PM</p>
                </div>
              </a>

              <a
                href="mailto:angelsschoolno1@gmail.com"
                className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group border border-white/10"
              >
                <div className="w-10 h-10 bg-[#7AA13B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm truncate">angelsschoolno1@gmail.com</p>
                  <p className="text-cyan-200 text-xs">Official Inquiry Desk</p>
                </div>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}