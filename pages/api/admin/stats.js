import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch counts from database
    const [coursesCount, galleryCount, testimonialsCount, branchesCount] = await Promise.all([
      prisma.course.count(),
      prisma.galleryImage.count(),
      prisma.testimonial.count(),
      prisma.branch.count()
    ]);

    res.status(200).json({
      courses: coursesCount,
      galleryImages: galleryCount,
      testimonials: testimonialsCount,
      branches: branchesCount
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      message: 'Error fetching statistics',
      error: error.message 
    });
  }
}
