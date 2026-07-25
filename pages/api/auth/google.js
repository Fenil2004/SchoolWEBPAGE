import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import { isEmailWhitelisted } from '@/lib/whitelist';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { credential, userInfo } = req.body;

    let email = '';
    let name = '';

    // If ID token credential provided, verify with Google tokeninfo API
    if (credential) {
      const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
      if (!googleRes.ok) {
        return res.status(401).json({ success: false, message: 'Invalid or expired Google authentication token' });
      }
      const tokenPayload = await googleRes.json();
      
      if (!tokenPayload.email) {
        return res.status(400).json({ success: false, message: 'Google account did not return an email address' });
      }

      email = tokenPayload.email.toLowerCase().trim();
      name = tokenPayload.name || email.split('@')[0];
    } else if (userInfo && userInfo.email) {
      email = userInfo.email.toLowerCase().trim();
      name = userInfo.name || email.split('@')[0];
    } else {
      return res.status(400).json({ success: false, message: 'Google credential or email is required' });
    }

    // STRICT EMAIL WHITELIST CHECK
    const whitelisted = await isEmailWhitelisted(email);
    if (!whitelisted) {
      return res.status(403).json({
        success: false,
        message: `Access Denied: Your Google email (${email}) is not whitelisted for Admin access. Please contact an administrator.`,
      });
    }

    // Find or create admin user in database
    let adminUser = await prisma.admin.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' }
      }
    });

    if (!adminUser) {
      const randomPassword = await bcrypt.hash(`GoogleAuth_${Date.now()}_${Math.random()}`, 10);
      adminUser = await prisma.admin.create({
        data: {
          email,
          name,
          password: randomPassword,
          role: 'admin',
        },
      });
    }

    // Generate JWT token
    const token = generateToken({
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    });

    // Set HttpOnly cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    res.setHeader('Set-Cookie', cookie);

    const { password: _, ...userWithoutPassword } = adminUser;

    return res.status(200).json({
      success: true,
      message: 'Google Admin authentication successful',
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Google login API error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error during Google login',
    });
  }
}
