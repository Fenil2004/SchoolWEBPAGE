
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronDown, User, Sparkles, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/context/LanguageContext';
import AdmissionsModal from '@/components/layout/AdmissionsModal';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const hoverTimeoutRef = React.useRef(null);
  const [mobileExpanded, setMobileExpanded] = useState({
    About: true,
    Academics: true,
    Campus: true,
    Media: true,
    'અમારા વિશે': true,
    'અભ્યાસક્રમ': true,
    'કેમ્પસ': true,
    'મીડિયા': true,
  });

  const handleMouseEnter = (itemName) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileCategory = (categoryName) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const navItems = useMemo(() => [
    { name: t('home') || 'Home', href: '/' },
    {
      name: t('about') || 'About',
      href: '/about',
      hasDropdown: true,
      dropdownItems: [
        { name: t('aboutSchool') || 'About School', href: '/about' },
        { name: t('branches') || 'Branches', href: '/branches' },
        { name: t('leadership') || 'Leadership', href: '/about#leadership' },
        { name: t('careers') || 'Careers', href: '/careers' },
      ]
    },
    {
      name: t('academics') || 'Academics',
      href: '/courses',
      hasDropdown: true,
      dropdownItems: [
        { name: t('courses') || 'Courses', href: '/courses' },
        { name: t('admissions') || 'Admissions', href: '/admissions' },
        { name: t('achievements') || 'Achievements', href: '/achievements' },
      ]
    },
    {
      name: t('campus') || 'Campus',
      href: '/facilities',
      hasDropdown: true,
      dropdownItems: [
        { name: t('facilities') || 'Facilities', href: '/facilities' },
        { name: t('virtualTour') || 'Virtual Tour', href: '/virtual-tour' },
        { name: t('alumni') || 'Alumni', href: '/alumni' },
      ]
    },
    {
      name: t('media') || 'Media',
      href: '/gallery',
      hasDropdown: true,
      dropdownItems: [
        { name: t('gallery') || 'Gallery', href: '/gallery' },
        { name: t('blog') || 'Blog', href: '/blog' },
        { name: t('news') || 'News', href: '/blog' },
        { name: t('faq') || 'FAQ', href: '/faq' },
      ]
    },
    { name: t('contact') || 'Contact', href: '/contact' },
  ], [language, t]);

  return (
    <header className="w-full relative z-50">
      <AdmissionsModal isOpen={admissionsOpen} onClose={() => setAdmissionsOpen(false)} />

      {/* Top Bar - Brand Primary Teal */}
      <div className="bg-[#0082AD] text-white py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs md:text-sm font-medium">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="tel:+918401278780" className="flex items-center gap-1.5 hover:text-cyan-200 transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>+91 8401278780</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href="mailto:angelsschoolno1@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-cyan-200 transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>angelsschoolno1@gmail.com</span>
            </a>
            <span className="hidden lg:inline text-white/30">|</span>
            <span className="hidden lg:flex items-center gap-1 text-cyan-100 italic">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('motto')}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-cyan-100 hover:text-white transition-all border border-white/20"
              title="Toggle Language (English / Gujarati)"
            >
              <Globe className="w-3.5 h-3.5 text-[#7AA13B]" />
              <span>{language === 'en' ? 'ગુજરાતી' : 'English'}</span>
            </button>

            <span className="bg-[#7AA13B] text-white px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase shadow-sm">
              SINCE 2002
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/images/logo.jpg"
                  alt="Angels School Logo"
                  className="w-12 h-12 rounded-xl object-contain shadow-md border border-slate-100 transform group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-[#0082AD] tracking-tight">Angels</span>
                  <span className="text-2xl font-extrabold text-[#7AA13B] tracking-tight">School</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase -mt-1">
                  Where Dreams Turn To Realities
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                return item.hasDropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`px-3.5 py-2 font-semibold text-xs xl:text-sm flex items-center gap-1 transition-all rounded-lg ${
                        openDropdown === item.name
                          ? 'text-[#0082AD] bg-[#E6F4F8]'
                          : 'text-slate-700 hover:text-[#0082AD] hover:bg-[#E6F4F8]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#0082AD] transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </Link>

                    {/* Smooth Hover Dropdown Menu */}
                    <div
                      className={`absolute left-0 top-full pt-1.5 w-56 z-50 transition-all duration-200 ease-out origin-top-left ${
                        openDropdown === item.name
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-100 p-2 space-y-0.5">
                        {item.dropdownItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-xs xl:text-sm font-medium text-slate-700 hover:text-[#0082AD] hover:bg-[#E6F4F8] rounded-lg transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3.5 py-2 text-slate-700 hover:text-[#0082AD] font-semibold text-xs xl:text-sm transition-colors rounded-lg hover:bg-[#E6F4F8]"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                onClick={() => setAdmissionsOpen(true)}
                variant="secondary"
                size="sm"
                className="bg-[#7AA13B] hover:bg-[#8DB843] text-white shadow-sm font-bold text-xs"
              >
                {t('startAdmissions')}
              </Button>

              <Link href="/admin-login">
                <Button variant="outline" size="sm" className="border-[#0082AD] text-[#0082AD] hover:bg-[#E6F4F8] text-xs">
                  <User className="w-3.5 h-3.5 mr-1" />
                  Admin
                </Button>
              </Link>
              <Link href="/student-login">
                <Button variant="outline" size="sm" className="border-[#0082AD] text-[#0082AD] hover:bg-[#E6F4F8] text-xs">
                  <User className="w-3.5 h-3.5 mr-1" />
                  Student
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden p-2 text-slate-700 hover:text-[#0082AD] rounded-lg hover:bg-[#E6F4F8]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-4 py-5 space-y-3 max-h-[80vh] overflow-y-auto">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-slate-100/80 last:border-0 pb-1">
                  {item.hasDropdown ? (
                    <div>
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 font-bold bg-slate-50/70 hover:bg-[#E6F4F8] transition-colors">
                        <Link
                          href={item.href}
                          className="flex-1 text-sm font-bold text-[#0082AD]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => toggleMobileCategory(item.name)}
                          className="p-1 text-[#0082AD] hover:bg-slate-200/50 rounded-md transition-transform"
                          aria-label={`Toggle ${item.name} sub-menu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpanded[item.name] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile Sub-Items Accordion */}
                      {mobileExpanded[item.name] && (
                        <div className="pl-4 pr-2 py-1.5 mt-1 space-y-1 bg-white border-l-2 border-[#0082AD] rounded-r-lg">
                          {item.dropdownItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0082AD] hover:bg-[#E6F4F8] rounded-md transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-slate-800 font-bold hover:text-[#0082AD] hover:bg-[#E6F4F8] rounded-lg transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 space-y-2 border-t border-slate-100">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAdmissionsOpen(true);
                }}
                className="w-full bg-[#7AA13B] hover:bg-[#8DB843] text-white font-bold text-xs"
              >
                {t('startAdmissions')}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin-login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#0082AD] text-[#0082AD] text-xs">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/student-login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#0082AD] text-[#0082AD] text-xs">
                    Student Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}