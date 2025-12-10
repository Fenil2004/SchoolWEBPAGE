import prisma from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, branch, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name, email, subject, and message are required' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid email format' 
        });
      }

      // Create inquiry in database
      const inquiry = await prisma.inquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          branch: branch || null,
          subject,
          message,
          status: 'new',
        },
      });

      return res.status(201).json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        inquiry: {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          createdAt: inquiry.createdAt,
        }
      });
    } catch (error) {
      console.error('Error creating inquiry:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to submit your message. Please try again.' 
      });
    }
  }

  if (req.method === 'GET') {
    try {
      // Optional: Admin endpoint to fetch all inquiries
      // Add authentication middleware in production
      const { status } = req.query;

      const where = status ? { status } : {};

      const inquiries = await prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json({ success: true, inquiries });
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch inquiries' 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
