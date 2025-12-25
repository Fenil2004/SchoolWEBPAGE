import { prisma } from '@/lib/db';
import { authMiddleware, requireRole } from '@/lib/auth';

// GET all gallery images or POST new image
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category, full, limit } = req.query;

      const where = {
        ...(category ? { category } : {}),
        // Only get active images when limit is specified (for public pages)
        ...(limit ? { isActive: true } : {}),
      };

      // Parse limit if provided
      const take = limit ? parseInt(limit, 10) : undefined;

      // For admin listing (no limit), don't return full imageUrl to reduce response size
      // For public pages (with limit), always return full imageUrl
      const includeImageUrl = full === 'true' || !!limit;

      const images = await prisma.galleryImage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...(take ? { take } : {}),
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          ...(includeImageUrl ? { imageUrl: true } : {}),
        },
      });

      // If not including imageUrl, add a placeholder
      const processedImages = includeImageUrl ? images : images.map(img => ({
        ...img,
        imageUrl: '/placeholder-image.jpg',
        hasImage: true,
      }));

      return res.status(200).json(processedImages);
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
export default function (req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireRole('admin', handler)(req, res);
}