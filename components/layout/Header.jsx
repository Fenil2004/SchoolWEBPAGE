
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronDown, User, Sparkles, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const courseLinks = data
            .filter(course => course.isActive)
            .slice(0, 8)
            .map(course => ({
              name: course.name,
              href: `/courses#${course.slug}`
            }));
          setCourses(courseLinks);
        }
      })
      .catch(error => console.error('Error fetching courses:', error));

    fetch('/api/branches')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const branchLinks = data
            .filter(branch => branch.isActive)
            .map(branch => ({
              name: branch.name + (branch.isHeadquarter ? ' (HQ)' : ''),
              href: `/branches/${branch.slug}`
            }));
          setBranches(branchLinks);
        }
      })
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  const navItems = useMemo(() => [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '/courses', hasDropdown: true, dropdownItems: courses },
    { name: 'Our Branches', href: '/branches', hasDropdown: true, dropdownItems: branches },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' },
  ], [courses, branches]);

  return (
    <header className="w-full relative z-50">
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
              <span>शिक्षा से स्वस्थ मानसिकता का निर्माण</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <a href="#" className="hover:text-cyan-200 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-cyan-200 transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-cyan-200 transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-cyan-200 transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
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
                <div className="w-12 h-12 bg-gradient-to-br from-[#0082AD] to-[#005F80] rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-extrabold text-2xl tracking-tighter">A</span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#7AA13B] rounded-full border-2 border-white flex items-center justify-center">
                    <Award className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
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
                  <DropdownMenu key={`${item.name}-${item.dropdownItems?.length || 0}`}>
                    <DropdownMenuTrigger asChild>
                      <button className="px-4 py-2 text-slate-700 hover:text-[#0082AD] font-semibold text-sm flex items-center gap-1.5 transition-colors rounded-lg hover:bg-[#E6F4F8]">
                        {item.name}
                        <ChevronDown className="w-4 h-4 text-[#0082AD]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2 rounded-xl shadow-lg border border-slate-100 bg-white">
                      <DropdownMenuItem asChild className="rounded-lg font-medium text-slate-700 hover:text-[#0082AD] hover:bg-[#E6F4F8]">
                        <Link href={item.href}>View All {item.name}</Link>
                      </DropdownMenuItem>
                      <div className="h-px bg-slate-100 my-1" />
                      {item.dropdownItems && item.dropdownItems.length > 0 ? (
                        item.dropdownItems.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.name} asChild className="rounded-lg text-slate-600 hover:text-[#0082AD] hover:bg-[#E6F4F8]">
                            <Link href={dropdownItem.href}>{dropdownItem.name}</Link>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled className="text-slate-400 text-xs">
                          Loading items...
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-slate-700 hover:text-[#0082AD] font-semibold text-sm transition-colors rounded-lg hover:bg-[#E6F4F8]"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link href="/admin-login">
                <Button variant="outline" size="sm" className="border-[#0082AD] text-[#0082AD] hover:bg-[#E6F4F8]">
                  <User className="w-3.5 h-3.5 mr-1.5" />
                  Admin
                </Button>
              </Link>
              <Link href="/student-login">
                <Button variant="outline" size="sm" className="border-[#0082AD] text-[#0082AD] hover:bg-[#E6F4F8]">
                  <User className="w-3.5 h-3.5 mr-1.5" />
                  Student
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="sm" className="bg-[#7AA13B] hover:bg-[#8DB843] text-white shadow-sm font-bold">
                  11th Admission
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
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-4 py-6 space-y-3">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2.5 text-slate-700 hover:text-[#0082AD] hover:bg-[#E6F4F8] rounded-lg font-semibold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 space-y-2 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin-login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#0082AD] text-[#0082AD]">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/student-login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#0082AD] text-[#0082AD]">
                    Student Login
                  </Button>
                </Link>
              </div>
              <Link href="/contact" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full bg-[#7AA13B] hover:bg-[#8DB843] text-white font-bold">
                  11th Registration / Admission
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}