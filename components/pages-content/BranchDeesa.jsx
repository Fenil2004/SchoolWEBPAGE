import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2, MessageCircle, Users, Award, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BranchSidebar from '@/components/branches/BranchSidebar';
import Link from 'next/link';

export default function BranchDeesa() {
    const branchInfo = {
        name: 'Deesa Main Campus',
        type: 'Headquarters',
        address: 'Angels School Vidyapith Campus, Main Road, Deesa - 385535',
        phone: '+91 8401278780',
        email: 'deesa@angelsschool.co.in',
        timing: '7:00 AM - 7:00 PM',
        established: '2002',
        students: '5,000+',
        faculty: '50+',
    };

    const facilities = [
        { name: 'Air-Conditioned Classrooms', icon: Building2 },
        { name: 'Digital Science Library', icon: BookOpen },
        { name: 'Physics Laboratory', icon: Award },
        { name: 'Chemistry Laboratory', icon: Award },
        { name: 'Biology Laboratory', icon: Award },
        { name: 'Computer & CBT Test Lab', icon: Users },
        { name: 'Boys & Girls Hostel', icon: Building2 },
        { name: 'Sports & Recreational Ground', icon: Users },
        { name: 'Student Cafeteria', icon: Building2 },
        { name: 'Audio-Visual Seminar Hall', icon: BookOpen },
    ];

    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const fetchGalleryImages = async () => {
        try {
            const response = await fetch('/api/gallery?limit=6', {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' },
            });
            if (response.ok) {
                const data = await response.json();
                setGalleryImages(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Error fetching gallery:', err);
        }
    };

    const achievements = [
        'Main headquarters campus established in 2002',
        '500+ Top NEET & JEE Selections in North Gujarat',
        'State-of-the-art smart classroom infrastructure',
        'Dedicated residential hostel & doubt desk',
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Page Header */}
            <section className="relative py-12 md:py-16 bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-3">
                        <Link href="/branches" className="hover:text-white">Campuses</Link>
                        <span>/</span>
                        <span className="text-white">Deesa HQ</span>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{branchInfo.name}</h1>
                            <Badge className="bg-[#7AA13B] text-white font-bold">Headquarters</Badge>
                        </div>
                        <p className="text-cyan-100 text-sm font-medium">Established {branchInfo.established} • {branchInfo.students} Active Students</p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-8">
                        
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <BranchSidebar currentBranch="BranchDeesa" />
                        </div>

                        {/* Content Body */}
                        <div className="lg:col-span-3 space-y-8">
                            
                            {/* Campus Hero Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-3xl overflow-hidden shadow-card border-4 border-white"
                            >
                                <img
                                    src="https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg"
                                    alt="Deesa Campus"
                                    className="w-full h-56 md:h-96 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                                    }}
                                />
                            </motion.div>

                            {/* Quick Metrics */}
                            <div className="grid grid-cols-3 gap-4">
                                <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 text-center">
                                    <Users className="w-8 h-8 text-[#0082AD] mx-auto mb-2" />
                                    <p className="text-2xl font-extrabold text-slate-900">{branchInfo.students}</p>
                                    <p className="text-slate-500 text-xs font-bold">Enrolled Students</p>
                                </Card>
                                <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 text-center">
                                    <Award className="w-8 h-8 text-[#7AA13B] mx-auto mb-2" />
                                    <p className="text-2xl font-extrabold text-slate-900">{branchInfo.faculty}</p>
                                    <p className="text-slate-500 text-xs font-bold">Faculty Mentors</p>
                                </Card>
                                <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 text-center">
                                    <BookOpen className="w-8 h-8 text-[#0082AD] mx-auto mb-2" />
                                    <p className="text-2xl font-extrabold text-slate-900">20+</p>
                                    <p className="text-slate-500 text-xs font-bold">Years Heritage</p>
                                </Card>
                            </div>

                            {/* Campus Overview */}
                            <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8">
                                <CardContent className="p-0 space-y-6">
                                    <h2 className="text-2xl font-bold text-[#005F80]">Campus Overview</h2>
                                    
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        The Deesa Main Campus is the flagship headquarters of Angels School Career Institute. Established in 2002 at the prestigious Angels School Vidyapith campus, it features modern infrastructure, comprehensive doubt-solving halls, and high-tech digital laboratories.
                                    </p>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        Students at Deesa campus benefit from personalized mentorship under senior PhD and IITian faculty, complete board and competitive material libraries, and full residential hostel amenities.
                                    </p>

                                    <div className="pt-4 border-t border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-900 mb-3">Key Highlights & Accolades</h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {achievements.map((achievement) => (
                                                <div key={achievement} className="flex items-start gap-2 text-xs font-bold text-slate-700 p-2 bg-[#F8FAFC] rounded-xl border border-slate-100">
                                                    <Award className="w-4 h-4 text-[#7AA13B] mt-0.5 flex-shrink-0" />
                                                    <span>{achievement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Details Card */}
                            <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8">
                                <CardContent className="p-0 space-y-6">
                                    <h2 className="text-xl font-bold text-[#005F80]">Campus Desk & Contact</h2>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-600">
                                        <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                                            <MapPin className="w-5 h-5 text-[#0082AD] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-slate-800 mb-0.5">Address</p>
                                                <p className="leading-relaxed">{branchInfo.address}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                                            <Phone className="w-5 h-5 text-[#7AA13B] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-slate-800 mb-0.5">Helpline</p>
                                                <a href={`tel:${branchInfo.phone}`} className="font-extrabold text-[#0082AD]">
                                                    {branchInfo.phone}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                                            <Mail className="w-5 h-5 text-[#0082AD] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-slate-800 mb-0.5">Campus Email</p>
                                                <a href={`mailto:${branchInfo.email}`} className="font-bold text-slate-700">
                                                    {branchInfo.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                                            <Clock className="w-5 h-5 text-[#7AA13B] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-slate-800 mb-0.5">Office Timings</p>
                                                <p className="font-bold text-slate-700">{branchInfo.timing}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Facilities Grid */}
                            <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8">
                                <CardContent className="p-0 space-y-4">
                                    <h2 className="text-xl font-bold text-[#005F80]">Campus Amenities & Labs</h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {facilities.map((facility) => (
                                            <div key={facility.name} className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                                                <div className="w-8 h-8 rounded-xl bg-[#E6F4F8] flex items-center justify-center text-[#0082AD]">
                                                    <facility.icon className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-700">{facility.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Embedded Campus Map */}
                            <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 overflow-hidden">
                                <CardContent className="p-0 space-y-4">
                                    <h2 className="text-xl font-bold text-[#005F80]">Map Directions</h2>
                                    <div className="rounded-2xl overflow-hidden h-72">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.1!2d72.1844!3d24.2567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cd8e84d77df3d%3A0x9b7d05c2e5c3a3b1!2sAngels%20School!5e0!3m2!1sen!2sin!4v1703506392000"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Deesa Campus Location"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

