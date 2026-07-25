import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Plus, Trash2, Loader2, Mail, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function WhitelistManagement() {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchWhitelist();
  }, []);

  const fetchWhitelist = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/admin/whitelist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setEmails(data.emails || []);
      } else {
        setError(data.message || 'Failed to load whitelist');
      }
    } catch (err) {
      console.error('Fetch whitelist error:', err);
      setError('An error occurred while loading whitelist');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!newEmail || !newEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/admin/whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: newEmail,
          note
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message || 'Email whitelisted successfully!');
        setNewEmail('');
        setNote('');
        fetchWhitelist();
      } else {
        setError(data.message || 'Failed to whitelist email');
      }
    } catch (err) {
      console.error('Add whitelist error:', err);
      setError('Error saving whitelisted email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, email, isPrimary) => {
    if (isPrimary) {
      alert('Primary system admin emails cannot be removed.');
      return;
    }

    if (!confirm(`Are you sure you want to remove ${email} from the whitelist?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/admin/whitelist/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(`Removed ${email} from whitelist`);
        fetchWhitelist();
      } else {
        alert(data.message || 'Failed to delete whitelist entry');
      }
    } catch (err) {
      console.error('Delete whitelist error:', err);
      alert('Failed to delete whitelist entry');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-[#0082AD]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#005F80] to-[#0082AD] text-white p-6 rounded-3xl shadow-md flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
          <ShieldCheck className="w-6 h-6 text-[#7AA13B]" />
        </div>
        <div>
          <h2 className="text-xl font-black">Admin Access Whitelist</h2>
          <p className="text-xs text-cyan-100">
            Control which email addresses are permitted to log in or register as Administrators (via Google or password).
          </p>
        </div>
      </div>

      {/* Add New Whitelist Form */}
      <Card className="rounded-3xl border border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0082AD]" />
            Authorize New Admin Email
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Whitelisted emails will gain administrator privileges upon logging in with Google or creating an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEmail} className="space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-xs font-bold text-slate-700">Email Address *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. principal@angelsschooldeesa.org"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="note" className="text-xs font-bold text-slate-700">Note / Designation (Optional)</Label>
                <Input
                  id="note"
                  type="text"
                  placeholder="e.g. Academic Director, Trustee"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="rounded-xl mt-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-bold h-11 px-6 rounded-xl shadow-sm transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding to Whitelist...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Whitelist Admin Email
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Whitelisted Emails Table */}
      <Card className="rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center justify-between">
            <span>Authorized Email Addresses ({emails.length})</span>
            <span className="text-xs font-normal text-slate-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              Primary admins cannot be deleted
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-3.5">Email Address</th>
                  <th className="px-6 py-3.5">Role / Status</th>
                  <th className="px-6 py-3.5">Note</th>
                  <th className="px-6 py-3.5">Added By</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {emails.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      No whitelisted emails found.
                    </td>
                  </tr>
                ) : (
                  emails.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#0082AD]" />
                        <span>{item.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        {item.isPrimary ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold">
                            <ShieldCheck className="w-3 h-3 text-amber-600" />
                            Primary System Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Whitelisted Admin
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.note || '—'}</td>
                      <td className="px-6 py-4 text-slate-500 capitalize">{item.addedBy || 'system'}</td>
                      <td className="px-6 py-4 text-right">
                        {!item.isPrimary ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id, item.email, item.isPrimary)}
                            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic font-normal">Protected</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
