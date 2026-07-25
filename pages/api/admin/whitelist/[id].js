import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { PRIMARY_ADMIN_EMAILS } from '@/lib/whitelist';

async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Find entry
    const entry = await prisma.whitelistedEmail.findUnique({
      where: { id },
    });

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Whitelisted email entry not found' });
    }

    // Check if primary admin email
    if (PRIMARY_ADMIN_EMAILS.includes(entry.email.toLowerCase())) {
      return res.status(403).json({
        success: false,
        message: 'Primary system admin emails cannot be removed from the whitelist.',
      });
    }

    // Delete entry
    await prisma.whitelistedEmail.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: `Email ${entry.email} removed from whitelist`,
    });
  } catch (error) {
    console.error('Delete whitelist error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to remove whitelisted email',
    });
  }
}

export default requireRole('admin', handler);
