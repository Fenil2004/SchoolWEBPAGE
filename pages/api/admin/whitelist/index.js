import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { PRIMARY_ADMIN_EMAILS } from '@/lib/whitelist';
import bcrypt from 'bcryptjs';

async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const dbWhitelisted = await prisma.whitelistedEmail.findMany({
        orderBy: { createdAt: 'desc' },
      });

      // Map DB items and inject primary flag
      const emailsList = dbWhitelisted.map((item) => ({
        ...item,
        isPrimary: PRIMARY_ADMIN_EMAILS.includes(item.email.toLowerCase()),
      }));

      // Ensure primary emails are always represented in response
      PRIMARY_ADMIN_EMAILS.forEach((priEmail) => {
        if (!emailsList.some((e) => e.email.toLowerCase() === priEmail.toLowerCase())) {
          emailsList.unshift({
            id: `primary-${priEmail}`,
            email: priEmail,
            addedBy: 'system',
            note: 'Primary System Admin',
            isPrimary: true,
            createdAt: new Date(),
          });
        }
      });

      return res.status(200).json({
        success: true,
        emails: emailsList,
      });
    } catch (error) {
      console.error('Fetch whitelist error:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch whitelisted emails' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { email, note } = req.body;

      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Valid email address is required' });
      }

      const formattedEmail = email.trim().toLowerCase();

      // Check if already in WhitelistedEmail table
      const existing = await prisma.whitelistedEmail.findFirst({
        where: {
          email: { equals: formattedEmail, mode: 'insensitive' }
        }
      });

      if (existing) {
        return res.status(400).json({ success: false, message: 'This email is already whitelisted' });
      }

      // Add to WhitelistedEmail
      const newEntry = await prisma.whitelistedEmail.create({
        data: {
          email: formattedEmail,
          addedBy: req.user?.email || 'admin',
          note: note || 'Whitelisted Admin',
        },
      });

      // Also ensure Admin record exists or is prepared for initial login
      const existingAdmin = await prisma.admin.findFirst({
        where: { email: { equals: formattedEmail, mode: 'insensitive' } }
      });

      if (!existingAdmin) {
        const defaultPassword = await bcrypt.hash(`Admin@${Math.floor(1000 + Math.random() * 9000)}`, 10);
        await prisma.admin.create({
          data: {
            email: formattedEmail,
            name: formattedEmail.split('@')[0],
            password: defaultPassword,
            role: 'admin',
          },
        });
      }

      return res.status(201).json({
        success: true,
        message: `Email ${formattedEmail} has been whitelisted successfully`,
        entry: newEntry,
      });

    } catch (error) {
      console.error('Add whitelist error:', error);
      return res.status(500).json({ success: false, message: error.message || 'Failed to whitelist email' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default requireRole('admin', handler);
