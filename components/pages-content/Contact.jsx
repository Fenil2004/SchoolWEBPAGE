import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Sparkles, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DepartmentContacts from '@/components/pages-content/DepartmentContacts';
import PageHeaderBanner from '@/components/layout/PageHeaderBanner';

export default function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    branch: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Thank you! Your message has been sent successfully. Our team will contact you shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          branch: '',
          message: '',
        });
      } else {
        alert(data.error || 'Failed to submit your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to submit your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      detail: settings?.address || 'Deesa Campus, Gujarat, India',
      color: 'bg-[#0082AD]',
    },
    {
      icon: Phone,
      title: 'Admissions Helpline',
      detail: settings?.phone || '+91 8401278780',
      color: 'bg-[#7AA13B]',
    },
    {
      icon: Mail,
      title: 'Official Email',
      detail: settings?.email || 'info@angelsschool.ac.in',
      color: 'bg-[#0082AD]',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      detail: 'Mon - Sat: 7:30 AM - 6:30 PM',
      color: 'bg-[#7AA13B]',
    },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      {/* Dynamic Page Header Banner */}
      <PageHeaderBanner
        pageSlug="contact"
        defaultTitle="Contact Admission Office"
        defaultBadge="Direct Student Assistance Desk"
        defaultSubtitle="We are available to resolve your course inquiries, admission guidance, and campus visit bookings"
      />

      {/* Info Cards Grid */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full border border-slate-100 rounded-2xl shadow-sm bg-[#F8FAFC] hover:shadow-card-hover transition-all">
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    <div className={`w-12 h-12 ${info.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{info.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{info.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Contacts Table Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <DepartmentContacts />
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4F8] border border-[#0082AD]/20 rounded-full text-[#0082AD] text-xs font-bold uppercase tracking-wider mb-4">
                <Send className="w-3.5 h-3.5 text-[#7AA13B]" />
                <span>Send Inquiry</span>
              </div>
              
              <h2 className="text-3xl font-extrabold text-[#005F80] mb-3">Admission & Course Inquiry</h2>
              <p className="text-slate-600 text-sm mb-8">
                Please submit the details below and our academic counsellor will reach out within 24 hours.
              </p>

              <Card className="rounded-3xl border border-slate-100 shadow-card bg-white p-6 sm:p-8">
                <CardContent className="p-0">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-bold text-slate-700">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Full Student / Parent Name"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#0082AD]"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-bold text-slate-700">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#0082AD]"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-bold text-slate-700">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 10-digit number"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#0082AD]"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="branch" className="text-xs font-bold text-slate-700">Preferred Campus</Label>
                        <Select
                          value={formData.branch}
                          onValueChange={(value) => setFormData({ ...formData, branch: value })}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-slate-200">
                            <SelectValue placeholder="Select Campus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deesa">Deesa Campus (HQ)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-xs font-bold text-slate-700">Inquiry Subject *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-slate-200">
                          <SelectValue placeholder="Select Purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admission">11th-12th Science Admission</SelectItem>
                          <SelectItem value="jee">JEE Main & Advanced Coaching</SelectItem>
                          <SelectItem value="neet">NEET UG Medical Prep</SelectItem>
                          <SelectItem value="fees">Scholarship & Fee Structure</SelectItem>
                          <SelectItem value="dlp">Distance Learning Program (DLP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-bold text-slate-700">Message / Requirements *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Specify standard, stream or any question..."
                        rows={4}
                        className="rounded-xl border-slate-200 focus:border-[#0082AD]"
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold h-12 rounded-xl shadow-md transition-all" disabled={isSubmitting}>
                      {isSubmitting ? (
                        'Submitting Inquiry...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Embedded Google Map */}
              <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white h-[320px] md:h-[380px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.1!2d72.1844!3d24.2567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cd8e84d77df3d%3A0x9b7d05c2e5c3a3b1!2sAngels%20School!5e0!3m2!1sen!2sin!4v1703506392000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Angels School Location"
                />
              </div>

              {/* Quick Contact Box */}
              <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white p-6">
                <CardContent className="p-0 space-y-4">
                  <h3 className="text-lg font-bold text-[#005F80]">Instant Helpline</h3>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <a
                      href="tel:+918401278780"
                      className="flex items-center gap-3 p-3.5 bg-[#E6F4F8] rounded-2xl hover:bg-[#d5edf4] transition-colors border border-[#0082AD]/20"
                    >
                      <div className="w-10 h-10 bg-[#0082AD] rounded-xl flex items-center justify-center text-white">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Direct Call</p>
                        <p className="text-xs text-[#0082AD] font-extrabold">+91 8401278780</p>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/918401278780"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 bg-[#F2F7E9] rounded-2xl hover:bg-[#e4efd2] transition-colors border border-[#7AA13B]/20"
                    >
                      <div className="w-10 h-10 bg-[#7AA13B] rounded-xl flex items-center justify-center text-white">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">WhatsApp Desk</p>
                        <p className="text-xs text-[#7AA13B] font-extrabold">Instant Chat</p>
                      </div>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Connect with us:</span>
                    <div className="flex gap-2">
                      {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                        <a key={idx} href="#" className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-[#0082AD] hover:text-white transition-colors text-slate-600">
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}