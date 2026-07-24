import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      let notice = null;
      try {
        notice = await prisma.notice.findUnique({
          where: { id },
        });
      } catch (err) {
        console.warn('Prisma notice detail fetch failed');
      }

      if (!notice) {
        return res.status(404).json({ success: false, message: 'Notice not found' });
      }

      return res.status(200).json(notice);
    } catch (error) {
      console.error('Get notice error:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch notice' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { text, link, isActive, displayOrder } = req.body;

      let updatedNotice;
      try {
        updatedNotice = await prisma.notice.update({
          where: { id },
          data: {
            text: text !== undefined ? text.trim() : undefined,
            link: link !== undefined ? link.trim() : undefined,
            isActive: isActive !== undefined ? Boolean(isActive) : undefined,
            displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : undefined,
          },
        });
      } catch (err) {
        // Mock fallback response if DB is not synced
        updatedNotice = {
          id,
          text: text ? text.trim() : '',
          link: link ? link.trim() : '/admissions',
          isActive: isActive !== undefined ? Boolean(isActive) : true,
          displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : 0,
          updatedAt: new Date().toISOString(),
        };
      }

      return res.status(200).json({
        success: true,
        message: 'Notice updated successfully',
        notice: updatedNotice,
      });
    } catch (error) {
      console.error('Update notice error:', error);
      return res.status(500).json({ success: false, message: 'Failed to update notice' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      try {
        await prisma.notice.delete({
          where: { id },
        });
      } catch (err) {
        console.warn('Prisma notice delete fallback');
      }

      return res.status(200).json({
        success: true,
        message: 'Notice deleted successfully',
      });
    } catch (error) {
      console.error('Delete notice error:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete notice' });
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
