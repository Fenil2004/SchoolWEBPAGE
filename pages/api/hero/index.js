import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

// GET all hero content or POST new hero content
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const heroContent = await prisma.heroContent.findMany({
        orderBy: { displayOrder: 'asc' },
      });

      return res.status(200).json(heroContent);
    } catch (error) {
      console.error('Get hero content error:', error);
      return res.status(500).json({ error: 'Failed to fetch hero content' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, subtitle, ctaText, ctaLink, imageUrl, displayOrder, isActive } = req.body;

      // Validation
      if (!title || !subtitle || !ctaText || !ctaLink) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      const heroContent = await prisma.heroContent.create({
        data: {
          title,
          subtitle,
          ctaText,
          ctaLink,
          imageUrl,
          displayOrder: displayOrder || 0,
          isActive: isActive !== undefined ? isActive : true,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Hero content created successfully',
        heroContent,
      });
    } catch (error) {
      console.error('Create hero content error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create hero content',
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
