import React from 'react';
import Header from '@/Components/layout/Header';
import Footer from '@/Components/layout/Footer';

export default function Layout({ children, currentPageName }) {
  // Pages that don't need the standard layout
  const fullWidthPages = [];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden max-w-full w-full">
      <Header />
      <main className="flex-1 overflow-x-hidden max-w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}