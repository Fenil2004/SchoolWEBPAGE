import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Save, Settings as SettingsIcon, Loader2, Upload, LinkIcon } from 'lucide-react';

export default function SettingsManagement() {
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    phone: '',
    email: '',
    address: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    logo: '',
    favicon: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [logoSource, setLogoSource] = useState('url');
  const [logoFile, setLogoFile] = useState(null);
  const [faviconSource, setFaviconSource] = useState('url');
  const [faviconFile, setFaviconFile] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings({
        siteName: data.siteName || '',
        tagline: data.tagline || '',
        phone: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        facebook: data.facebook || '',
        twitter: data.twitter || '',
        instagram: data.instagram || '',
        youtube: data.youtube || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        metaKeywords: data.metaKeywords || '',
        logo: data.logo || '',
        favicon: data.favicon || ''
      });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      alert('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please login to continue');
      return;
    }

    try {
      // Handle logo file upload with validation
      let logoUrl = settings.logo;
      if (logoSource === 'upload' && logoFile) {
        // Validate file size (1MB max for logos)
        const maxSize = 1 * 1024 * 1024; // 1MB in bytes
        if (logoFile.size > maxSize) {
          alert(`Logo is too large (${(logoFile.size / (1024 * 1024)).toFixed(2)}MB). Maximum size is 1MB. Please compress the image.`);
          return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(logoFile.type)) {
          alert(`Invalid file type: ${logoFile.type}. Please use JPG, PNG, or WebP format.`);
          return;
        }

        const reader = new FileReader();
        logoUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Failed to read logo file'));
          reader.readAsDataURL(logoFile);
        });
      }

      // Handle favicon file upload with validation
      let faviconUrl = settings.favicon;
      if (faviconSource === 'upload' && faviconFile) {
        // Validate file size (500KB max for favicons)
        const maxSize = 500 * 1024; // 500KB in bytes
        if (faviconFile.size > maxSize) {
          alert(`Favicon is too large (${(faviconFile.size / 1024).toFixed(2)}KB). Maximum size is 500KB. Please compress the image.`);
          return;
        }

        // Validate file type
        const validTypes = ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(faviconFile.type)) {
          alert(`Invalid file type: ${faviconFile.type}. Please use ICO or PNG format.`);
          return;
        }

        const reader = new FileReader();
        faviconUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Failed to read favicon file'));
          reader.readAsDataURL(faviconFile);
        });
      }

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          ...settings,
          logo: logoUrl,
          favicon: faviconUrl
        })
      });

      if (response.ok) {
        alert('Settings saved successfully!');
        fetchSettings();
        setLogoSource('url');
        setLogoFile(null);
        setFaviconSource('url');
        setFaviconFile(null);
      } else {
        const error = await response.json();
        const errorMsg = error.message || error.error || 'Failed to save settings';
        console.error('API Error Response:', error);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert(`Failed to save settings: ${error.message || 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name *</Label>
                <Input 
                  id="siteName" 
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input 
                  id="tagline" 
                  value={settings.tagline}
                  onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                />
              </div>
              <div>
                <Label>Logo</Label>
                <div className="flex gap-4 mt-2 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="url"
                      checked={logoSource === 'url'}
                      onChange={(e) => setLogoSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <LinkIcon className="w-4 h-4" />
                    <span>Logo URL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="upload"
                      checked={logoSource === 'upload'}
                      onChange={(e) => setLogoSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Upload className="w-4 h-4" />
                    <span>Upload Logo</span>
                  </label>
                </div>
                {logoSource === 'url' ? (
                  <Input
                    id="logo"
                    value={settings.logo}
                    onChange={(e) => setSettings({...settings, logo: e.target.value})}
                    placeholder="Enter logo URL"
                  />
                ) : (
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files?.[0])}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload a logo (min 200x200px, max 1MB). PNG with transparent background recommended</p>
                  </div>
                )}
              </div>
              <div>
                <Label>Favicon</Label>
                <div className="flex gap-4 mt-2 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="url"
                      checked={faviconSource === 'url'}
                      onChange={(e) => setFaviconSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <LinkIcon className="w-4 h-4" />
                    <span>Favicon URL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="upload"
                      checked={faviconSource === 'upload'}
                      onChange={(e) => setFaviconSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Upload className="w-4 h-4" />
                    <span>Upload Favicon</span>
                  </label>
                </div>
                {faviconSource === 'url' ? (
                  <Input
                    id="favicon"
                    value={settings.favicon}
                    onChange={(e) => setSettings({...settings, favicon: e.target.value})}
                    placeholder="Enter favicon URL"
                  />
                ) : (
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFaviconFile(e.target.files?.[0])}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload a favicon (16x16 or 32x32px, max 500KB). ICO or PNG format recommended</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input 
                  id="phone" 
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input 
                  id="facebook" 
                  value={settings.facebook}
                  onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input 
                  id="twitter" 
                  value={settings.twitter}
                  onChange={(e) => setSettings({...settings, twitter: e.target.value})}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input 
                  id="instagram" 
                  value={settings.instagram}
                  onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input 
                  id="youtube" 
                  value={settings.youtube}
                  onChange={(e) => setSettings({...settings, youtube: e.target.value})}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
                  placeholder="Your site's meta title"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                  placeholder="Your site's meta description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="metaKeywords">Keywords (comma-separated)</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
                  placeholder="coaching, NEET, JEE, education..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
