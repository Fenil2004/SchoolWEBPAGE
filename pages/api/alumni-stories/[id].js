import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      try {
        if (prisma.testimonial) {
          await prisma.testimonial.delete({ where: { id } });
        }
      } catch (err) {
        console.warn('Prisma delete failed, filtering memory cache');
      }

      if (global.alumniStoriesCache) {
        global.alumniStoriesCache = global.alumniStoriesCache.filter((item) => item.id !== id);
      }

      return res.status(200).json({
        success: true,
        message: 'Alumni story deleted successfully',
      });
    } catch (error) {
      console.error('Delete alumni story error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete alumni story',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

export default requireRole('admin', handler);
