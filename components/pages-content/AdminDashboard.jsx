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
  Video,
  Shield,
  ExternalLink
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import HeroManagement from '@/components/admin/HeroManagement';
import GalleryManagement from '@/components/admin/GalleryManagement';
import AlumniStoriesManagement from '@/components/admin/AlumniStoriesManagement';
import CourseManagement from '@/components/admin/CourseManagement';
import BranchManagement from '@/components/admin/BranchManagement';
import SettingsManagement from '@/components/admin/SettingsManagement';
import TeamManagement from '@/components/admin/TeamManagement';
import BannerManagement from '@/components/admin/BannerManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import EventManagement from '@/components/admin/EventManagement';
import NoticeManagement from '@/components/admin/NoticeManagement';
import AchieversManagement from '@/components/admin/AchieversManagement';
import WhitelistManagement from '@/components/admin/WhitelistManagement';
import { Trophy, Bell, Award, GraduationCap, ShieldCheck } from 'lucide-react';


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
        credentials: 'include'
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
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
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

      if (data.user.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        router.push('/admin-login');
        return;
      }

      setUser(data.user);
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
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0082AD] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-xs font-bold">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-[#005F80] via-[#0082AD] to-[#004761] border-b border-cyan-900 sticky top-0 z-50 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#7AA13B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-extrabold text-white">Angels School</h1>
                  <span className="bg-[#7AA13B] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">Admin Portal</span>
                </div>
                <p className="text-xs text-cyan-200">Welcome, {user?.full_name || 'Administrator'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-rose-500/20 hover:text-rose-200 text-xs font-bold gap-1.5 h-9 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="overview" className="space-y-6">
          
          {/* Dashboard Tab Bar */}
          <TabsList className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap justify-start gap-1 h-auto">
            <TabsTrigger value="overview" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <Video className="w-4 h-4" />
              Hero Banners
            </TabsTrigger>
            <TabsTrigger value="notices" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <Bell className="w-4 h-4 text-amber-300 animate-pulse" />
              Notice Ticker
            </TabsTrigger>

            <TabsTrigger value="banners" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <ImageIcon className="w-4 h-4" />
              Page Headers
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="blogs" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <BookOpen className="w-4 h-4" />
              News & Blogs
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <Trophy className="w-4 h-4" />
              Events & Awards
            </TabsTrigger>
            <TabsTrigger value="achievers" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <Award className="w-4 h-4 text-amber-500" />
              Hall of Fame
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <ImageIcon className="w-4 h-4" />
              Gallery
            </TabsTrigger>

            <TabsTrigger value="alumni-stories" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <GraduationCap className="w-4 h-4 text-[#7AA13B]" />
              Alumni Stories
            </TabsTrigger>
            <TabsTrigger value="branches" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <MapPin className="w-4 h-4" />
              Branches
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <Users className="w-4 h-4" />
              Leadership Team
            </TabsTrigger>
            <TabsTrigger value="whitelist" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <ShieldCheck className="w-4 h-4 text-[#7AA13B]" />
              Email Whitelist
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 px-4 py-2 rounded-xl text-xs font-bold data-[state=active]:bg-[#0082AD] data-[state=active]:text-white">
              <Settings className="w-4 h-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Active Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-[#0082AD]">{stats.courses}</div>
                  <p className="text-xs text-slate-500 mt-1">Managed Academic Batches</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Gallery Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-[#7AA13B]">{stats.galleryImages}</div>
                  <p className="text-xs text-slate-500 mt-1">Uploaded Media Items</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Alumni Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-[#0082AD]">{stats.testimonials || 3}</div>
                  <p className="text-xs text-slate-500 mt-1">Published Success Stories</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Campus Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-[#7AA13B]">{stats.branches}</div>
                  <p className="text-xs text-slate-500 mt-1">Active Gujarat Campuses</p>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-extrabold text-[#005F80]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button
                    className="h-24 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-[#E6F4F8] hover:border-[#0082AD] text-slate-700 hover:text-[#0082AD] transition-all flex flex-col gap-2"
                    variant="outline"
                    onClick={() => setActiveTab('gallery')}
                  >
                    <ImageIcon className="w-6 h-6 text-[#0082AD]" />
                    <span className="font-bold text-xs">Add Gallery Image</span>
                  </Button>
                  <Button
                    className="h-24 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-[#F2F7E9] hover:border-[#7AA13B] text-slate-700 hover:text-[#7AA13B] transition-all flex flex-col gap-2"
                    variant="outline"
                    onClick={() => setActiveTab('courses')}
                  >
                    <BookOpen className="w-6 h-6 text-[#7AA13B]" />
                    <span className="font-bold text-xs">Add New Course</span>
                  </Button>
                  <Button
                    className="h-24 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-[#E6F4F8] hover:border-[#0082AD] text-slate-700 hover:text-[#0082AD] transition-all flex flex-col gap-2"
                    variant="outline"
                    onClick={() => setActiveTab('alumni-stories')}
                  >
                    <GraduationCap className="w-6 h-6 text-[#0082AD]" />
                    <span className="font-bold text-xs">Add Alumni Story</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subcomponents Management Tabs */}
          <TabsContent value="hero">
            <HeroManagement />
          </TabsContent>

          <TabsContent value="notices">
            <NoticeManagement />
          </TabsContent>


          <TabsContent value="banners">
            <BannerManagement />
          </TabsContent>

          <TabsContent value="courses">
            <CourseManagement />
          </TabsContent>

          <TabsContent value="blogs">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="events">
            <EventManagement />
          </TabsContent>

          <TabsContent value="achievers">
            <AchieversManagement />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>


          <TabsContent value="alumni-stories">
            <AlumniStoriesManagement />
          </TabsContent>

          <TabsContent value="branches">
            <BranchManagement />
          </TabsContent>

          <TabsContent value="team">
            <TeamManagement />
          </TabsContent>

          <TabsContent value="whitelist">
            <WhitelistManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

