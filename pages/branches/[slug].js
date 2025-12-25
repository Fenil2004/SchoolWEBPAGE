import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Building2, Users, Award, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BranchSidebar from '@/components/branches/BranchSidebar';
import Link from 'next/link';

export default function BranchDetailPage() {
    const router = useRouter();
    const { slug } = router.query;

    const [branch, setBranch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        if (slug) {
            fetchBranch();
            fetchGalleryImages();
        }
    }, [slug]);

    const fetchBranch = async () => {
        try {
            const response = await fetch('/api/branches', {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' },
            });
            if (response.ok) {
                const data = await response.json();
                const foundBranch = Array.isArray(data)
                    ? data.find(b => b.slug === slug && b.isActive)
                    : null;

                if (foundBranch) {
                    setBranch(foundBranch);
                } else {
                    setError('Branch not found');
                }
            } else {
                setError('Failed to fetch branch');
            }
        } catch (err) {
            console.error('Error fetching branch:', err);
            setError('Failed to load branch');
        } finally {
            setLoading(false);
        }
    };

    const fetchGalleryImages = async () => {
        try {
            const response = await fetch('/api/gallery?limit=6', {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' },
            });
            if (response.ok) {
                const data = await response.json();
                // API already returns limited active images
                setGalleryImages(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Error fetching gallery:', err);
        }
    };

    const facilityIcons = {
        'Air-Conditioned Classrooms': Building2,
        'Digital Library': BookOpen,
        'Physics Laboratory': Award,
        'Chemistry Laboratory': Award,
        'Biology Laboratory': Award,
        'Computer Lab': Users,
        'Hostel Facility': Building2,
        'Sports Ground': Users,
        'Cafeteria': Building2,
        'Audio-Visual Rooms': BookOpen,
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A94B8] mb-4"></div>
                    <p className="text-gray-600">Loading branch details...</p>
                </div>
            </div>
        );
    }

    if (error || !branch) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Branch Not Found</h1>
                    <p className="text-gray-600 mb-6">The branch you're looking for doesn't exist or is not active.</p>
                    <Link href="/branches">
                        <Button className="bg-[#0A94B8] hover:bg-[#056C8C]">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Branches
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Default values for optional fields
    const branchInfo = {
        name: branch.name,
        type: branch.isHeadquarter ? 'Head Office' : 'Branch',
        address: branch.address,
        phone: branch.phone,
        email: branch.email,
        timing: branch.timing || '7:00 AM - 7:00 PM',
        established: branch.established || 'N/A',
        students: branch.studentsCount || 'N/A',
        faculty: branch.facultyCount || 'N/A',
    };

    const facilities = branch.facilities || [];
    const achievements = branch.achievements || [];
    const mainImage = branch.mainImage || branch.image || 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
    const about = branch.about || `Welcome to ${branch.name}. We provide quality education and modern facilities to help students achieve their academic goals.`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-12 bg-gradient-to-br from-[#0A94B8] to-[#056C8C]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-white/90 mb-4">
                        <Link href="/branches" className="hover:text-white">Branches</Link>
                        <span>/</span>
                        <span className="text-white">{branch.name}</span>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white">{branch.name}</h1>
                            {branch.isHeadquarter && (
                                <Badge className="bg-white text-[#0A94B8]">Head Office</Badge>
                            )}
                        </div>
                        <p className="text-white/90">
                            {branchInfo.established !== 'N/A' ? `Established ${branchInfo.established} • ` : ''}
                            {branchInfo.students !== 'N/A' ? `${branchInfo.students} Students` : branch.city}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <BranchSidebar currentBranch={branch.slug} />
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Branch Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <img
                                    src={mainImage}
                                    alt={branch.name}
                                    className="w-full h-48 md:h-96 object-cover rounded-2xl shadow-xl"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://res.cloudinary.com/dneccresv/image/upload/v1765566941/school/gallery/gall6.jpg';
                                    }}
                                />
                            </motion.div>

                            {/* Quick Info Cards */}
                            {(branchInfo.students !== 'N/A' || branchInfo.faculty !== 'N/A' || branchInfo.established !== 'N/A') && (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {branchInfo.students !== 'N/A' && (
                                        <Card>
                                            <CardContent className="p-6 text-center">
                                                <Users className="w-10 h-10 text-[#0A94B8] mx-auto mb-3" />
                                                <p className="text-2xl font-bold text-gray-900">{branchInfo.students}</p>
                                                <p className="text-gray-600">Students</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {branchInfo.faculty !== 'N/A' && (
                                        <Card>
                                            <CardContent className="p-6 text-center">
                                                <Award className="w-10 h-10 text-[#76A440] mx-auto mb-3" />
                                                <p className="text-2xl font-bold text-gray-900">{branchInfo.faculty}</p>
                                                <p className="text-gray-600">Faculty Members</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {branchInfo.established !== 'N/A' && (
                                        <Card>
                                            <CardContent className="p-6 text-center">
                                                <BookOpen className="w-10 h-10 text-[#0A94B8] mx-auto mb-3" />
                                                <p className="text-2xl font-bold text-gray-900">{branchInfo.established}</p>
                                                <p className="text-gray-600">Established</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )}

                            {/* About Branch */}
                            <Card>
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Branch</h2>
                                    <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                                        {about}
                                    </p>

                                    {achievements.length > 0 && (
                                        <>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Key Achievements</h3>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {achievements.map((achievement, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                        <Award className="w-5 h-5 text-[#76A440] mt-1 flex-shrink-0" />
                                                        <span className="text-gray-700">{achievement}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card>
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#E8F1F4] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-[#0A94B8]" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Address</p>
                                                <p className="text-gray-600">{branch.address}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Phone</p>
                                                <a href={`tel:${branch.phone}`} className="text-[#0A94B8] hover:underline">
                                                    {branch.phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Email</p>
                                                <a href={`mailto:${branch.email}`} className="text-[#0A94B8] hover:underline">
                                                    {branch.email}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Working Hours</p>
                                                <p className="text-gray-600">{branchInfo.timing}</p>
                                                <p className="text-sm text-gray-500">Monday - Saturday</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Facilities */}
                            {facilities.length > 0 && (
                                <Card>
                                    <CardContent className="p-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities Available</h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {facilities.map((facility, idx) => {
                                                const Icon = facilityIcons[facility] || Building2;
                                                return (
                                                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                        <Icon className="w-6 h-6 text-[#0A94B8]" />
                                                        <span className="text-gray-700">{facility}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Gallery - Shows 6 latest from main gallery */}
                            {galleryImages.length > 0 && (
                                <Card>
                                    <CardContent className="p-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">Our Gallery</h2>
                                            <Link href="/gallery">
                                                <Button variant="outline" className="border-[#0A94B8] text-[#0A94B8] hover:bg-[#E8F1F4]">
                                                    View More
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {galleryImages.map((item, index) => (
                                                <div key={item.id || index} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video">
                                                    <img
                                                        src={item.imageUrl || item.image}
                                                        alt={item.title || `Gallery ${index + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Map */}
                            {branch.mapUrl && (
                                <Card>
                                    <CardContent className="p-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Map</h2>
                                        <div className="rounded-xl overflow-hidden h-64 md:h-96">
                                            <iframe
                                                src={branch.mapUrl.includes('embed') ? branch.mapUrl : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.123456!2d72.1919!3d24.2567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cd8e80e76e72b%3A0x7e7b4a4ecdca4cf2!2s${encodeURIComponent(branch.name)}!5e0!3m2!1sen!2sin!4v1703506392000`}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="Branch Location"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
