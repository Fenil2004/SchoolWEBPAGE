import React from 'react';
import Head from 'next/head';
import InteractiveFAQ from '@/components/ui/InteractiveFAQ';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions (FAQ) | Angels School</title>
        <meta name="description" content="Find answers to common questions regarding admissions, Bhulka kindergarten, Science NEET/JEE, Commerce stream, and campus transport." />
      </Head>

      <div className="bg-[#F8FAFC]">
        {/* Dynamic Page Header Banner */}
        <PageHeaderBanner
          pageSlug="faq"
          defaultTitle="Frequently Asked Questions"
          defaultBadge="Help & Knowledge Base"
          defaultSubtitle="Comprehensive answers to common questions regarding admissions, curriculum, and transport"
        />

        <InteractiveFAQ />
      </div>
    </>
  );
}

