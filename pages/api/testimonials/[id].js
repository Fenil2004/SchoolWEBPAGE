import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

// GET, PUT, or DELETE a specific testimonial
async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const testimonial = await prisma.testimonial.findUnique({
        where: { id },
      });

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message: 'Testimonial not found',
        });
      }

      return res.status(200).json({
        success: true,
        testimonial,
      });
    } catch (error) {
      console.error('Get testimonial error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch testimonial',
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, role, course, rating, message, image, isActive } = req.body;

      const testimonial = await prisma.testimonial.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(role && { role }),
          ...(course !== undefined && { course }),
          ...(rating && { rating }),
          ...(message && { message }),
          ...(image !== undefined && { image }),
          ...(isActive !== undefined && { isActive }),
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        testimonial,
      });
    } catch (error) {
      console.error('Update testimonial error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update testimonial',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.testimonial.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      console.error('Delete testimonial error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete testimonial',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

export default requireRole('admin', handler);
