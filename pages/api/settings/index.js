import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

// GET or PUT site settings
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get the default settings (there should only be one record)
      let settings = await prisma.siteSettings.findFirst();

      // If no settings exist, create default ones
      if (!settings) {
        settings = await prisma.siteSettings.create({
          data: {
            id: 'default',
            siteName: 'Angels School',
            tagline: 'Where Dreams Take Flight',
          },
        });
      }

      return res.status(200).json({
        success: true,
        settings,
      });
    } catch (error) {
      console.error('Get settings error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch settings',
      });
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

      // Get existing settings or create if not exists
      let settings = await prisma.siteSettings.findFirst();

      if (!settings) {
        settings = await prisma.siteSettings.create({
          data: {
            id: 'default',
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
        settings = await prisma.siteSettings.update({
          where: { id: settings.id },
          data: {
            ...(siteName && { siteName }),
            ...(tagline !== undefined && { tagline }),
            ...(phone !== undefined && { phone }),
            ...(email !== undefined && { email }),
            ...(address !== undefined && { address }),
            ...(facebookUrl !== undefined && { facebookUrl }),
            ...(instagramUrl !== undefined && { instagramUrl }),
            ...(twitterUrl !== undefined && { twitterUrl }),
            ...(youtubeUrl !== undefined && { youtubeUrl }),
            ...(metaTitle !== undefined && { metaTitle }),
            ...(metaDescription !== undefined && { metaDescription }),
            ...(metaKeywords !== undefined && { metaKeywords }),
            ...(logo !== undefined && { logo }),
            ...(favicon !== undefined && { favicon }),
          },
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Settings updated successfully',
        settings,
      });
    } catch (error) {
      console.error('Update settings error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update settings',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

// Allow GET for public, require admin for PUT
export default function(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireRole('admin', handler)(req, res);
}
