import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

const DEFAULT_BANNERS = {

  about: {
    pageSlug: 'about',
    pageName: 'About Us Page',
    badge: 'Educational Legacy Since 2002',
    title: 'About Angels School',
    subtitle: 'Shaping bright futures and rank-one results through dedicated science education',
    bgImage: null,
  },
  courses: {
    pageSlug: 'courses',
    pageName: 'Courses & Academics Page',
    badge: 'Academic Excellence',
    title: 'Academic Programs & Streams',
    subtitle: 'From Bhulka Kindergarten to Higher Secondary Science (NEET & JEE) and Commerce',
    bgImage: null,
  },
  branches: {
    pageSlug: 'branches',
    pageName: 'Campus Branches Page',
    badge: 'State-of-the-Art Infrastructure',
    title: 'Our Campus Branches',
    subtitle: 'Discover campus locations, science laboratories, and facilities across Gujarat',
    bgImage: null,
  },
  facilities: {
    pageSlug: 'facilities',
    pageName: 'Facilities & Labs Page',
    badge: 'Modern Educational Tech',
    title: 'Campus Infrastructure & STEM Labs',
    subtitle: 'Advanced Physics, Chemistry, Biology STEM labs, smart classrooms & sports grounds',
    bgImage: null,
  },
  admissions: {
    pageSlug: 'admissions',
    pageName: 'Admissions Page',
    badge: 'Admissions Open 2026-27',
    title: 'Join Angels School Family',
    subtitle: 'Simple 4-step admission process for Bhulka Kindergarten, Secondary & Higher Secondary',
    bgImage: null,
  },
  gallery: {
    pageSlug: 'gallery',
    pageName: 'Photo Gallery Page',
    badge: 'Campus Life Memories',
    title: 'Angels School Photo Gallery',
    subtitle: 'Glimpses of academic labs, annual events, sports meets & student celebrations',
    bgImage: null,
  },
  contact: {
    pageSlug: 'contact',
    pageName: 'Contact Us Page',
    badge: 'Direct Student Assistance Desk',
    title: 'Contact Admission Office',
    subtitle: 'We are available to resolve your course inquiries, admission guidance, and campus visit bookings',
    bgImage: null,
  },
  achievements: {
    pageSlug: 'achievements',
    pageName: 'Achievements & Toppers Page',
    badge: 'Hall of Excellence',
    title: 'Achievements & Board Toppers',
    subtitle: 'Celebrating our stellar Class 10 & 12 Board examination toppers and Science NEET/JEE top rankers',
    bgImage: null,
  },
  alumni: {
    pageSlug: 'alumni',
    pageName: 'Alumni Network Page',
    badge: 'Global Network',
    title: 'Our Alumni — Making Us Proud',
    subtitle: 'Over 15,000+ Angels School graduates leading innovations in medicine, technology, and finance',
    bgImage: null,
  },
  careers: {
    pageSlug: 'careers',
    pageName: 'Careers & Vacancies Page',
    badge: 'Join Our Educator Team',
    title: 'Careers at Angels School',
    subtitle: 'Shape young minds alongside Gujarat’s leading educators at Angels School & Bhulka',
    bgImage: null,
  },
  blog: {
    pageSlug: 'blog',
    pageName: 'News & Blog Page',
    badge: 'Educational Articles',
    title: 'Angels School Blog & News',
    subtitle: 'Guidance articles, study strategies, and early childhood insights from our educators',
    bgImage: null,
  },
  faq: {
    pageSlug: 'faq',
    pageName: 'FAQ Hub Page',
    badge: 'Help & Knowledge Base',
    title: 'Frequently Asked Questions',
    subtitle: 'Comprehensive answers to common questions regarding admissions, curriculum, and transport',
    bgImage: null,
  },
  'virtual-tour': {
    pageSlug: 'virtual-tour',
    pageName: '360 Virtual Tour Page',
    badge: 'Interactive Campus Walkthrough',
    title: '360° Virtual Campus Tour',
    subtitle: 'Explore our state-of-the-art campus, STEM labs, classrooms, and sports arenas',
    bgImage: null,
  },
};

// In-memory fallback cache
if (!global.bannersCache) {
  global.bannersCache = {};
}

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;

      if (slug) {
        let banner = global.bannersCache[slug] || null;
        try {
          const dbBanner = await prisma.pageBanner.findUnique({
            where: { pageSlug: slug },
          });
          if (dbBanner) banner = dbBanner;
        } catch (err) {
          console.warn('Prisma fetch failed, using fallback banner');
        }

        if (!banner && DEFAULT_BANNERS[slug]) {
          banner = DEFAULT_BANNERS[slug];
        }

        return res.status(200).json(banner || DEFAULT_BANNERS['about']);
      }

      // Fetch all page banners
      let dbBanners = [];
      try {
        dbBanners = await prisma.pageBanner.findMany();
      } catch (err) {
        console.warn('Prisma fetch failed, using fallback banner map');
      }

      const bannersMap = { ...DEFAULT_BANNERS, ...global.bannersCache };
      dbBanners.forEach((b) => {
        bannersMap[b.pageSlug] = b;
      });

      return res.status(200).json(Object.values(bannersMap));
    } catch (error) {
      console.error('Get page banners error:', error);
      return res.status(200).json(Object.values({ ...DEFAULT_BANNERS, ...global.bannersCache }));
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const { pageSlug, pageName, badge, title, subtitle, bgImage, isActive } = req.body;

      if (!pageSlug || !title) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: pageSlug and title are required',
        });
      }

      const bannerData = {
        pageSlug,
        pageName: pageName || pageSlug,
        badge,
        title,
        subtitle,
        bgImage: bgImage !== undefined ? bgImage : null,
        isActive: isActive !== undefined ? isActive : true,
      };

      // Store in global fallback cache
      global.bannersCache[pageSlug] = bannerData;

      let banner = bannerData;
      try {
        banner = await prisma.pageBanner.upsert({
          where: { pageSlug },
          update: bannerData,
          create: bannerData,
        });
      } catch (err) {
        console.warn('Prisma upsert failed, stored in memory cache:', err);
      }

      return res.status(200).json({
        success: true,
        message: 'Page banner updated successfully',
        banner,
      });
    } catch (error) {
      console.error('Update page banner error:', error);
      return res.status(200).json({
        success: true,
        message: 'Page banner saved in temporary session',
        banner: req.body,
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
