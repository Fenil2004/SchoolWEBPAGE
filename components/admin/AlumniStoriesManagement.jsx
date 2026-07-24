import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GraduationCap, Loader2, Upload, Link as LinkIcon, Award, Briefcase } from 'lucide-react';

export default function AlumniStoriesManagement() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [imageSource, setImageSource] = useState('upload');
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    role: '',
    achievement: '',
    quote: '',
    image: '',
    isActive: true,
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/alumni-stories');
      const data = await response.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch alumni stories:', error);
      setStories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      if (imageSource === 'upload' && imageFile) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (imageFile.size > maxSize) {
          alert('Image file is too large. Max size is 5MB.');
          return;
        }

        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(imageFile);
        });
      }

      const response = await fetch('/api/alumni-stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (response.ok) {
        alert('Alumni story added successfully!');
        resetForm();
        fetchStories();
      } else {
        const error = await response.json().catch(() => ({}));
        alert(`Error: ${error.message || 'Failed to add alumni story'}`);
      }
    } catch (error) {
      console.error('Failed to add alumni story:', error);
      alert(`Failed to add alumni story: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this alumni story?')) return;

    try {
      const response = await fetch(`/api/alumni-stories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Alumni story deleted successfully!');
        fetchStories();
      } else {
        alert('Failed to delete alumni story');
      }
    } catch (error) {
      console.error('Failed to delete alumni story:', error);
      alert('Failed to delete alumni story');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      batch: '',
      role: '',
      achievement: '',
      quote: '',
      image: '',
      isActive: true,
    });
    setImageSource('upload');
    setImageFile(null);
    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0082AD]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#0082AD]" />
            <span>Featured Alumni Stories Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage inspiring stories, career achievements, and quotes from Angels School alumni.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-[#0082AD] hover:bg-[#006A8D]">
          <Plus className="w-4 h-4 mr-2" />
          Add Alumni Story
        </Button>
      </div>

      {isAdding && (
        <Card className="rounded-2xl border border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-[#005F80]">Add Featured Alumni Story</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Alumni Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Devansh Parikh"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="batch">Batch / Stream *</Label>
                  <Input
                    id="batch"
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    placeholder="e.g. Batch of 2017 (Science NEET)"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role">Current Role & Institution / Company *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. MD Resident at AIIMS Delhi or Engineer at Google"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="achievement">Notable Academic Achievement / Rank</Label>
                  <Input
                    id="achievement"
                    value={formData.achievement}
                    onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                    placeholder="e.g. AIR 48 in NEET-UG | Class 12 Topper"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quote">Inspiring Alumni Story / Testimonial *</Label>
                <Textarea
                  id="quote"
                  rows={4}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="e.g. The rigorous STEM foundation and mentorship at Angels School paved my journey to AIIMS New Delhi."
                  required
                />
              </div>

              {/* Image upload selector */}
              <div>
                <Label>Alumni Photo Source</Label>
                <div className="flex gap-4 mt-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="radio"
                      value="upload"
                      checked={imageSource === 'upload'}
                      onChange={(e) => setImageSource(e.target.value)}
                    />
                    <Upload className="w-3.5 h-3.5 text-[#0082AD]" />
                    <span>Upload Photo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="radio"
                      value="url"
                      checked={imageSource === 'url'}
                      onChange={(e) => setImageSource(e.target.value)}
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-[#0082AD]" />
                    <span>Image URL</span>
                  </label>
                </div>
              </div>

              {imageSource === 'url' ? (
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="imageFile">Upload Photo File</Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                  {imageFile && (
                    <p className="text-xs text-green-600 mt-1">Selected: {imageFile.name}</p>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-[#0082AD] rounded"
                />
                <Label htmlFor="isActive" className="text-xs font-semibold">Active (visible on website)</Label>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="bg-[#7AA13B] hover:bg-[#8DB843]">
                  Save Alumni Story
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Grid of Alumni Stories */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.length === 0 ? (
          <Card className="col-span-3">
            <CardContent className="py-8 text-center text-slate-500 text-sm">
              No alumni stories found. Click "Add Alumni Story" to inspire current students.
            </CardContent>
          </Card>
        ) : (
          stories.map((story) => (
            <Card key={story.id} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={story.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'}
                    alt={story.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{story.name}</h3>
                    <p className="text-xs font-semibold text-[#0082AD]">{story.batch}</p>
                    <p className="text-xs text-slate-500 font-medium">{story.role}</p>
                  </div>
                </div>

                {story.achievement && (
                  <div className="bg-[#F2F7E9] text-[#7AA13B] text-xs font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{story.achievement}</span>
                  </div>
                )}

                <p className="text-xs text-slate-600 italic leading-relaxed border-t border-slate-100 pt-3">
                  "{story.quote}"
                </p>

                <div className="pt-2 border-t border-slate-50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(story.id)}
                    className="w-full text-rose-600 hover:bg-rose-50 border-rose-200 text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
