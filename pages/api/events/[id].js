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

  if (req.method === 'GET') {
    try {
      let eventItem = null;
      try {
        eventItem = await prisma.eventAchievement.findUnique({
          where: { id: id },
        });
      } catch (err) {
        console.warn('Prisma event lookup failed');
      }

      if (!eventItem) {
        return res.status(404).json({ success: false, message: 'Event achievement not found' });
      }

      return res.status(200).json(eventItem);
    } catch (error) {
      console.error('Get event achievement by id error:', error);
      return res.status(500).json({ error: 'Failed to fetch event achievement' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, category, eventDate, description, winnerName, image, isActive } = req.body;

      const eventItem = await prisma.eventAchievement.update({
        where: { id: id },
        data: {
          title,
          category,
          eventDate,
          description,
          winnerName,
          image,
          isActive,
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Event achievement updated successfully',
        eventItem,
      });
    } catch (error) {
      console.error('Update event achievement error:', error);
      return res.status(500).json({ success: false, message: 'Failed to update event achievement' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.eventAchievement.delete({
        where: { id: id },
      });

      return res.status(200).json({
        success: true,
        message: 'Event achievement deleted successfully',
      });
    } catch (error) {
      console.error('Delete event achievement error:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete event achievement' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default function (req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireRole('admin', handler)(req, res);
}
