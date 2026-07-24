import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Phone, Send, Sparkles, User, Mail, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function AdmissionsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: 'Bhavnagar Head Office',
    course: '11th-12th Science (JEE/NEET)',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || 'admissions-drawer@angelsschool.co.in',
          phone: formData.phone,
          subject: `Quick Admission Enquiry: ${formData.course}`,
          branch: formData.branch,
          message: formData.message || `Admission enquiry for ${formData.course} at ${formData.branch}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Form submission failed. Please try calling helpline directly.');
      }
    } catch (err) {
      console.error('Admissions submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#005F80] via-[#0082AD] to-[#004761] p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#7AA13B]" />
              <Badge className="bg-[#7AA13B] text-white font-bold text-[10px] uppercase">Admissions Open 2026</Badge>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Start Your Admission Process</h2>
            <p className="text-xs text-cyan-100 mt-1">Get direct guidance from our academic counsellor desk</p>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#F2F7E9] text-[#7AA13B] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Enquiry Received!</h3>
                <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                  Thank you for expressing interest in Angels School. Our admissions desk will call you back within 24 hours.
                </p>
                <Button
                  onClick={onClose}
                  className="bg-[#0082AD] hover:bg-[#005F80] text-white font-bold text-xs px-8 py-3 rounded-full"
                >
                  Close Window
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student / Parent Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0082AD]"
                      />
                    </div>
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
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course / Batch Stream</label>
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

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0082AD] hover:bg-[#005F80] text-white font-bold py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  {submitting ? 'Submitting...' : 'Submit Admission Enquiry'}
                  <Send className="w-4 h-4" />
                </Button>

                <p className="text-[10px] text-center text-slate-400">
                  Or call admissions desk directly: <a href="tel:+918401278780" className="text-[#0082AD] font-bold">+91 84012 78780</a>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
