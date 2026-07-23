import React from 'react';
import NoticeTicker from '@/components/home/NoticeTicker';
import HeroSection from '@/components/home/HeroSection';
import StatsCounterBar from '@/components/home/StatsCounterBar';
import PathFinder from '@/components/home/PathFinder';
import AboutSection from '@/components/home/AboutSection';
import WorkingSystemSection from '@/components/home/WorkingSystemSection';
import CoursesSection from '@/components/home/CoursesSection';
import VirtualTourModal from '@/components/home/VirtualTourModal';
import ToppersHallOfFame from '@/components/home/ToppersHallOfFame';
import PublicationsSection from '@/components/home/PublicationsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsBlogsSection from '@/components/home/NewsBlogsSection';
import BranchesSection from '@/components/home/BranchesSection';
import InteractiveFAQ from '@/components/ui/InteractiveFAQ';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <NoticeTicker />
      <HeroSection />
      <StatsCounterBar />
      <PathFinder />
      <AboutSection />
      <WorkingSystemSection />
      <CoursesSection />
      <VirtualTourModal />
      <ToppersHallOfFame />
      <PublicationsSection />
      <TestimonialsSection />
      <NewsBlogsSection />
      <BranchesSection />
      <InteractiveFAQ />
      <CTASection />
    </>
  );
}




