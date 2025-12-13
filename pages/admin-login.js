import React from 'react';
import dynamic from 'next/dynamic';

const AdminLogin = dynamic(
  () => import('@/components/pages-content/AdminLogin'),
  { ssr: false }
);

export default function AdminLoginPage() {
  return <AdminLogin />;
}
