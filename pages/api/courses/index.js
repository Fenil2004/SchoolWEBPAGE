import { prisma } from '@/lib/db';
import { authMiddleware, requireRole } from '@/lib/auth';

// GET all courses or POST new course
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          branchCourses: {
            include: {
              branch: true,
            },
          },
        },
      });

      return res.status(200).json(courses);
    } catch (error) {
      console.error('Get courses error:', error);
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }

  if (req.method === 'POST') {
    // Protect POST with admin authentication
    return requireRole('admin', async (req, res) => {
      try {
        const {
          name,
          slug,
          description,
          category,
          price,
          duration,
          features,
          syllabus,
          image,
          isActive,
        } = req.body;

        // Validation
        if (!name || !slug || !description || !category || !price || !duration) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields',
          });
        }

        // Check if slug already exists
        const existingCourse = await prisma.course.findUnique({
          where: { slug },
        });

        if (existingCourse) {
          return res.status(400).json({
            success: false,
            message: 'Course with this slug already exists',
          });
        }

        const course = await prisma.course.create({
          data: {
            name,
            slug,
            description,
            category,
            price: parseFloat(price),
            duration,
            features: Array.isArray(features) ? features : [],
            syllabus,
            image,
            isActive: isActive !== undefined ? isActive : true,
          },
        });

        return res.status(201).json({
          success: true,
          message: 'Course created successfully',
          course,
        });
      } catch (error) {
        console.error('Create course error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to create course',
        });
      }
    })(req, res);
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

export default handler;
