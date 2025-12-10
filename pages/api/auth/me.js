import { authMiddleware } from '@/lib/auth';
import { prisma } from '@/lib/db';

async function meHandler(req, res) {
  // Prevent caching of auth responses
  res.setHeader('Cache-Control', 'no-store');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Fetch fresh user data from database
    let user;
    if (userRole === 'admin') {
      user = await prisma.admin.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } else if (userRole === 'student') {
      user = await prisma.student.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          rollNo: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          enrollments: {
            include: {
              course: true,
              branch: true,
            },
          },
        },
      });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Wrap with authentication middleware
export default authMiddleware(meHandler);
