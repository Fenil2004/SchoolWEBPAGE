import prisma from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch the first (and should be only) settings record
      let settings = await prisma.siteSettings.findFirst();

      // If no settings exist, create default settings
      if (!settings) {
        settings = await prisma.siteSettings.create({
          data: {
            siteName: 'Angels School',
            tagline: 'Excellence in Education',
            phone: '+91 8401278780',
            email: 'angelsschoolno1@gmail.com',
            address: 'Angels School Vidyapith Campus, Ghogha Circle, Bhavnagar - 364001, Gujarat, India',
            facebookUrl: '',
            instagramUrl: '',
            twitterUrl: '',
            youtubeUrl: '',
            metaTitle: 'Angels School - NEET, JEE, GUJCET Coaching Classes',
            metaDescription: 'Leading coaching institute for NEET, JEE, GUJCET preparation in Gujarat. Expert faculty, comprehensive study material, and proven results.',
            metaKeywords: 'NEET coaching, JEE coaching, GUJCET coaching, Gujarat coaching classes',
            logo: '/images/logo.png',
            favicon: '/images/favicon.ico',
          },
        });
      }

      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      return res.status(500).json({ error: 'Failed to fetch settings' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const {
        siteName,
        tagline,
        phone,
        email,
        address,
        facebookUrl,
        instagramUrl,
        twitterUrl,
        youtubeUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
        logo,
        favicon,
      } = req.body;

      // Find the first settings record
      let settings = await prisma.siteSettings.findFirst();

      if (!settings) {
        // Create new settings if none exist
        settings = await prisma.siteSettings.create({
          data: {
            siteName: siteName || 'Angels School',
            tagline,
            phone,
            email,
            address,
            facebookUrl,
            instagramUrl,
            twitterUrl,
            youtubeUrl,
            metaTitle,
            metaDescription,
            metaKeywords,
            logo,
            favicon,
          },
        });
      } else {
        // Update existing settings
        settings = await prisma.siteSettings.update({
          where: { id: settings.id },
          data: {
            siteName: siteName || settings.siteName,
            tagline: tagline !== undefined ? tagline : settings.tagline,
            phone: phone !== undefined ? phone : settings.phone,
            email: email !== undefined ? email : settings.email,
            address: address !== undefined ? address : settings.address,
            facebookUrl: facebookUrl !== undefined ? facebookUrl : settings.facebookUrl,
            instagramUrl: instagramUrl !== undefined ? instagramUrl : settings.instagramUrl,
            twitterUrl: twitterUrl !== undefined ? twitterUrl : settings.twitterUrl,
            youtubeUrl: youtubeUrl !== undefined ? youtubeUrl : settings.youtubeUrl,
            metaTitle: metaTitle !== undefined ? metaTitle : settings.metaTitle,
            metaDescription: metaDescription !== undefined ? metaDescription : settings.metaDescription,
            metaKeywords: metaKeywords !== undefined ? metaKeywords : settings.metaKeywords,
            logo: logo !== undefined ? logo : settings.logo,
            favicon: favicon !== undefined ? favicon : settings.favicon,
          },
        });
      }

      return res.status(200).json({ success: true, settings });
    } catch (error) {
      console.error('Error updating settings:', error);
      return res.status(500).json({ error: 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
