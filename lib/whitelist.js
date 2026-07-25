import { prisma } from '@/lib/db';

export const PRIMARY_ADMIN_EMAILS = [
  'fenil1723@gmail.com',
  'glpatel81@angelsschooldeesa.org',
  'fenil@angelsschooldeesa.org'
];

/**
 * Checks whether an email address is authorized for Admin access.
 * @param {string} rawEmail - Email address to check
 * @returns {Promise<boolean>} True if whitelisted or active admin, false otherwise
 */
export async function isEmailWhitelisted(rawEmail) {
  if (!rawEmail || typeof rawEmail !== 'string') return false;
  
  const email = rawEmail.trim().toLowerCase();

  // 1. Check primary admin list
  if (PRIMARY_ADMIN_EMAILS.includes(email)) {
    return true;
  }

  try {
    // 2. Check WhitelistedEmail database table
    const whitelisted = await prisma.whitelistedEmail.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (whitelisted) {
      return true;
    }

    // 3. Check existing Admin database table
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (existingAdmin) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking email whitelist:', error);
    // If DB check fails, fallback to primary admin check
    return PRIMARY_ADMIN_EMAILS.includes(email);
  }
}
