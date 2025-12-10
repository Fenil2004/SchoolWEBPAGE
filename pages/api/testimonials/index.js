import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

// GET all testimonials or POST new testimonial
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json(testimonials);
    } catch (error) {
      console.error('Get testimonials error:', error);
      return res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, role, course, rating, message, image, isActive } = req.body;

      // Validation
      if (!name || !role || !message) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      const testimonial = await prisma.testimonial.create({
        data: {
          name,
          role,
          course,
          rating: rating || 5,
          message,
          image,
          isActive: isActive !== undefined ? isActive : true,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Testimonial created successfully',
        testimonial,
      });
    } catch (error) {
      console.error('Create testimonial error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create testimonial',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

// Allow GET for public, require admin for POST
export default function(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireRole('admin', handler)(req, res);
}
