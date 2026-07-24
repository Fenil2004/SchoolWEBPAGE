import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

const DEFAULT_ACHIEVERS = [
  {
    id: '1',
    name: 'Priya Sharma',
    exam: 'Class 12 Science (NEET)',
    score: '695 / 720 (AIR 142)',
    stream: 'Science (NEET)',
    category: 'neet-jee',
    quote: 'The integrated Science faculty & test series at Angels School gave me complete confidence.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    tag: 'NEET Star',
    isActive: true,
  },
  {
    id: '2',
    name: 'Rohan Patel',
    exam: 'Class 12 Science (JEE Advanced)',
    score: '99.85 Percentile',
    stream: 'Science (JEE)',
    category: 'neet-jee',
    quote: 'Concept clarity in Physics & Math prepared me for both Board exams and JEE Advanced.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    tag: 'JEE Ranker',
    isActive: true,
  },
  {
    id: '3',
    name: 'Ananya Mehta',
    exam: 'Class 12 Commerce Board',
    score: '98.4%',
    stream: 'Commerce',
    category: 'board',
    quote: 'Teachers at Angels School made Accountancy & Economics intuitive and enjoyable.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    tag: 'Commerce Topper',
    isActive: true,
  },
  {
    id: '4',
    name: 'Kavya Joshi',
    exam: 'Class 10 Board Exam',
    score: '99.1%',
    stream: 'Secondary',
    category: 'board',
    quote: 'Studying at Angels School since Class 1 helped build an unbreakable foundation in STEM.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    tag: 'Class 10 Topper',
    isActive: true,
  },
];

// Fallback in-memory store if DB model is not migrated yet
if (!global.achieversCache) {
  global.achieversCache = DEFAULT_ACHIEVERS;
}

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let dbAchievers = [];
      try {
        if (prisma.achiever) {
          dbAchievers = await prisma.achiever.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
          });
        }
      } catch (err) {
        console.warn('Prisma achiever fetch failed, fallback cache used');
      }

      if (dbAchievers && dbAchievers.length > 0) {
        return res.status(200).json(dbAchievers);
      }

      return res.status(200).json(global.achieversCache);
    } catch (error) {
      console.error('Get achievers error:', error);
      return res.status(200).json(global.achieversCache);
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, exam, score, stream, category, quote, tag, image, isActive } = req.body;

      if (!name || !exam || !score) {
        return res.status(400).json({
          success: false,
          message: 'Name, exam, and score are required fields',
        });
      }

      const newAchiever = {
        id: Date.now().toString(),
        name,
        exam,
        score,
        stream: stream || 'Science',
        category: category || 'neet-jee',
        quote: quote || '',
        tag: tag || 'Top Ranker',
        image: image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isActive: isActive !== undefined ? isActive : true,
        createdAt: new Date().toISOString(),
      };

      try {
        if (prisma.achiever) {
          const dbItem = await prisma.achiever.create({
            data: {
              name,
              exam,
              score,
              stream: stream || 'Science',
              category: category || 'neet-jee',
              quote: quote || '',
              tag: tag || 'Top Ranker',
              image: image || null,
              isActive: isActive !== undefined ? isActive : true,
            },
          });
          return res.status(201).json({
            success: true,
            message: 'Achiever added successfully to Hall of Fame',
            achiever: dbItem,
          });
        }
      } catch (dbErr) {
        console.warn('Prisma save failed, using memory cache:', dbErr);
      }

      global.achieversCache.unshift(newAchiever);

      return res.status(201).json({
        success: true,
        message: 'Achiever added successfully to Hall of Fame',
        achiever: newAchiever,
      });
    } catch (error) {
      console.error('Create achiever error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to add achiever',
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
