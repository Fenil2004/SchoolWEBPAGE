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
    content: 'Preparing for competitive entrance exams like NEET and JEE requires a balanced approach between mastering NCERT board fundamentals and solving time-bound high-difficulty problems. Our senior physics and chemistry faculty share key advice: 1. Maintain daily topic revision. 2. Solve past 10 years exam papers. 3. Participate in OMR CBT mock tests at campus.',
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
    content: 'Early childhood development at Bhulka Kindergarten focuses on multisensory playrooms, phonics storytelling, and motor skill games. Research proves that tactile play accelerates problem-solving and emotional regulation in kids aged 2.5 to 6.',
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
    content: 'Higher Secondary Commerce at Angels School offers solid grounding in Accountancy, Business Administration, and Economics. Students receive structured guidance for CA Foundation, CPT, CS, and corporate finance careers.',
    isFeatured: true,
    isActive: true,
  },
];

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let blogs = [];
      try {
        blogs = await prisma.blogPost.findMany({
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        });
      } catch (err) {
        console.warn('Prisma blog fetch failed, using fallback blogs');
      }

      if (!blogs || blogs.length === 0) {
        blogs = DEFAULT_BLOGS;
      }

      return res.status(200).json(blogs);
    } catch (error) {
      console.error('Get blogs error:', error);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, slug, category, author, date, image, summary, content, isFeatured, isActive } = req.body;

      if (!title || !summary) {
        return res.status(400).json({
          success: false,
          message: 'Title and summary are required fields',
        });
      }

      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const blog = await prisma.blogPost.create({
        data: {
          title,
          slug: generatedSlug,
          category: category || 'General',
          author: author || 'Angels School',
          date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          image: image || null,
          summary,
          content: content || summary,
          isFeatured: isFeatured !== undefined ? isFeatured : false,
          isActive: isActive !== undefined ? isActive : true,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Blog post created successfully',
        blog,
      });
    } catch (error) {
      console.error('Create blog error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create blog post',
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
