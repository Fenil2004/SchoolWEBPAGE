import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronUp, ArrowRight, Award, Sparkles, Shield, User } from 'lucide-react';
import FooterCTAStrip from '@/components/layout/FooterCTAStrip';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('courses'), href: '/courses' },
    { name: t('branches'), href: '/branches' },
    { name: t('admissions'), href: '/admissions' },
    { name: t('achievements'), href: '/achievements' },
    { name: t('alumni'), href: '/alumni' },
    { name: t('careers'), href: '/careers' },
    { name: t('blog'), href: '/blog' },
    { name: t('faq'), href: '/faq' },
    { name: t('virtualTour'), href: '/virtual-tour' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' },
  ];

  const courses = [
    { name: '11th Science (PCM/PCB)', href: '/courses#11th-science' },
    { name: '12th Science (NEET/JEE)', href: '/courses#12th-science' },
    { name: 'JEE Preparation', href: '/courses#jee-preparation' },
    { name: 'NEET Preparation', href: '/courses#neet-preparation' },
    { name: 'Commerce Stream', href: '/courses#commerce' },
  ];

  const branches = [
    { name: 'Deesa Head Office', href: '/branches/deesa' },
  ];

  return (
    <footer className="bg-[#004761] text-slate-200 relative overflow-hidden border-t-4 border-[#7AA13B]">
      {/* Top CTA Strip */}
      <FooterCTAStrip />

      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#0082AD]/10 rounded-full blur-3xl pointer-events-none" />


      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/logo.jpg"
                alt="Angels School Logo"
                className="w-11 h-11 rounded-xl object-contain bg-white p-0.5 shadow-md"
              />
              <div>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-xl font-extrabold text-white">Angels</h3>
                  <span className="text-xl font-extrabold text-[#7AA13B]">School</span>
                </div>
                <p className="text-[11px] text-cyan-200 font-medium">Career Institute | Since 2002</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Angels School Career Institute is a premier science education institution in Gujarat, dedicated to shaping brilliant futures through 11th-12th Science, JEE, NEET, and competitive excellence.
            </p>

            <div className="flex items-center gap-2.5">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#7AA13B] rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#7AA13B] rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#7AA13B] rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#7AA13B] rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-5 relative inline-block">
              Quick Links
              <span className="block h-0.5 w-10 bg-[#7AA13B] mt-1.5 rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-cyan-100 hover:text-[#7AA13B] transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#7AA13B] transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Programs */}
          <div>
            <h4 className="text-base font-bold text-white mb-5 relative inline-block">
              Our Academic Programs
              <span className="block h-0.5 w-10 bg-[#7AA13B] mt-1.5 rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="group flex items-center gap-2 text-cyan-100 hover:text-[#7AA13B] transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#7AA13B] transform group-hover:translate-x-1 transition-transform" />
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base font-bold text-white mb-5 relative inline-block">
              Contact & Branches
              <span className="block h-0.5 w-10 bg-[#7AA13B] mt-1.5 rounded-full" />
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7AA13B] mt-1 flex-shrink-0" />
                <span className="text-cyan-100 leading-snug">
                  Angels School Vidyapith Campus, Bhavnagar, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#7AA13B] flex-shrink-0" />
                <a href="tel:+918401278780" className="text-cyan-100 hover:text-white transition-colors">
                  +91 8401278780
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#7AA13B] flex-shrink-0" />
                <a href="mailto:angelsschoolno1@gmail.com" className="text-cyan-100 hover:text-white transition-colors">
                  angelsschoolno1@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-white mb-2">Our Campus Network:</p>
              <div className="flex flex-wrap gap-2">
                {branches.map(b => (
                  <Link key={b.name} href={b.href} className="text-[11px] bg-white/10 hover:bg-[#7AA13B] text-cyan-100 hover:text-white px-2.5 py-1 rounded transition-colors">
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright & Scroll To Top */}
      <div className="border-t border-white/10 bg-[#00384D] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cyan-200">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Angels School Career Institute. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin-login" className="hover:text-white transition-colors flex items-center gap-1 text-cyan-200 hover:text-white font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#7AA13B]" />
              Admin
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-[#7AA13B] hover:bg-[#8DB843] text-white rounded-lg flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
              title="Back to Top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}