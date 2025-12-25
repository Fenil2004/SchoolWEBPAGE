import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
      console.log('Fetched settings:', data);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || 'Thank you for your message! We will get back to you soon.');
        // Reset form
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
      title: 'Head Office',
      detail: settings?.address || 'Bhavnagar, Gujarat, India',
      color: 'bg-[#0A94B8]',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: settings?.phone || '+91 8401278780',
      color: 'bg-[#76A440]',
    },
    {
      icon: Mail,
      title: 'Email',
      detail: settings?.email || 'angelsschoolno1@gmail.com',
      color: 'bg-[#0A94B8]',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      detail: 'Mon-Sat: 7AM - 7PM',
      color: 'bg-[#76A440]',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#0A94B8] to-[#056C8C] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Contact Us</h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards - Consistent Design */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <CardContent className="p-5 md:p-6 text-center flex flex-col items-center">
                    {/* Consistent icon container */}
                    <div className={`w-12 h-12 md:w-14 md:h-14 ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                      <info.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    {/* Consistent title */}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                    {/* Single line detail - normalized height */}
                    <p className="text-gray-600 text-sm leading-relaxed">{info.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#E8F1F4] text-[#0A94B8] rounded-full text-sm font-medium mb-4">
                Get In Touch
              </span>
              <h2 className="text-3xl font-bold text-[#056C8C] mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="branch">Select Branch</Label>
                        <Select
                          value={formData.branch}
                          onValueChange={(value) => setFormData({ ...formData, branch: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bhavnagar">Bhavnagar</SelectItem>
                            <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                            <SelectItem value="rajkot">Rajkot</SelectItem>
                            <SelectItem value="surat">Surat</SelectItem>
                            <SelectItem value="vadodara">Vadodara</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admission">Admission Inquiry</SelectItem>
                          <SelectItem value="fees">Fee Structure</SelectItem>
                          <SelectItem value="courses">Course Information</SelectItem>
                          <SelectItem value="scholarship">Scholarship</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your message..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-[#76A440] hover:bg-[#8FC85C] text-white" disabled={isSubmitting}>
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-xl h-[250px] md:h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.458788!2d72.1519!3d21.7645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQ1JzUyLjIiTiA3MsKwMDknMDYuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GCI Location"
                />
              </div>

              {/* Quick Contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#056C8C] mb-4">Quick Contact</h3>

                  <div className="space-y-4">
                    <a
                      href="tel:+918401278780"
                      className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Call Us</p>
                        <p className="text-gray-600">+91 8401278780</p>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/918401278780"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">WhatsApp</p>
                        <p className="text-gray-600">Chat with us</p>
                      </div>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-gray-600 mb-4">Follow us on social media</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-lg flex items-center justify-center hover:bg-[#76A440] transition-colors">
                        <Facebook className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-lg flex items-center justify-center hover:bg-[#76A440] transition-colors">
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-lg flex items-center justify-center hover:bg-[#76A440] transition-colors">
                        <Instagram className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-[#0A94B8] rounded-lg flex items-center justify-center hover:bg-[#76A440] transition-colors">
                        <Youtube className="w-5 h-5 text-white" />
                      </a>
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