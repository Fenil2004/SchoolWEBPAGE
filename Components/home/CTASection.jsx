import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight, GraduationCap } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#056C8C] via-[#044E64] to-[#044E64] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0A94B8] rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#76A440] rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey to Success?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of successful students who achieved their dreams with Angels School Career Institute. 
              Admissions are now open for 11th Science batch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#76A440] text-white hover:bg-[#8FC85C]">
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </div>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-[#0A94B8]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Contact Us</h3>
                <p className="text-blue-200">We're here to help</p>
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href="tel:+919081044496" 
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#0A94B8] rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">+91 90810 44496</p>
                  <p className="text-blue-200 text-sm">Call us anytime</p>
                </div>
              </a>

              <a 
                href="mailto:info@Angels School.co.in" 
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#0A94B8] rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">info@Angels School.co.in</p>
                  <p className="text-blue-200 text-sm">Email us for inquiries</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}