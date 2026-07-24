import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

// GET, PUT, or DELETE hero content
async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, subtitle, ctaText, ctaLink, videoUrl, imageUrl, displayOrder, isActive } = req.body;

      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (subtitle !== undefined) updateData.subtitle = subtitle || '';
      if (ctaText !== undefined) updateData.ctaText = ctaText || 'Enroll Now';
      if (ctaLink !== undefined) updateData.ctaLink = ctaLink || '/admissions';
      if (videoUrl !== undefined) updateData.videoUrl = videoUrl || null;
      if (imageUrl !== undefined) updateData.imageUrl = imageUrl || null;
      if (displayOrder !== undefined) updateData.displayOrder = parseInt(displayOrder);
      if (isActive !== undefined) updateData.isActive = isActive;

      const heroContent = await prisma.heroContent.update({
        where: { id },
        data: updateData,
      });

      return res.status(200).json({
        success: true,
        message: 'Hero content updated successfully',
        heroContent,
      });
    } catch (error) {
      console.error('Update hero content error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to update hero content',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.heroContent.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Hero content deleted successfully',
      });
    } catch (error) {
      console.error('Delete hero content error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete hero content',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

export default requireRole('admin', handler);
