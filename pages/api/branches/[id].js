import { prisma } from '@/lib/db';
import { authMiddleware, requireRole } from '@/lib/auth';

// GET, PUT, or DELETE a specific branch
async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const branch = await prisma.branch.findUnique({
        where: { id },
        include: {
          branchCourses: {
            include: {
              course: true,
            },
          },
          enrollments: {
            include: {
              student: true,
              course: true,
            },
          },
        },
      });

      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found',
        });
      }

      return res.status(200).json({
        success: true,
        branch,
      });
    } catch (error) {
      console.error('Get branch error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch branch',
      });
    }
  }

  if (req.method === 'PUT') {
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

      // Check if branch exists
      const existingBranch = await prisma.branch.findUnique({
        where: { id },
      });

      if (!existingBranch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found',
        });
      }

      // If slug is being changed, check for duplicates
      if (slug && slug !== existingBranch.slug) {
        const slugExists = await prisma.branch.findUnique({
          where: { slug },
        });

        if (slugExists) {
          return res.status(400).json({
            success: false,
            message: 'Branch with this slug already exists',
          });
        }
      }

      const branch = await prisma.branch.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(slug && { slug }),
          ...(address && { address }),
          ...(city && { city }),
          ...(phone && { phone }),
          ...(email && { email }),
          ...(mapUrl !== undefined && { mapUrl }),
          ...(isHeadquarter !== undefined && { isHeadquarter }),
          ...(facilities && { facilities: Array.isArray(facilities) ? facilities : [] }),
          ...(image !== undefined && { image }),
          ...(isActive !== undefined && { isActive }),
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Branch updated successfully',
        branch,
      });
    } catch (error) {
      console.error('Update branch error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update branch',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Check if branch exists
      const existingBranch = await prisma.branch.findUnique({
        where: { id },
      });

      if (!existingBranch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found',
        });
      }

      await prisma.branch.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Branch deleted successfully',
      });
    } catch (error) {
      console.error('Delete branch error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete branch',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}

// Protect with admin authentication
export default requireRole('admin', handler);
