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
      let blog = null;
      try {
        blog = await prisma.blogPost.findFirst({
          where: { OR: [{ id: id }, { slug: id }] },
        });
      } catch (err) {
        console.warn('Prisma blog lookup failed');
      }

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog article not found' });
      }

      return res.status(200).json(blog);
    } catch (error) {
      console.error('Get blog by id error:', error);
      return res.status(500).json({ error: 'Failed to fetch blog article' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, slug, category, author, date, image, summary, content, isFeatured, isActive } = req.body;

      const blog = await prisma.blogPost.update({
        where: { id: id },
        data: {
          title,
          slug,
          category,
          author,
          date,
          image,
          summary,
          content,
          isFeatured,
          isActive,
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Blog article updated successfully',
        blog,
      });
    } catch (error) {
      console.error('Update blog error:', error);
      return res.status(500).json({ success: false, message: 'Failed to update blog article' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.blogPost.delete({
        where: { id: id },
      });

      return res.status(200).json({
        success: true,
        message: 'Blog article deleted successfully',
      });
    } catch (error) {
      console.error('Delete blog error:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete blog article' });
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
