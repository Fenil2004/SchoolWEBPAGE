import React from 'react';
import HeroSection from '@/Components/home/HeroSection';
import AboutSection from '@/Components/home/AboutSection';
import WorkingSystemSection from '@/Components/home/WorkingSystemSection';
import CoursesSection from '@/Components/home/CoursesSection';
import PublicationsSection from '@/Components/home/PublicationsSection';
import TestimonialsSection from '@/Components/home/TestimonialsSection';
import BranchesSection from '@/Components/home/BranchesSection';
import CTASection from '@/Components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
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
