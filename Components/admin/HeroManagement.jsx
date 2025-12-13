import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Plus, Edit, Trash2, Save, Loader2, Upload, Link as LinkIcon } from 'lucide-react';

export default function HeroManagement() {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageSource, setImageSource] = useState('url');
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    imageUrl: '',
    displayOrder: 1,
    isActive: true
  });

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    try {
      const response = await fetch('/api/hero');
      const data = await response.json();
      setHeroes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch hero content:', error);
      alert('Failed to load hero content');
      setHeroes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please login to continue');
      return;
    }

    try {
      let imageUrl = formData.imageUrl;

      // If uploading a file, validate and convert to base64
      if (imageSource === 'upload' && imageFile) {
        // Validate file size (2MB max to prevent payload errors)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (imageFile.size > maxSize) {
          alert(`Image is too large (${(imageFile.size / (1024 * 1024)).toFixed(2)}MB). Maximum size is 2MB. Please compress or resize the image before uploading.`);
          return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(imageFile.type)) {
          alert(`Invalid file type: ${imageFile.type}. Please use JPG, PNG, or WebP format.`);
          return;
        }

        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(imageFile);
        });
      }

      const heroData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        ctaText: formData.ctaText || null,
        ctaLink: formData.ctaLink || null,
        imageUrl: imageUrl || null,
        displayOrder: parseInt(formData.displayOrder),
        isActive: formData.isActive
      };

      const url = editingId ? `/api/hero/${editingId}` : '/api/hero';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(heroData)
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || (editingId ? 'Hero content updated successfully!' : 'Hero content created successfully!'));
        resetForm();
        fetchHeroes();
      } else {
        const error = await response.json();
        const errorMsg = error.message || error.error || 'Failed to save hero content';
        console.error('API Error Response:', error);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Failed to save hero content:', error);
      if (error.message && error.message.includes('JSON')) {
        alert('Failed to save hero content: Image file is too large. Please use a smaller image (max 2MB) or compress it.');
      } else {
        alert(`Failed to save hero content: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleEdit = (hero) => {
    setFormData({
      title: hero.title,
      subtitle: hero.subtitle,
      ctaText: hero.ctaText,
      ctaLink: hero.ctaLink,
      imageUrl: hero.imageUrl || '',
      displayOrder: hero.displayOrder,
      isActive: hero.isActive !== undefined ? hero.isActive : true
    });
    setEditingId(hero.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hero section?')) return;

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please login to continue');
      return;
    }

    try {
      const response = await fetch(`/api/hero/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        alert('Hero content deleted successfully!');
        fetchHeroes();
      } else {
        const error = await response.json();
        alert(error.message || error.error || 'Failed to delete hero content');
      }
    } catch (error) {
      console.error('Failed to delete hero content:', error);
      alert('Failed to delete hero content');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      imageUrl: '',
      displayOrder: 1,
      isActive: true
    });
    setEditingId(null);
    setIsEditing(false);
    setImageSource('url');
    setImageFile(null);
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
        <h2 className="text-2xl font-bold">Hero Section Management</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Hero
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Hero Section' : 'Add New Hero Section'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter subtitle"
                />
              </div>
              
              <div>
                <Label>Background Image</Label>
                <div className="flex gap-4 mt-2 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="url"
                      checked={imageSource === 'url'}
                      onChange={(e) => setImageSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <LinkIcon className="w-4 h-4" />
                    <span>Image URL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="upload"
                      checked={imageSource === 'upload'}
                      onChange={(e) => setImageSource(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </label>
                </div>
                {imageSource === 'url' ? (
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Enter image URL"
                  />
                ) : (
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0])}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload a background image (min 1920x1080px, max 2MB). JPG, PNG, WebP formats supported</p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ctaText">CTA Button Text</Label>
                  <Input
                    id="ctaText"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="e.g., Enroll Now"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLink">CTA Button Link</Label>
                  <Input
                    id="ctaLink"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="e.g., /contact"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isActive">Active (visible on homepage)</Label>
              </div>

              <div>
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                  placeholder="1"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Update' : 'Save'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {heroes.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                No hero content found. Click "Add New Hero" to create one.
              </CardContent>
            </Card>
          ) : (
            heroes.map((hero) => (
              <Card key={hero.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{hero.title}</h3>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">Order: {hero.displayOrder}</span>
                        {hero.isActive ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Inactive</span>
                        )}
                      </div>
                      {hero.subtitle && <p className="text-gray-600 mb-1">{hero.subtitle}</p>}
                      {hero.ctaText && (
                        <p className="text-sm text-blue-600">
                          Button: {hero.ctaText} → {hero.ctaLink || '#'}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(hero)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(hero.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
