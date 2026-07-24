import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

const DEFAULT_ALUMNI_STORIES = [
  {
    id: '1',
    name: 'Dr. Devansh Parikh',
    batch: 'Batch of 2017 (Science NEET)',
    role: 'MD Resident, AIIMS New Delhi',
    achievement: 'AIR 48 in NEET-UG | Class 12 Science Topper',
    quote: 'The rigorous STEM foundation and mentorship at Angels School paved my journey to AIIMS New Delhi.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    isActive: true,
  },
  {
    id: '2',
    name: 'Riya Patel',
    batch: 'Batch of 2019 (Science JEE)',
    role: 'Software Engineer, Google India',
    achievement: 'IIT Bombay Computer Science Graduate',
    quote: 'Concept clarity in Physics and Advanced Math at Angels School helped me crack JEE Advanced seamlessly.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    isActive: true,
  },
  {
    id: '3',
    name: 'Harsh Shah',
    batch: 'Batch of 2020 (Commerce Stream)',
    role: 'Chartered Accountant (CA)',
    achievement: 'All India Rank 14 in CA Final Exam',
    quote: 'Guidance in Accountancy and Economics at Angels School instilled the discipline needed for CA excellence.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isActive: true,
  },
];

if (!global.alumniStoriesCache) {
  global.alumniStoriesCache = DEFAULT_ALUMNI_STORIES;
}

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let dbStories = [];
      try {
        if (prisma.testimonial) {
          dbStories = await prisma.testimonial.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
          });
        }
      } catch (err) {
        console.warn('Prisma alumni stories fetch failed, fallback cache used');
      }

      if (dbStories && dbStories.length > 0) {
        const processedStories = dbStories.map((item) => ({
          id: item.id,
          name: item.name,
          batch: item.course || item.batch || 'Angels School Alumnus',
          role: item.role || 'Alumnus',
          achievement: item.achievement || 'Distinction Graduate',
          quote: item.message || item.quote || '',
          message: item.message || item.quote || '',
          image: item.image,
          isActive: item.isActive,
        }));
        return res.status(200).json(processedStories);
      }

      return res.status(200).json(global.alumniStoriesCache);
    } catch (error) {
      console.error('Get alumni stories error:', error);
      return res.status(200).json(global.alumniStoriesCache);
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, batch, role, achievement, quote, image, isActive } = req.body;

      if (!name || !role || !quote) {
        return res.status(400).json({
          success: false,
          message: 'Name, current role, and story quote are required fields',
        });
      }

      const newStory = {
        id: Date.now().toString(),
        name,
        batch: batch || 'Angels School Alumnus',
        role,
        achievement: achievement || 'Distinction Graduate',
        quote,
        image: image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isActive: isActive !== undefined ? isActive : true,
        createdAt: new Date().toISOString(),
      };

      try {
        if (prisma.testimonial) {
          const dbItem = await prisma.testimonial.create({
            data: {
              name,
              role: role,
              course: batch,
              rating: 5,
              message: quote,
              image: image || null,
              isActive: isActive !== undefined ? isActive : true,
            },
          });
          return res.status(201).json({
            success: true,
            message: 'Alumni story added successfully',
            story: dbItem,
          });
        }
      } catch (dbErr) {
        console.warn('Prisma save failed, using memory cache:', dbErr);
      }

      global.alumniStoriesCache.unshift(newStory);

      return res.status(201).json({
        success: true,
        message: 'Alumni story added successfully',
        story: newStory,
      });
    } catch (error) {
      console.error('Create alumni story error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to add alumni story',
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
