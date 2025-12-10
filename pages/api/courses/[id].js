import { prisma } from '@/lib/db';
import { authMiddleware, requireRole } from '@/lib/auth';

// GET, PUT, or DELETE a specific course
async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
        include: {
          branchCourses: {
            include: {
              branch: true,
            },
          },
          enrollments: {
            include: {
              student: true,
            },
          },
        },
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      return res.status(200).json({
        success: true,
        course,
      });
    } catch (error) {
      console.error('Get course error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch course',
      });
    }
  }

  if (req.method === 'PUT') {
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

      // Check if course exists
      const existingCourse = await prisma.course.findUnique({
        where: { id },
      });

      if (!existingCourse) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      // If slug is being changed, check for duplicates
      if (slug && slug !== existingCourse.slug) {
        const slugExists = await prisma.course.findUnique({
          where: { slug },
        });

        if (slugExists) {
          return res.status(400).json({
            success: false,
            message: 'Course with this slug already exists',
          });
        }
      }

      const course = await prisma.course.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(slug && { slug }),
          ...(description && { description }),
          ...(category && { category }),
          ...(price && { price: parseFloat(price) }),
          ...(duration && { duration }),
          ...(features && { features: Array.isArray(features) ? features : [] }),
          ...(syllabus !== undefined && { syllabus }),
          ...(image !== undefined && { image }),
          ...(isActive !== undefined && { isActive }),
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        course,
      });
    } catch (error) {
      console.error('Update course error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update course',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Check if course exists
      const existingCourse = await prisma.course.findUnique({
        where: { id },
      });

      if (!existingCourse) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      await prisma.course.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Course deleted successfully',
      });
    } catch (error) {
      console.error('Delete course error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete course',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

// Protect with admin authentication
export default requireRole('admin', handler);
