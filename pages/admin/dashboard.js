import React from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(
  () => import('@/Components/pages-content/AdminDashboard'),
  { ssr: false }
);

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
