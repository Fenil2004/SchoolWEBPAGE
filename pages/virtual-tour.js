import React from 'react';
import Head from 'next/head';
import VirtualTourModal from '@/components/home/VirtualTourModal';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function VirtualTourPage() {
  return (
    <>
      <Head>
        <title>360° Virtual Campus Tour | Angels School</title>
        <meta name="description" content="Take a 360 degree virtual tour of Angels School campus branches, STEM laboratories, Bhulka kindergarten play zones, and sports facilities." />
      </Head>

      <div className="bg-[#F8FAFC]">
        {/* Dynamic Page Header Banner */}
        <PageHeaderBanner
          pageSlug="virtual-tour"
          defaultTitle="360° Virtual Campus Tour"
          defaultBadge="Interactive Campus Walkthrough"
          defaultSubtitle="Explore our state-of-the-art campus, STEM labs, classrooms, and sports arenas"
        />

        <VirtualTourModal />
      </div>
    </>
  );
}

