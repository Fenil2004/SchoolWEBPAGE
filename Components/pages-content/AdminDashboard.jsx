'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  MessageSquare, 
  BookOpen, 
  MapPin, 
  Settings, 
  LogOut,
  Users,
  FileText,
  Video
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

// Import admin components
import HeroManagement from '@/Components/admin/HeroManagement';
import GalleryManagement from '@/Components/admin/GalleryManagement';
import TestimonialManagement from '@/Components/admin/TestimonialManagement';
import CourseManagement from '@/Components/admin/CourseManagement';
import BranchManagement from '@/Components/admin/BranchManagement';
import SettingsManagement from '@/Components/admin/SettingsManagement';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    galleryImages: 0,
    testimonials: 0,
    branches: 0
  });
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        credentials: 'include' // Include HttpOnly cookie
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const checkAuth = async () => {
    try {
      // Verify authentication with server using HttpOnly cookie
      const response = await fetch('/api/auth/me', {
        credentials: 'include' // Include HttpOnly cookie
      });
      
      if (!response.ok) {
        alert('Access denied. Please login first.');
        router.push('/admin-login');
        return;
      }
      
      const data = await response.json();
      
      if (!data.success || !data.user) {
        alert('Access denied. Please login first.');
        router.push('/admin-login');
        return;
      }
      
      // Verify user is admin
      if (data.user.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        router.push('/admin-login');
        return;
      }
      
      setUser(data.user);
      // Optionally store user info in localStorage for UI display (not for auth)
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin-login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout API to clear HttpOnly cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user data from localStorage
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.full_name}</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:underline text-sm">
                View Website
              </a>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2">
              <Video className="w-4 h-4" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="branches" className="gap-2">
              <MapPin className="w-4 h-4" />
              Branches
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.courses}</div>
                  <p className="text-xs text-gray-500">Active courses</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Gallery Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.galleryImages}</div>
                  <p className="text-xs text-gray-500">Images uploaded</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Testimonials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.testimonials}</div>
                  <p className="text-xs text-gray-500">Student reviews</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Branches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.branches}</div>
                  <p className="text-xs text-gray-500">Across Gujarat</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    className="h-24 flex flex-col gap-2" 
                    variant="outline"
                    onClick={() => setActiveTab('gallery')}
                  >
                    <ImageIcon className="w-6 h-6" />
                    <span>Add Gallery Image</span>
                  </Button>
                  <Button 
                    className="h-24 flex flex-col gap-2" 
                    variant="outline"
                    onClick={() => setActiveTab('courses')}
                  >
                    <BookOpen className="w-6 h-6" />
                    <span>Add New Course</span>
                  </Button>
                  <Button 
                    className="h-24 flex flex-col gap-2" 
                    variant="outline"
                    onClick={() => setActiveTab('testimonials')}
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span>Add Testimonial</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Section Tab */}
          <TabsContent value="hero">
            <HeroManagement />
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <CourseManagement />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <TestimonialManagement />
          </TabsContent>

          {/* Branches Tab */}
          <TabsContent value="branches">
            <BranchManagement />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
