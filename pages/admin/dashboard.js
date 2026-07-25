import React from 'react';
import dynamic from 'next/dynamic';
import { parse } from 'cookie';
import { verifyToken } from '@/lib/auth';

const AdminDashboard = dynamic(
  () => import('@/components/pages-content/AdminDashboard'),
  { ssr: false }
);

export default function AdminDashboardPage({ initialUser }) {
  return <AdminDashboard initialUser={initialUser} />;
}

export async function getServerSideProps(context) {
  const { req } = context;

  // Prevent caching of admin route
  context.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  context.res.setHeader('Pragma', 'no-cache');
  context.res.setHeader('Expires', '0');

  try {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const token = cookies.token;

    if (!token) {
      return {
        redirect: {
          destination: '/admin-login',
          permanent: false,
        },
      };
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return {
        redirect: {
          destination: '/admin-login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        initialUser: decoded,
      },
    };
  } catch (error) {
    console.error('getServerSideProps Auth Guard Error:', error);
    return {
      redirect: {
        destination: '/admin-login',
        permanent: false,
      },
    };
  }
}
