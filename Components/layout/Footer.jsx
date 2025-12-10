import React from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, GraduationCap, ArrowRight } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: 'Home' },
    { name: 'About Us', href: 'About' },
    { name: 'Courses', href: 'Courses' },
    { name: 'Our Branches', href: 'Branches' },
    { name: 'Gallery', href: 'Gallery' },
    { name: 'Contact Us', href: 'Contact' },
  ];

  const courses = [
    '11th Science',
    '12th Science',
    'JEE Preparation',
    'NEET Preparation',
    'GUJCET Preparation',
  ];

  return (
    <footer className="bg-[#044E64] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A94B8] to-[#056C8C] rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Angels School</h3>
                <p className="text-xs text-gray-500 italic">Career Institute</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Angels School Career Institute is a well-known science education institute in Gujarat, 
              with a focus on preparing students for 11-12 science and competitive exams like JEE and NEET.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-full flex items-center justify-center hover:bg-[#76A440] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-full flex items-center justify-center hover:bg-[#76A440] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-full flex items-center justify-center hover:bg-[#76A440] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-full flex items-center justify-center hover:bg-[#76A440] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#76A440] -mb-2"></span>
            </h4>
            <ul className="space-y-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={createPageUrl(link.href)}
                    className="flex items-center gap-2 text-[#A9DCE8] hover:text-[#76A440] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Our Courses
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#76A440] -mb-2"></span>
            </h4>
            <ul className="space-y-3 mt-4">
              {courses.map((course) => (
                <li key={course}>
                  <Link 
                    href={createPageUrl('Courses')}
                    className="flex items-center gap-2 text-[#A9DCE8] hover:text-[#76A440] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#76A440] -mb-2"></span>
            </h4>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#76A440] mt-1 flex-shrink-0" />
                <span className="text-[#A9DCE8]">
                  Angels School Vidyapith Campus, Bhavnagar, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#76A440] flex-shrink-0" />
                <a href="tel:+919081044496" className="text-[#A9DCE8] hover:text-[#76A440] transition-colors">
                  +91 90810 44496
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#76A440] flex-shrink-0" />
                <a href="mailto:info@Angels School.co.in" className="text-[#A9DCE8] hover:text-[#76A440] transition-colors">
                  info@Angels School.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Angels School Career Institute. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-[#76A440] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-[#76A440] transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}