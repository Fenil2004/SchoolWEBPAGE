import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Trophy, Upload, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageSource, setImageSource] = useState('upload'); // 'upload' or 'url'
  const [formData, setFormData] = useState({
    title: '',
    category: 'Science Fair',
    eventDate: '',
    description: '',
    winnerName: '',
    image: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEdit = (ev) => {
    setIsEditing(true);
    setEditingId(ev.id);
    setFormData({
      title: ev.title || '',
      category: ev.category || 'Science Fair',
      eventDate: ev.eventDate || '',
      description: ev.description || '',
      winnerName: ev.winnerName || '',
      image: ev.image || '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event achievement?')) return;
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        alert('Event achievement deleted successfully');
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event achievement:', error);
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
      const url = editingId ? `/api/events/${editingId}` : '/api/events';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingId ? 'Event achievement updated successfully' : 'Event achievement created successfully');
        setIsEditing(false);
        setEditingId(null);
        setFormData({ title: '', category: 'Science Fair', eventDate: '', description: '', winnerName: '', image: '' });
        fetchEvents();
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to save event achievement');
      }
    } catch (error) {
      console.error('Error saving event achievement:', error);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 text-[#7AA13B] font-bold text-xs uppercase tracking-wider bg-[#F2F7E9] px-3 py-1 rounded-full mb-1">
            <Trophy className="w-3.5 h-3.5 text-[#0082AD]" />
            <span>Event & Competition Awards</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Manage Event Achievements</h2>
          <p className="text-xs text-slate-500">Create & manage student victories in Science Fairs, Olympiads, Sports, and Tech competitions.</p>
        </div>

        <Button
          onClick={() => {
            setIsEditing(true);
            setEditingId(null);
            setFormData({ title: '', category: 'Science Fair', eventDate: '', description: '', winnerName: '', image: '' });
          }}
          className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event Award</span>
        </Button>
      </div>

      {/* Editor Card */}
      {isEditing && (
        <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white p-6 sm:p-8">
          <CardHeader className="p-0 mb-6 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-extrabold text-[#005F80] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#7AA13B]" />
              <span>{editingId ? 'Edit Event Award' : 'Create New Event Award'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Event Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. State Science Fair 1st Rank"
                    required
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Science Fair / Olympiad / Sports"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Winner Name / Team</Label>
                  <Input
                    value={formData.winnerName}
                    onChange={(e) => setFormData({ ...formData, winnerName: e.target.value })}
                    placeholder="e.g. Aarav Shah & Team (Class 11 Science)"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Event Date</Label>
                  <Input
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    placeholder="e.g. December 2025"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </div>
              </div>

              {/* Local File Upload Control */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#0082AD]" />
                    <span>Event Photo</span>
                  </Label>

                  <div className="flex gap-4 text-xs font-bold">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="eventImgSource"
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
                        name="eventImgSource"
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
                      Upload an event photo directly from your computer (JPG, PNG, WebP).
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
                    <Label className="text-[11px] font-bold text-slate-600 block mb-1.5">Photo Preview</Label>
                    <div className="relative w-48 h-28 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={formData.image} alt="Event Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the victory, competition details, and student achievement..."
                  rows={3}
                  required
                  className="rounded-xl border-slate-200"
                />
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
                  className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold rounded-xl text-xs h-11 px-8 shadow-sm"
                >
                  {editingId ? 'Update Event Award' : 'Create Event Award'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <Card key={ev.id} className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden">
            <div>
              {ev.image ? (
                <img src={ev.image} alt={ev.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-slate-100 flex items-center justify-center text-slate-400">
                  <Trophy className="w-10 h-10" />
                </div>
              )}
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold bg-[#F2F7E9] text-[#7AA13B] px-2.5 py-0.5 rounded-full">{ev.category}</span>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{ev.title}</h3>
                {ev.winnerName && <div className="text-xs font-semibold text-[#0082AD]">{ev.winnerName}</div>}
                <p className="text-xs text-slate-500 line-clamp-2">{ev.description}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{ev.eventDate || 'Recent'}</span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(ev)} className="w-8 h-8 text-[#0082AD]"><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(ev.id)} className="w-8 h-8 text-rose-500"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
