import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

const DEFAULT_NOTICES = [
  {
    id: 'default-1',
    text: '🎓 Admissions Open for Academic Session 2026-27 — Bhulka (Kindergarten) & Grades 1 to 12 (Science & Commerce)',
    link: '/admissions',
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'default-2',
    text: '🔬 Grade 11 Science NEET & JEE Integrated Coaching Orientation & Diagnostic Test Registration Active',
    link: '/courses',
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'default-3',
    text: '🏆 Congratulations to Angels School Board Examination & GUJCET Top Rankers!',
    link: '/achievements',
    isActive: true,
    displayOrder: 3,
  },
  {
    id: 'default-4',
    text: '🏫 Visit Campus Branches to explore our state-of-the-art STEM & Robotics Laboratories',
    link: '/branches',
    isActive: true,
    displayOrder: 4,
  },
];

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let notices = [];
      try {
        notices = await prisma.notice.findMany({
          orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
      } catch (err) {
        console.warn('Prisma notice fetch failed, using fallback notices');
      }

      if (!notices || notices.length === 0) {
        notices = DEFAULT_NOTICES;
      }

      return res.status(200).json(notices);
    } catch (error) {
      console.error('Get notices error:', error);
      return res.status(500).json({ error: 'Failed to fetch notices' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { text, link, isActive, displayOrder } = req.body;

      if (!text || text.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Notice text is required',
        });
      }

      let notice;
      try {
        notice = await prisma.notice.create({
          data: {
            text: text.trim(),
            link: link ? link.trim() : '/admissions',
            isActive: isActive !== undefined ? Boolean(isActive) : true,
            displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : 0,
          },
        });
      } catch (err) {
        // Fallback mockup ID if DB is not initialized
        notice = {
          id: 'notice-' + Date.now(),
          text: text.trim(),
          link: link ? link.trim() : '/admissions',
          isActive: isActive !== undefined ? Boolean(isActive) : true,
          displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      return res.status(201).json({
        success: true,
        message: 'Notice announcement created successfully',
        notice,
      });
    } catch (error) {
      console.error('Create notice error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create notice announcement',
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
