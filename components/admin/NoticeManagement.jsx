import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Bell, Sparkles, Eye, CheckCircle2, XCircle, ArrowUp, ArrowDown } from 'lucide-react';

export default function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    text: '',
    link: '/admissions',
    isActive: true,
    displayOrder: 1,
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/notices');
      if (res.ok) {
        const data = await res.json();
        setNotices(data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      text: '',
      link: '/admissions',
      isActive: true,
      displayOrder: notices.length + 1,
    });
  };

  const handleEdit = (notice) => {
    setIsEditing(true);
    setEditingId(notice.id);
    setFormData({
      text: notice.text || '',
      link: notice.link || '/admissions',
      isActive: notice.isActive !== undefined ? notice.isActive : true,
      displayOrder: notice.displayOrder || 1,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this notice announcement?')) return;
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Notice deleted successfully!');
        fetchNotices();
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const handleToggleActive = async (notice) => {
    try {
      const res = await fetch(`/api/notices/${notice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...notice, isActive: !notice.isActive }),
        credentials: 'include',
      });
      if (res.ok) {
        fetchNotices();
      }
    } catch (error) {
      console.error('Error toggling notice state:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      alert('Please enter announcement notice text.');
      return;
    }

    try {
      const url = isEditing ? `/api/notices/${editingId}` : '/api/notices';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (res.ok) {
        alert(`Notice ${isEditing ? 'updated' : 'created'} successfully!`);
        resetForm();
        fetchNotices();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || 'Failed to save notice'}`);
      }
    } catch (error) {
      console.error('Error saving notice:', error);
      alert('An unexpected error occurred while saving notice.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-teal animate-bounce" />
            <h2 className="text-xl font-extrabold text-slate-900">Homepage Notice Ticker Management</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Edit urgent school notices, admission announcements, and ticker links shown continuously on the website homepage header.
          </p>
        </div>

        <Button
          onClick={() => {
            if (isEditing) resetForm();
            else {
              setIsEditing(false);
              setEditingId(null);
              setFormData({
                text: '',
                link: '/admissions',
                isActive: true,
                displayOrder: notices.length + 1,
              });
            }
          }}
          className="bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-bold gap-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          <span>{isEditing ? 'Cancel Edit' : 'Add New Notice'}</span>
        </Button>
      </div>

      {/* Live Preview Strip */}
      <Card className="rounded-3xl border border-brand-teal/20 bg-gradient-to-r from-brand-teal-dark via-brand-teal to-[#004560] text-white overflow-hidden shadow-md">
        <CardHeader className="py-2.5 px-4 border-b border-white/10 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green-light">
            <Eye className="w-4 h-4" />
            <span>Live Notice Ticker Preview</span>
          </div>
          <span className="text-[10px] text-white/70">Flowing continuously on homepage</span>
        </CardHeader>
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-4 text-xs font-medium overflow-hidden whitespace-nowrap">
            <div className="flex items-center gap-2 shrink-0 bg-white/20 px-2.5 py-1 rounded-full text-white text-[11px] font-bold uppercase">
              <Bell className="w-3.5 h-3.5 text-brand-green-light" />
              Notice
            </div>
            <div className="flex-1 overflow-hidden relative">
              <div className="flex items-center gap-8 animate-[marquee_25s_linear_infinite]">
                {(notices.filter((n) => n.isActive).length > 0
                  ? notices.filter((n) => n.isActive)
                  : [{ text: 'Sample Notice Announcement — Admissions Open 2026-27' }]
                )
                  .concat(
                    notices.filter((n) => n.isActive).length > 0
                      ? notices.filter((n) => n.isActive)
                      : [{ text: 'Sample Notice Announcement — Admissions Open 2026-27' }]
                  )
                  .map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-green-light" />
                      <span>{item.text}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <Card className="lg:col-span-1 rounded-3xl border border-slate-100 bg-white shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-teal" />
              <span>{isEditing ? 'Edit Notice' : 'Add New Notice'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <Label className="font-bold text-slate-700">Notice Announcement Text *</Label>
                <textarea
                  rows={3}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="e.g. 🎓 Admissions Open for Academic Session 2026-27 — Grades 1 to 12"
                  className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                  required
                />
              </div>

              <div>
                <Label className="font-bold text-slate-700">Action Button Target Link</Label>
                <Input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="e.g. /admissions or /courses"
                  className="mt-1.5 rounded-xl border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="font-bold text-slate-700">Display Order</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="mt-1.5 rounded-xl border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <Label className="font-bold text-slate-700">Status</Label>
                  <select
                    value={formData.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                    className="w-full mt-1.5 h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:outline-none focus:border-brand-teal font-semibold"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Hidden (Disabled)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button type="submit" className="flex-1 bg-brand-teal hover:bg-brand-teal-dark text-white font-bold rounded-xl text-xs py-2">
                  {isEditing ? 'Update Notice' : 'Publish Notice'}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm} className="rounded-xl text-xs font-bold text-slate-600">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Notices List Column */}
        <Card className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-extrabold text-slate-900">
              Active Ticker Announcements ({notices.length})
            </CardTitle>
            <span className="text-xs text-slate-400 font-bold">Sorted by Order</span>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-12 text-center text-xs text-slate-400 font-bold">Loading notices...</div>
            ) : notices.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 font-bold space-y-2">
                <p>No notices configured yet.</p>
                <p className="text-[11px] text-slate-400 font-normal">Add your first notice using the form to customize the homepage ticker.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((notice, idx) => (
                  <div
                    key={notice.id || idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      notice.isActive ? 'border-slate-100 bg-slate-50/50 hover:border-brand-teal/30' : 'border-slate-100 bg-slate-100/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-teal/10 text-brand-teal font-extrabold text-[11px] shrink-0 mt-0.5">
                        {notice.displayOrder || idx + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900 leading-snug">{notice.text}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                          <span>Link: <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-700">{notice.link || '/admissions'}</code></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleToggleActive(notice)}
                        title={notice.isActive ? 'Click to Disable' : 'Click to Enable'}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                          notice.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        {notice.isActive ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-600" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(notice)}
                        className="w-8 h-8 rounded-lg hover:bg-brand-teal-light text-brand-teal"
                        title="Edit Notice"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(notice.id)}
                        className="w-8 h-8 rounded-lg hover:bg-rose-50 text-rose-600"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
