import React from 'react';
import dynamic from 'next/dynamic';

const StudentLogin = dynamic(
  () => import('@/components/pages-content/StudentLogin'),
  { ssr: false }
);

export default function StudentLoginPage() {
  return <StudentLogin />;
}
