import { serialize } from 'cookie';

export default async function handler(req, res) {
  // Prevent caching of auth responses
  res.setHeader('Cache-Control', 'no-store');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Clear the HttpOnly cookie by setting maxAge to 0
    const cookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Expire immediately
    });
    res.setHeader('Set-Cookie', cookie);
    
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
