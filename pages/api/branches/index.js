import { prisma } from '@/lib/db';
import { authMiddleware, requireRole } from '@/lib/auth';

// Increase body size limit for image uploads (base64 encoded)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// GET all branches or POST new branch
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const branches = await prisma.branch.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          branchCourses: {
            include: {
              course: true,
            },
          },
        },
      });

      return res.status(200).json(branches);
    } catch (error) {
      console.error('Get branches error:', error);
      return res.status(500).json({ error: 'Failed to fetch branches' });
    }
  }

  if (req.method === 'POST') {
    // Protect POST with admin authentication
    return requireRole('admin', async (req, res) => {
      try {
        const {
          name,
          slug,
          address,
          city,
          phone,
          email,
          mapUrl,
          isHeadquarter,
          facilities,
          image,
          isActive,
        } = req.body;

        // Validation
        if (!name || !slug || !address || !city || !phone || !email) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields',
          });
        }

        // Check if slug already exists
        const existingBranch = await prisma.branch.findUnique({
          where: { slug },
        });

        if (existingBranch) {
          return res.status(400).json({
            success: false,
            message: 'Branch with this slug already exists',
          });
        }

        const branch = await prisma.branch.create({
          data: {
            name,
            slug,
            address,
            city,
            phone,
            email,
            mapUrl,
            isHeadquarter: isHeadquarter || false,
            facilities: Array.isArray(facilities) ? facilities : [],
            image,
            isActive: isActive !== undefined ? isActive : true,
          },
        });

        return res.status(201).json({
          success: true,
          message: 'Branch created successfully',
          branch,
        });
      } catch (error) {
        console.error('Create branch error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to create branch',
        });
      }
    })(req, res);
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

export default handler;
