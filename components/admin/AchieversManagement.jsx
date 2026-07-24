import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Trophy, Loader2, Upload, Link as LinkIcon, Star, GraduationCap } from 'lucide-react';

export default function AchieversManagement() {
  const [achievers, setAchievers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [imageSource, setImageSource] = useState('upload');
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    exam: '',
    score: '',
    category: 'neet-jee',
    tag: '',
    quote: '',
    image: '',
    isActive: true,
  });

  useEffect(() => {
    fetchAchievers();
  }, []);

  const fetchAchievers = async () => {
    try {
      const response = await fetch('/api/achievers');
      const data = await response.json();
      setAchievers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch achievers:', error);
      setAchievers([]);
    } fontFinally: {
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

      const response = await fetch('/api/achievers', {
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
        alert('Student achiever added to Hall of Fame successfully!');
        resetForm();
        fetchAchievers();
      } else {
        const error = await response.json().catch(() => ({}));
        alert(`Error: ${error.message || 'Failed to add achiever'}`);
      }
    } catch (error) {
      console.error('Failed to add achiever:', error);
      alert(`Failed to add achiever: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this achiever from Hall of Fame?')) return;

    try {
      const response = await fetch(`/api/achievers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Achiever removed successfully!');
        fetchAchievers();
      } else {
        alert('Failed to delete achiever');
      }
    } catch (error) {
      console.error('Failed to delete achiever:', error);
      alert('Failed to delete achiever');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      exam: '',
      score: '',
      category: 'neet-jee',
      tag: '',
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
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Hall of Fame & Academic Achievers Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage board toppers, NEET/JEE rankers, their photos, scores, and student experience quotes.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-[#0082AD] hover:bg-[#006A8D]">
          <Plus className="w-4 h-4 mr-2" />
          Add Achiever
        </Button>
      </div>

      {isAdding && (
        <Card className="rounded-2xl border border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-[#005F80]">Add Student Achiever</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Student Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="exam">Examination / Class *</Label>
                  <Input
                    id="exam"
                    value={formData.exam}
                    onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    placeholder="e.g. Class 12 Science (NEET) or Class 10 Board"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="score">Score / Rank *</Label>
                  <Input
                    id="score"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    placeholder="e.g. 695 / 720 (AIR 142) or 99.85 Percentile"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-md p-2 text-sm bg-white"
                    required
                  >
                    <option value="neet-jee">NEET & JEE Achiever</option>
                    <option value="board">Board Examination Topper</option>
                    <option value="olympiad">National Olympiad / STEM</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="tag">Badge / Tagline</Label>
                  <Input
                    id="tag"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. NEET Star, JEE Ranker, Class 10 Topper"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quote">Student's Experience / View Quote</Label>
                <Textarea
                  id="quote"
                  rows={3}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="e.g. The integrated Science faculty & test series at Angels School gave me complete confidence."
                />
              </div>

              {/* Image upload selector */}
              <div>
                <Label>Student Photo Source</Label>
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
                  Save Achiever
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Grid of Achievers */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievers.length === 0 ? (
          <Card className="col-span-4">
            <CardContent className="py-8 text-center text-slate-500 text-sm">
              No achievers found. Click "Add Achiever" to publish student rankers.
            </CardContent>
          </Card>
        ) : (
          achievers.map((achiever) => (
            <Card key={achiever.id} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between">
              <CardContent className="pt-6 space-y-3">
                <div className="relative text-center">
                  <img
                    src={achiever.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={achiever.name}
                    className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-md"
                  />
                  {achiever.tag && (
                    <span className="inline-block mt-2 bg-[#7AA13B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      {achiever.tag}
                    </span>
                  )}
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">{achiever.name}</h3>
                  <p className="text-xs font-semibold text-[#0082AD]">{achiever.exam}</p>
                  <p className="text-sm font-extrabold text-[#7AA13B]">{achiever.score}</p>
                </div>

                {achiever.quote && (
                  <p className="text-xs text-slate-500 italic text-center leading-relaxed border-t border-slate-100 pt-2">
                    "{achiever.quote}"
                  </p>
                )}

                <div className="pt-3 border-t border-slate-50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(achiever.id)}
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
