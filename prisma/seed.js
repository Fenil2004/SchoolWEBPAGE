// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@angelsschool.co.in' },
    update: {},
    create: {
      email: 'admin@angelsschool.co.in',
      password: adminPassword,
      name: 'Admin',
      role: 'admin',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample student (optional)
  const studentPassword = await bcrypt.hash('Student@123', 10);
  
  const student = await prisma.student.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: studentPassword,
      name: 'Test Student',
      phone: '9876543210',
      rollNo: 'AS2024001',
      role: 'student',
    },
  });

  console.log('✅ Created test student:', student.email);

  // Create sample branches
  const branches = [
    {
      name: 'Angels School Bhavnagar (HQ)',
      slug: 'bhavnagar',
      address: '123 Main Street, Bhavnagar, Gujarat 364001',
      city: 'Bhavnagar',
      phone: '+91 98765 43210',
      email: 'bhavnagar@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: true,
      facilities: ['Library', 'Computer Lab', 'Smart Classes', 'Study Material'],
    },
    {
      name: 'Angels School Ahmedabad',
      slug: 'ahmedabad',
      address: '456 Commerce Road, Ahmedabad, Gujarat 380001',
      city: 'Ahmedabad',
      phone: '+91 98765 43211',
      email: 'ahmedabad@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: false,
      facilities: ['Library', 'Computer Lab', 'Smart Classes'],
    },
    {
      name: 'Angels School Rajkot',
      slug: 'rajkot',
      address: '789 University Road, Rajkot, Gujarat 360001',
      city: 'Rajkot',
      phone: '+91 98765 43212',
      email: 'rajkot@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: false,
      facilities: ['Library', 'Computer Lab', 'AC Classrooms'],
    },
    {
      name: 'Angels School Surat',
      slug: 'surat',
      address: '321 Ring Road, Surat, Gujarat 395001',
      city: 'Surat',
      phone: '+91 98765 43213',
      email: 'surat@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: false,
      facilities: ['Library', 'Smart Classes', 'Cafeteria'],
    },
    {
      name: 'Angels School Vadodara',
      slug: 'vadodara',
      address: '555 Express Highway, Vadodara, Gujarat 390001',
      city: 'Vadodara',
      phone: '+91 98765 43214',
      email: 'vadodara@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: false,
      facilities: ['Library', 'Computer Lab', 'Sports Facility'],
    },
    {
      name: 'Angels School Jamnagar',
      slug: 'jamnagar',
      address: '888 Station Road, Jamnagar, Gujarat 361001',
      city: 'Jamnagar',
      phone: '+91 98765 43215',
      email: 'jamnagar@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: false,
      facilities: ['Library', 'Study Room', 'AC Classrooms'],
    },
    {
      name: 'Angels School Gandhinagar',
      slug: 'gandhinagar',
      address: '999 Sector 15, Gandhinagar, Gujarat 382015',
      city: 'Gandhinagar',
      phone: '+91 98765 43216',
      email: 'gandhinagar@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: false,
      facilities: ['Library', 'Computer Lab', 'Smart Classes'],
    },
    {
      name: 'Angels School Anand',
      slug: 'anand',
      address: '111 College Road, Anand, Gujarat 388001',
      city: 'Anand',
      phone: '+91 98765 43217',
      email: 'anand@angelsschool.co.in',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
      isHeadquarter: false,
      facilities: ['Library', 'Computer Lab', 'Study Material'],
    },
  ];

  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { slug: branch.slug },
      update: {},
      create: branch,
    });
    console.log(`✅ Created branch: ${branch.name}`);
  }

  // Create sample courses
  const courses = [
    {
      name: 'NEET Preparation',
      slug: 'neet',
      description: 'Comprehensive NEET coaching with experienced faculty',
      category: 'NEET',
      price: 50000,
      duration: '1 Year',
      features: ['Expert Faculty', 'Regular Tests', 'Study Material', 'Doubt Sessions'],
    },
    {
      name: 'JEE Main & Advanced',
      slug: 'jee',
      description: 'Complete JEE preparation program',
      category: 'JEE',
      price: 55000,
      duration: '1 Year',
      features: ['IIT Faculty', 'Daily Practice', 'Mock Tests', 'Personal Mentoring'],
    },
    {
      name: 'GUJCET',
      slug: 'gujcet',
      description: 'Gujarat Common Entrance Test coaching',
      category: 'GUJCET',
      price: 30000,
      duration: '6 Months',
      features: ['State Board Focus', 'Regular Tests', 'Study Material'],
    },
    {
      name: 'Foundation for Class 11',
      slug: 'foundation-11',
      description: 'Strong foundation building for Class 11 students',
      category: 'Foundation',
      price: 35000,
      duration: '1 Year',
      features: ['NCERT Based', 'Concept Building', 'Regular Assessments'],
    },
    {
      name: 'Foundation for Class 12',
      slug: 'foundation-12',
      description: 'Advanced preparation for Class 12 board exams',
      category: 'Foundation',
      price: 40000,
      duration: '1 Year',
      features: ['Board Focused', 'Previous Year Papers', 'Intensive Revision'],
    },
    {
      name: 'NEET Crash Course',
      slug: 'neet-crash',
      description: 'Last minute intensive NEET preparation',
      category: 'NEET',
      price: 25000,
      duration: '3 Months',
      features: ['Rapid Revision', 'Mock Tests', 'Strategy Sessions'],
    },
    {
      name: 'JEE Crash Course',
      slug: 'jee-crash',
      description: 'Intensive JEE preparation for last minute revision',
      category: 'JEE',
      price: 28000,
      duration: '3 Months',
      features: ['Problem Solving', 'Mock Tests', 'Time Management'],
    },
    {
      name: 'Online NEET Coaching',
      slug: 'online-neet',
      description: 'Virtual NEET coaching from anywhere',
      category: 'NEET',
      price: 35000,
      duration: '1 Year',
      features: ['Live Classes', 'Recorded Lectures', 'Online Tests', '24/7 Doubt Solving'],
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: course,
    });
    console.log(`✅ Created course: ${course.name}`);
  }

  // Create sample site settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Angels School',
      tagline: 'Where Dreams Take Flight',
      phone: '+91 98765 43210',
      email: 'info@angelsschool.co.in',
      address: 'Bhavnagar, Gujarat, India',
      metaTitle: 'Angels School - Best Coaching Institute in Gujarat',
      metaDescription: 'Leading coaching institute for NEET, JEE, GUJCET, and competitive exams preparation in Gujarat.',
    },
  });

  console.log('✅ Created site settings');

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Student',
      course: 'NEET 2024',
      rating: 5,
      message: 'Excellent coaching with great faculty. Got AIR 234 in NEET!',
      image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0D8ABC&color=fff',
      isActive: true,
    },
    {
      name: 'Priya Patel',
      role: 'Parent',
      course: 'JEE 2024',
      rating: 5,
      message: 'My son improved significantly. The teachers are very supportive.',
      image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=F97316&color=fff',
      isActive: true,
    },
    {
      name: 'Amit Desai',
      role: 'Alumni',
      course: 'NEET 2023',
      rating: 5,
      message: 'Best coaching institute in Gujarat. Currently studying MBBS.',
      image: 'https://ui-avatars.com/api/?name=Amit+Desai&background=10B981&color=fff',
      isActive: true,
    },
    {
      name: 'Sneha Shah',
      role: 'Student',
      course: 'JEE 2024',
      rating: 5,
      message: 'The faculty guidance and study material helped me secure admission in IIT.',
      image: 'https://ui-avatars.com/api/?name=Sneha+Shah&background=8B5CF6&color=fff',
      isActive: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log('✅ Created testimonials');

  // Create sample hero content
  const heroContent = [
    {
      title: 'Welcome to Angels School',
      subtitle: 'Where Dreams Take Flight',
      ctaText: 'Enroll Now',
      ctaLink: '/contact',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
      displayOrder: 1,
      isActive: true,
    },
    {
      title: 'NEET & JEE Coaching',
      subtitle: 'Expert Faculty | Proven Results',
      ctaText: 'View Courses',
      ctaLink: '/courses',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200',
      displayOrder: 2,
      isActive: true,
    },
    {
      title: 'Top Rankers Every Year',
      subtitle: '100+ Students in Top 1000',
      ctaText: 'See Results',
      ctaLink: '/gallery',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200',
      displayOrder: 3,
      isActive: true,
    },
    {
      title: 'State-of-the-Art Facilities',
      subtitle: 'Smart Classrooms | Library | Lab',
      ctaText: 'Visit Us',
      ctaLink: '/branches',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200',
      displayOrder: 4,
      isActive: true,
    },
  ];

  for (const hero of heroContent) {
    await prisma.heroContent.create({
      data: hero,
    });
  }

  console.log('✅ Created hero content');

  // Create sample gallery images
  const galleryImages = [
    {
      title: 'Campus View',
      description: 'Main campus building',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
      category: 'campus',
      isActive: true,
    },
    {
      title: 'Modern Classroom',
      description: 'Smart classroom with digital boards',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
      category: 'facilities',
      isActive: true,
    },
    {
      title: 'Students in Class',
      description: 'Interactive learning session',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
      category: 'students',
      isActive: true,
    },
    {
      title: 'Library',
      description: 'Well-stocked library with study material',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
      category: 'facilities',
      isActive: true,
    },
    {
      title: 'Annual Function',
      description: 'Student achievements celebration',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      category: 'events',
      isActive: true,
    },
    {
      title: 'Toppers 2024',
      description: 'NEET & JEE top rankers',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
      category: 'achievements',
      isActive: true,
    },
    {
      title: 'Computer Lab',
      description: 'Advanced computer laboratory',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      category: 'facilities',
      isActive: true,
    },
    {
      title: 'Science Lab',
      description: 'Well-equipped physics and chemistry lab',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      category: 'facilities',
      isActive: true,
    },
    {
      title: 'Study Room',
      description: 'Quiet study area for focused learning',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
      category: 'facilities',
      isActive: true,
    },
    {
      title: 'Sports Day',
      description: 'Annual sports competition',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      category: 'events',
      isActive: true,
    },
    {
      title: 'Group Study',
      description: 'Collaborative learning sessions',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      category: 'students',
      isActive: true,
    },
    {
      title: 'Campus Garden',
      description: 'Green campus with relaxation area',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      category: 'campus',
      isActive: true,
    },
  ];

  for (const image of galleryImages) {
    await prisma.galleryImage.create({
      data: image,
    });
  }

  console.log('✅ Created gallery images');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
