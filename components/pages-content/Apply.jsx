import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, CheckCircle2, User, Phone, Mail, GraduationCap, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    medium: 'English Medium',
    branch: 'Deesa Head Office',
    course: '11th-12th Science (JEE/NEET)',
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.studentName} (Parent: ${formData.parentName})`,
          email: formData.email || 'online-apply@angelsschool.co.in',
          phone: formData.phone,
          subject: `Online Application: ${formData.course} (${formData.medium})`,
          branch: formData.branch,
          message: `Application for ${formData.course} in ${formData.medium}. Notes: ${formData.notes || 'N/A'}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Application submission failed. Please try again or call our helpline.');
      }
    } catch (err) {
      console.error('Apply submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-8">
          <Badge className="bg-[#7AA13B] text-white font-bold mb-2">Academic Year 2026-27</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#005F80]">Online Admission Application</h1>
          <p className="text-slate-600 text-xs mt-2">Submit your details to reserve your student seat consultation</p>
        </div>

        <Card className="rounded-3xl border border-slate-100 bg-white shadow-xl p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-[#F2F7E9] text-[#7AA13B] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Application Submitted Successfully!</h2>
              <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
                Your admission application has been registered. Our counsellor desk will review your details and contact you via call or WhatsApp within 24 hours.
              </p>
              <Link href="/">
                <Button className="bg-[#0082AD] hover:bg-[#005F80] text-white font-bold px-8 py-3 rounded-full text-xs mt-2">
                  Return To Homepage
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-sm font-extrabold text-[#0082AD] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#7AA13B]" />
                  1. Student & Parent Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Aarav Patel"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Rameshchandra Patel"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. parent@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-[#0082AD] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#7AA13B]" />
                  2. Academic Stream & Campus Preferences
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Instruction Medium</label>
                    <select
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    >
                      <option value="English Medium">English Medium</option>
                      <option value="Gujarati Medium">ગુજરાતી માધ્યમ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Campus</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    >
                      <option value="Deesa Head Office">Deesa HQ Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Program / Batch</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    >
                      <option value="11th-12th Science (JEE/NEET)">11th-12th Science (JEE/NEET)</option>
                      <option value="Class 11 & 12 Board Standard">Class 11 & 12 Board Standard</option>
                      <option value="GUJCET Entrance Batch">GUJCET Entrance Prep</option>
                      <option value="Distance Learning Program (DLP)">Distance Learning Program (DLP)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes / Queries</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mention previous school marks or any specific counselling questions..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#0082AD] hover:bg-[#005F80] text-white font-bold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? 'Submitting Application...' : 'Submit Official Application'}
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
