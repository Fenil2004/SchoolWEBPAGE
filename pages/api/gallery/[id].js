import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

// GET, PUT, or DELETE a specific gallery image
async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const image = await prisma.galleryImage.findUnique({
        where: { id },
      });

      if (!image) {
        return res.status(404).json({
          success: false,
          message: 'Image not found',
        });
      }

      await prisma.galleryImage.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
      });
    } catch (error) {
      console.error('Delete gallery image error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete image',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

export default requireRole('admin', handler);
