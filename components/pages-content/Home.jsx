import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import PathFinder from '@/components/home/PathFinder';
import AboutSection from '@/components/home/AboutSection';
import WorkingSystemSection from '@/components/home/WorkingSystemSection';
import CoursesSection from '@/components/home/CoursesSection';
import PublicationsSection from '@/components/home/PublicationsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BranchesSection from '@/components/home/BranchesSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PathFinder />
      <AboutSection />
      <WorkingSystemSection />
      <CoursesSection />
      <PublicationsSection />
      <TestimonialsSection />
      <BranchesSection />
      <CTASection />
    </>
  );
}

