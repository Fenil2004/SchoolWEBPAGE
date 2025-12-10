import { prisma } from '@/lib/db';
import { authMiddleware, requireRole } from '@/lib/auth';

// GET all gallery images or POST new image
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      
      const where = category ? { category } : {};
      
      const images = await prisma.galleryImage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json(images);
    } catch (error) {
      console.error('Get gallery error:', error);
      return res.status(500).json({ error: 'Failed to fetch gallery images' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description, imageUrl, category, isActive } = req.body;

      // Validation
      if (!title || !imageUrl || !category) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      const image = await prisma.galleryImage.create({
        data: {
          title,
          description,
          imageUrl,
          category,
          isActive: isActive !== undefined ? isActive : true,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Image added to gallery successfully',
        image,
      });
    } catch (error) {
      console.error('Create gallery image error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to add image to gallery',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

// Protect with admin authentication for POST, allow GET for public
export default function(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireRole('admin', handler)(req, res);
}