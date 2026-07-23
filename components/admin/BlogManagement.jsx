import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, BookOpen, Sparkles, Upload, Image as ImageIcon, Trash } from 'lucide-react';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageSource, setImageSource] = useState('upload'); // 'upload' or 'url'
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Science & Entrance',
    author: 'Academic Cell',
    date: '',
    image: '',
    summary: '',
    content: '',
    isFeatured: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditingId(blog.id);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || 'Science & Entrance',
      author: blog.author || 'Academic Cell',
      date: blog.date || '',
      image: blog.image || '',
      summary: blog.summary || '',
      content: blog.content || '',
      isFeatured: blog.isFeatured || false,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        alert('Blog post deleted successfully');
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
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
        setFormData((prev) => ({
          ...prev,
          image: compressedDataUrl,
        }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingId ? 'Blog post updated successfully' : 'Blog post created successfully');
        setIsEditing(false);
        setEditingId(null);
        setFormData({ title: '', slug: '', category: 'Science & Entrance', author: 'Academic Cell', date: '', image: '', summary: '', content: '', isFeatured: false });
        fetchBlogs();
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 text-[#0082AD] font-bold text-xs uppercase tracking-wider bg-[#E6F4F8] px-3 py-1 rounded-full mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#7AA13B]" />
            <span>News & Educational Articles</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Manage Blog & News Cards</h2>
          <p className="text-xs text-slate-500">Create & manage articles displayed on Home Page and Blog section.</p>
        </div>

        <Button
          onClick={() => {
            setIsEditing(true);
            setEditingId(null);
            setFormData({ title: '', slug: '', category: 'Science & Entrance', author: 'Academic Cell', date: '', image: '', summary: '', content: '', isFeatured: false });
          }}
          className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Article</span>
        </Button>
      </div>

      {/* Editor Modal / Card */}
      {isEditing && (
        <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white p-6 sm:p-8">
          <CardHeader className="p-0 mb-6 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-extrabold text-[#005F80] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#7AA13B]" />
              <span>{editingId ? 'Edit Article' : 'Create New Article'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g. 10 Proven Strategies for NEET & JEE Preparation"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Science & Entrance / Bhulka"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Author</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Academic Cell"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Publication Date</Label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. March 2026"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
              </div>

              {/* Local File Upload Control */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#0082AD]" />
                    <span>Article Cover Image</span>
                  </Label>

                  <div className="flex gap-4 text-xs font-bold">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="blogImgSource"
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
                        name="blogImgSource"
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
                        className="cursor-pointer h-11 bg-white rounded-xl border-slate-200 text-xs py-2"
                      />
                      {formData.image && (
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
                      Upload an article cover photo directly from your computer (JPG, PNG, WebP).
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... or image link"
                      className="h-11 bg-white rounded-xl border-slate-200"
                    />
                  </div>
                )}

                {/* Live Image Preview Thumbnail */}
                {formData.image && (
                  <div className="pt-2">
                    <Label className="text-[11px] font-bold text-slate-600 block mb-1.5">Cover Image Preview</Label>
                    <div className="relative w-48 h-28 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={formData.image} alt="Blog Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Summary (Displayed on Home Page Card) *</Label>
                <Textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={2}
                  required
                  placeholder="Short engaging excerpt for the home page news card..."
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Full Article Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  placeholder="Detailed article body content..."
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-[#0082AD] rounded"
                />
                <Label htmlFor="isFeatured" className="text-xs font-bold cursor-pointer text-slate-800">
                  Feature on Home Page Cards Section
                </Label>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl text-xs font-bold h-11 px-5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0082AD] hover:bg-[#006E91] text-white font-extrabold rounded-xl text-xs h-11 px-8 shadow-sm"
                >
                  {editingId ? 'Update Article' : 'Save Article'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blogs List Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <Card key={b.id} className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden">
            <div>
              {b.image ? (
                <img src={b.image} alt={b.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-slate-100 flex items-center justify-center text-slate-400">
                  <BookOpen className="w-10 h-10" />
                </div>
              )}
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold bg-[#E6F4F8] text-[#0082AD] px-2.5 py-0.5 rounded-full">{b.category}</span>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{b.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{b.summary}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{b.date || 'Recent'}</span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(b)} className="w-8 h-8 text-[#0082AD]"><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(b.id)} className="w-8 h-8 text-rose-500"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
