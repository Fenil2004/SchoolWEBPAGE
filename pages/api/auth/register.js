import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { generateToken, authMiddleware, hasRole } from '@/lib/auth';

async function registerHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Only admins can register new users
    if (!hasRole(req.user, 'admin')) {
      return res.status(403).json({ 
        success: false, 
        message: 'Only admins can register new users' 
      });
    }

    const { email, password, name, userType, phone, rollNo } = req.body;

    // Validation
    if (!email || !password || !name || !userType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, password, name, and userType are required' 
      });
    }

    if (!['admin', 'student'].includes(userType)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user type. Must be admin or student' 
      });
    }

    // For students, rollNo is required
    if (userType === 'student' && !rollNo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Roll number is required for students' 
      });
    }

    // Check if user already exists
    let existingUser;
    if (userType === 'admin') {
      existingUser = await prisma.admin.findUnique({ where: { email } });
    } else {
      existingUser = await prisma.student.findUnique({ where: { email } });
      
      // Also check if rollNo already exists
      if (!existingUser && rollNo) {
        const existingRollNo = await prisma.student.findUnique({ where: { rollNo } });
        if (existingRollNo) {
          return res.status(400).json({ 
            success: false, 
            message: 'Roll number already exists' 
          });
        }
      }
    }

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    let newUser;
    if (userType === 'admin') {
      newUser = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'admin',
        },
      });
    } else {
      newUser = await prisma.student.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone: phone || null,
          rollNo,
          role: 'student',
        },
      });
    }

    // Generate JWT token
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      ...(userType === 'student' && { rollNo: newUser.rollNo }),
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Wrap with authentication middleware
export default authMiddleware(registerHandler);
