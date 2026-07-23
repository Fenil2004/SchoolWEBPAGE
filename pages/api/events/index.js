import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};


const DEFAULT_EVENTS = [
  {
    id: '1',
    title: 'State Science Fair 1st Prize Winner',
    category: 'Science Fair',
    eventDate: 'December 2025',
    description: 'Angels School STEM team won 1st rank for designing an automated solar hydroponics model.',
    winnerName: 'Aarav Shah & Team (Class 11 Science)',
    image: 'https://images.unsplash.com/photo-1564069114553-74243c4c68e2?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    id: '2',
    title: 'National Mathematics Olympiad Gold Medal',
    category: 'National Olympiad',
    eventDate: 'November 2025',
    description: 'Secured All-India Gold Medal in calculus and problem-solving competition.',
    winnerName: 'Kavya Joshi (Class 10)',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    id: '3',
    title: 'Inter-School Robotics Championship',
    category: 'Hackathon & Tech',
    eventDate: 'October 2025',
    description: 'Autonomous line-follower robot project crowned champion among 40 participating schools.',
    winnerName: 'Rohan Patel (Class 12 Science)',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
];

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let events = [];
      try {
        events = await prisma.eventAchievement.findMany({
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        });
      } catch (err) {
        console.warn('Prisma event fetch failed, using fallback events');
      }

      if (!events || events.length === 0) {
        events = DEFAULT_EVENTS;
      }

      return res.status(200).json(events);
    } catch (error) {
      console.error('Get event achievements error:', error);
      return res.status(500).json({ error: 'Failed to fetch event achievements' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, category, eventDate, description, winnerName, image, isActive } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: 'Title and description are required fields',
        });
      }

      const eventItem = await prisma.eventAchievement.create({
        data: {
          title,
          category: category || 'Event',
          eventDate: eventDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          description,
          winnerName: winnerName || null,
          image: image || null,
          isActive: isActive !== undefined ? isActive : true,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Event achievement created successfully',
        eventItem,
      });
    } catch (error) {
      console.error('Create event achievement error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create event achievement',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

export default function (req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireRole('admin', handler)(req, res);
}
