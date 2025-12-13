
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronDown, User, GraduationCap } from 'lucide-react';
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
    // Fetch courses from API
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        console.log('Courses API response:', data);
        // API returns array directly, not wrapped in object
        if (Array.isArray(data)) {
          const courseLinks = data
            .filter(course => course.isActive)
            .slice(0, 8)
            .map(course => ({
              name: course.name,
              href: `/courses#${course.slug}`
            }));
          console.log('Course links:', courseLinks);
          console.log('Setting courses state with', courseLinks.length, 'items');
          setCourses(courseLinks);
        } else {
          console.error('Invalid courses data structure:', data);
        }
      })
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch branches from API
    fetch('/api/branches')
      .then(res => res.json())
      .then(data => {
        console.log('Branches API response:', data);
        // API returns array directly, not wrapped in object
        if (Array.isArray(data)) {
          const branchLinks = data
            .filter(branch => branch.isActive)
            .map(branch => ({
              name: branch.name + (branch.isHeadquarter ? ' (HQ)' : ''),
              href: `/branches/${branch.slug}`
            }));
          console.log('Branch links:', branchLinks);
          console.log('Setting branches state with', branchLinks.length, 'items');
          setBranches(branchLinks);
        } else {
          console.error('Invalid branches data structure:', data);
        }
      })
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  // Debug log whenever courses or branches change
  useEffect(() => {
    console.log('Courses state updated:', courses.length, 'courses');
    console.log('Branches state updated:', branches.length, 'branches');
  }, [courses, branches]);

  const navItems = useMemo(() => [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses', hasDropdown: true, dropdownItems: courses },
    { name: 'Our Branches', href: '/branches', hasDropdown: true, dropdownItems: branches },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ], [courses, branches]);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#0A94B8] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+919081044496" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 90810 44496</span>
            </a>
            <span className="hidden sm:inline text-white/50">|</span>
            <a href="mailto:info@Angels School.co.in" className="hidden sm:flex items-center gap-1 hover:text-white/80 transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@Angels School.co.in</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white/80 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A94B8] to-[#056C8C] rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-[#0A94B8] leading-tight">Angels School</h1>
                <p className="text-[10px] text-gray-500 italic">Where Dreams To Be Realities</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                console.log('Rendering nav item:', item.name, 'with', item.dropdownItems?.length || 0, 'dropdown items');
                return item.hasDropdown ? (
                  <DropdownMenu key={`${item.name}-${item.dropdownItems?.length || 0}`}>
                    <DropdownMenuTrigger asChild>
                      <button className="px-4 py-2 text-[#056C8C] hover:text-[#0A94B8] font-medium flex items-center gap-1 transition-colors">
                        {item.name}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href={item.href}>View All {item.name}</Link>
                      </DropdownMenuItem>
                      {item.dropdownItems && item.dropdownItems.length > 0 ? (
                        item.dropdownItems.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.name} asChild>
                            <Link href={dropdownItem.href}>{dropdownItem.name}</Link>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled>
                          <span className="text-gray-400 text-xs">Loading...</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-[#056C8C] hover:text-[#0A94B8] font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/admin-login">
                <Button variant="outline" className="border-[#0A94B8] text-[#0A94B8] hover:bg-[#E8F1F4]">
                  <User className="w-4 h-4 mr-1" />
                  Admin Login
                </Button>
              </Link>
              <Link href="/student-login">
                <Button variant="outline" className="border-[#0A94B8] text-[#0A94B8] hover:bg-[#E8F1F4]">
                  <User className="w-4 h-4 mr-1" />
                  Student Login
                </Button>
              </Link>
              <Button className="bg-[#76A440] hover:bg-[#8FC85C] text-white">
                11th Registration
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-[#056C8C] hover:bg-[#E8F1F4] hover:text-[#0A94B8] rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t">
                <Link href="/admin-login" className="block">
                  <Button variant="outline" className="w-full border-[#0A94B8] text-[#0A94B8]">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/student-login" className="block">
                  <Button variant="outline" className="w-full border-[#0A94B8] text-[#0A94B8]">
                    Student Login
                  </Button>
                </Link>
                <Button className="w-full bg-[#76A440] hover:bg-[#8FC85C] text-white">
                  11th Registration
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}