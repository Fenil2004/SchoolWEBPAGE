import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};


const DEFAULT_BLOGS = [
  {
    id: '1',
    title: '10 Proven Preparation Strategies for NEET & JEE Aspirants',
    slug: '10-proven-preparation-strategies-neet-jee',
    category: 'Science & Entrance',
    author: 'Academic Cell',
    date: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    summary: 'Expert insights on balancing Class 12 Board syllabus with entrance mock test practice.',
    content: 'Preparing for competitive entrance exams like NEET and JEE requires a balanced approach between mastering NCERT board fundamentals and solving time-bound high-difficulty problems. Our senior physics and chemistry faculty share key advice:\n\n1. Maintain daily topic revision and short formula notes.\n2. Solve past 10 years exam question papers under timed conditions.\n3. Participate in OMR Computer Based Mock Tests conducted regularly at Angels School campus.',
    isFeatured: true,
    isActive: true,
  },
  {
    id: '2',
    title: 'Importance of Sensory & Play-Based Learning in Early Childhood',
    slug: 'sensory-play-based-learning-early-childhood',
    category: 'Bhulka Kindergarten',
    author: 'Bhulka Pre-Primary Team',
    date: 'Jan 10, 2026',
    image: 'https://images.unsplash.com/photo-1587691592099-24045742c427?auto=format&fit=crop&w=600&q=80',
    summary: 'How tactile activities and phonics build early literacy and cognitive confidence.',
    content: 'Early childhood development at Bhulka Kindergarten focuses on multisensory playrooms, phonics storytelling, and interactive motor skill games. Research proves that tactile play accelerates problem-solving, social empathy, and emotional regulation in children aged 2.5 to 6 years.',
    isFeatured: true,
    isActive: true,
  },
  {
    id: '3',
    title: 'Career Opportunities After Higher Secondary Commerce',
    slug: 'career-opportunities-higher-secondary-commerce',
    category: 'Commerce Stream',
    author: 'Commerce Faculty',
    date: 'Jan 05, 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    summary: 'Navigating Chartered Accountancy (CA), BBA/MBA, Finance, and Fintech pathways.',
    content: 'Higher Secondary Commerce at Angels School offers a solid grounding in Accountancy, Business Studies, and Microeconomics. Students receive structured mentoring and coaching for CA Foundation, CPT, CS entrance, and corporate finance career pathways.',
    isFeatured: true,
    isActive: true,
  },
];

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
        blog = DEFAULT_BLOGS.find((b) => b.id === id || b.slug === id);
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
