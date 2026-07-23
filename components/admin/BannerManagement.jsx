import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image as ImageIcon, Save, Sparkles, Upload, Link as LinkIcon, Trash2, ChevronDown, ChevronUp, CheckCircle2, LayoutGrid } from 'lucide-react';

export default function BannerManagement() {
  const [banners, setBanners] = useState({});
  const [expandedSlug, setExpandedSlug] = useState('about'); // Which card is expanded
  const [editingBanner, setEditingBanner] = useState({
    pageSlug: 'about',
    pageName: 'About Us Page',
    badge: '',
    title: '',
    subtitle: '',
    bgImage: '',
  });
  const [imageSource, setImageSource] = useState('upload'); // 'upload' or 'url'
  const [isSaving, setIsSaving] = useState(false);

  const pages = [
    { slug: 'about', name: 'About Us Page', defaultBadge: 'Educational Legacy Since 2002', defaultTitle: 'About Angels School', defaultSubtitle: 'Shaping bright futures and rank-one results through dedicated science education' },
    { slug: 'courses', name: 'Courses Page', defaultBadge: 'Academic Excellence', defaultTitle: 'Academic Programs & Streams', defaultSubtitle: 'From Bhulka Kindergarten to Higher Secondary Science (NEET & JEE) and Commerce' },
    { slug: 'branches', name: 'Campuses Page', defaultBadge: 'State-of-the-Art Infrastructure', defaultTitle: 'Our Campus Branches', defaultSubtitle: 'Discover campus locations, science laboratories, and facilities across Gujarat' },
    { slug: 'facilities', name: 'Facilities Page', defaultBadge: 'Modern Educational Tech', defaultTitle: 'Campus Infrastructure & STEM Labs', defaultSubtitle: 'Advanced Physics, Chemistry, Biology STEM labs, smart classrooms & sports grounds' },
    { slug: 'admissions', name: 'Admissions Page', defaultBadge: 'Admissions Open 2026-27', defaultTitle: 'Join Angels School Family', defaultSubtitle: 'Simple 4-step admission process for Bhulka Kindergarten, Secondary & Higher Secondary' },
    { slug: 'gallery', name: 'Gallery Page', defaultBadge: 'Campus Life Memories', defaultTitle: 'Angels School Photo Gallery', defaultSubtitle: 'Glimpses of academic labs, annual events, sports meets & student celebrations' },
    { slug: 'contact', name: 'Contact Page', defaultBadge: 'Direct Student Assistance Desk', defaultTitle: 'Contact Admission Office', defaultSubtitle: 'We are available to resolve your course inquiries, admission guidance, and campus visit bookings' },
    { slug: 'achievements', name: 'Achievements Page', defaultBadge: 'Hall of Excellence', defaultTitle: 'Achievements & Board Toppers', defaultSubtitle: 'Celebrating our stellar Class 10 & 12 Board examination toppers and Science NEET/JEE top rankers' },
    { slug: 'alumni', name: 'Alumni Network Page', defaultBadge: 'Global Network', defaultTitle: 'Our Alumni — Making Us Proud', defaultSubtitle: 'Over 15,000+ Angels School graduates leading innovations in medicine, technology, and finance' },
    { slug: 'careers', name: 'Careers Page', defaultBadge: 'Join Our Educator Team', defaultTitle: 'Careers at Angels School', defaultSubtitle: 'Shape young minds alongside Gujarat’s leading educators at Angels School & Bhulka' },
    { slug: 'blog', name: 'Blog & News Page', defaultBadge: 'Educational Articles & Insights', defaultTitle: 'Angels School Blog & News', defaultSubtitle: 'Guidance articles, study strategies, and early childhood insights from our educators' },
    { slug: 'faq', name: 'FAQ Page', defaultBadge: 'Help & Knowledge Base', defaultTitle: 'Frequently Asked Questions', defaultSubtitle: 'Comprehensive answers to common questions regarding admissions, curriculum, and transport' },
    { slug: 'virtual-tour', name: 'Virtual Tour Page', defaultBadge: 'Interactive Campus Walkthrough', defaultTitle: '360° Virtual Campus Tour', defaultSubtitle: 'Explore our state-of-the-art campus, STEM labs, classrooms, and sports arenas' },
  ];

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners');
      if (response.ok) {
        const data = await response.json();
        const map = {};
        data.forEach((b) => {
          map[b.pageSlug] = b;
        });
        setBanners(map);
        
        // Initialize active expanded banner
        if (map[expandedSlug]) {
          setEditingBanner(map[expandedSlug]);
        }
      }
    } catch (error) {
      console.error('Error fetching page banners:', error);
    }
  };

  const handleToggleExpand = (pageObj) => {
    if (expandedSlug === pageObj.slug) {
      setExpandedSlug(null);
    } else {
      setExpandedSlug(pageObj.slug);
      const existing = banners[pageObj.slug];
      if (existing) {
        setEditingBanner(existing);
      } else {
        setEditingBanner({
          pageSlug: pageObj.slug,
          pageName: pageObj.name,
          badge: pageObj.defaultBadge,
          title: pageObj.defaultTitle,
          subtitle: pageObj.defaultSubtitle,
          bgImage: null,
        });
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setEditingBanner((prev) => ({
          ...prev,
          bgImage: compressedDataUrl,
        }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setEditingBanner((prev) => ({
      ...prev,
      bgImage: null,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editingBanner),
      });

      const data = await response.json();
      if (data.success || data.banner) {
        alert(`Header Banner for ${editingBanner.pageName} saved successfully!`);
        
        // Instantly update local state map so card reflects changes immediately
        setBanners((prev) => ({
          ...prev,
          [editingBanner.pageSlug]: editingBanner,
        }));

        fetchBanners();
      } else {
        alert(data.message || 'Failed to save banner');
      }
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Error saving banner');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 text-[#0082AD] font-bold text-xs uppercase tracking-wider bg-[#E6F4F8] px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#7AA13B]" />
            <span>Dynamic Page Headers</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">All Page Header Cards</h2>
          <p className="text-xs text-slate-500">
            Click on any page card below to expand and edit its top badge, title, subtitle, and custom local background image. Saved changes update live!
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs font-bold text-slate-700">
          <LayoutGrid className="w-4 h-4 text-[#0082AD]" />
          <span>{pages.length} Pages Available</span>
        </div>
      </div>

      {/* Grid of Premade Page Cards */}
      <div className="space-y-4">
        {pages.map((p) => {
          const savedData = banners[p.slug] || {};
          const displayBadge = savedData.badge || p.defaultBadge;
          const displayTitle = savedData.title || p.defaultTitle;
          const displaySubtitle = savedData.subtitle || p.defaultSubtitle;
          const displayBgImage = savedData.bgImage || null;
          const isExpanded = expandedSlug === p.slug;

          return (
            <Card
              key={p.slug}
              className={`rounded-3xl transition-all duration-300 border bg-white overflow-hidden ${
                isExpanded ? 'border-[#0082AD] shadow-md ring-2 ring-[#0082AD]/20' : 'border-slate-100 hover:border-slate-200 shadow-sm'
              }`}
            >
              {/* Premade Card Header / Preview Bar */}
              <div
                onClick={() => handleToggleExpand(p)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Thumbnail Banner Box inside Premade Card */}
                  <div className="relative w-28 h-16 sm:w-36 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-r from-[#005F80] via-[#0082AD] to-[#7AA13B] shrink-0 flex items-center justify-center text-white shadow-sm border border-white/20">
                    {displayBgImage && (
                      <div className="absolute inset-0 z-0">
                        <img src={displayBgImage} alt={displayTitle} className="w-full h-full object-cover" />
                        {/* Low Opacity Blue & Green Mix Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00384D]/45 via-[#005F80]/35 to-[#7AA13B]/40" />
                      </div>
                    )}
                    <span className="relative z-10 text-[10px] font-extrabold uppercase px-2 text-center text-white drop-shadow-sm line-clamp-1">
                      {p.name.replace(' Page', '')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-[#E6F4F8] text-[#0082AD] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                        {displayBadge}
                      </span>
                      {displayBgImage ? (
                        <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Custom Image Uploaded
                        </span>
                      ) : (
                        <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Default Blue & Green Gradient
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                      {displayTitle}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl">
                      {displaySubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <Button
                    type="button"
                    variant={isExpanded ? "default" : "outline"}
                    className={`h-10 px-4 rounded-xl text-xs font-extrabold ${
                      isExpanded ? "bg-[#0082AD] hover:bg-[#006E91] text-white" : "border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{isExpanded ? 'Close Form' : 'Edit Banner'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 ml-1.5" /> : <ChevronDown className="w-4 h-4 ml-1.5" />}
                  </Button>
                </div>
              </div>

              {/* Collapsible Dropdown Edit Form inside Card */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8 space-y-6">
                  <form onSubmit={handleSave} className="space-y-6 max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-[#005F80] font-extrabold text-sm border-b border-slate-200 pb-3">
                      <ImageIcon className="w-4 h-4 text-[#7AA13B]" />
                      <span>Editing Settings for {p.name}</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Top Badge Text</Label>
                        <Input
                          value={editingBanner.badge || ''}
                          onChange={(e) => setEditingBanner({ ...editingBanner, badge: e.target.value })}
                          placeholder="e.g. Educational Legacy Since 2002"
                          className="h-11 rounded-xl bg-white border-slate-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Banner Title *</Label>
                        <Input
                          value={editingBanner.title || ''}
                          onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                          placeholder="e.g. About Angels School"
                          className="h-11 rounded-xl bg-white border-slate-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Banner Subtitle / Description</Label>
                      <Textarea
                        value={editingBanner.subtitle || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                        placeholder="e.g. Shaping bright futures and rank-one results through dedicated science education"
                        rows={3}
                        className="rounded-xl bg-white border-slate-200"
                      />
                    </div>

                    {/* Image Selector Controls */}
                    <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#0082AD]" />
                          <span>Header Background Image</span>
                        </Label>

                        <div className="flex gap-3 text-xs font-bold">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`imgSource_${p.slug}`}
                              value="upload"
                              checked={imageSource === 'upload'}
                              onChange={() => setImageSource('upload')}
                              className="w-4 h-4 text-[#0082AD]"
                            />
                            <span>Upload Local File</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`imgSource_${p.slug}`}
                              value="url"
                              checked={imageSource === 'url'}
                              onChange={() => setImageSource('url')}
                              className="w-4 h-4 text-[#0082AD]"
                            />
                            <span>Image URL</span>
                          </label>
                        </div>
                      </div>

                      {imageSource === 'upload' ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="cursor-pointer h-11 bg-slate-50 rounded-xl border-slate-200 text-xs py-2"
                            />
                            {editingBanner.bgImage && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleRemoveImage}
                                className="h-11 px-4 text-xs font-bold text-rose-600 border-rose-200 hover:bg-rose-50 rounded-xl gap-1.5 shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove Image</span>
                              </Button>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Upload a high-resolution banner image directly from your computer (JPG, PNG, WebP).
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Input
                            value={editingBanner.bgImage || ''}
                            onChange={(e) => setEditingBanner({ ...editingBanner, bgImage: e.target.value })}
                            placeholder="https://images.unsplash.com/... or image URL"
                            className="h-11 bg-slate-50 rounded-xl border-slate-200"
                          />
                        </div>
                      )}
                    </div>

                    {/* Live Header Banner Preview Box */}
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-700 block">Live Preview for {p.name}</Label>
                      <div className="relative py-14 px-8 rounded-3xl bg-gradient-to-r from-[#005F80] via-[#0082AD] to-[#7AA13B] text-white text-center overflow-hidden shadow-md min-h-[220px] flex items-center justify-center">
                        {editingBanner.bgImage && (
                          <div className="absolute inset-0 z-0">
                            <img src={editingBanner.bgImage} alt="Preview" className="w-full h-full object-cover" />
                            {/* Low Opacity Blue & Green Mix Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00384D]/45 via-[#005F80]/35 to-[#7AA13B]/40" />
                          </div>
                        )}
                        <div className="relative z-10 space-y-2.5 max-w-xl mx-auto">
                          {editingBanner.badge && (
                            <span className="inline-block bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-100 border border-white/20">
                              {editingBanner.badge}
                            </span>
                          )}
                          <h3 className="text-2xl sm:text-3xl font-extrabold">{editingBanner.title || 'Page Title'}</h3>
                          <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed max-w-md mx-auto">{editingBanner.subtitle || 'Page Subtitle'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <Button
                        type="submit"
                        className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold h-12 px-10 rounded-xl shadow-md text-xs sm:text-sm"
                        disabled={isSaving}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving Banner...' : `Save ${p.name} Banner`}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </Card>
          );
        })}
      </div>

    </div>
  );
}
