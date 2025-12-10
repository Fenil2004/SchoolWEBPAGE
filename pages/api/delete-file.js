import { authMiddleware } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, category } = req.body;

    if (!filename || !category) {
      return res.status(400).json({ error: 'Filename and category are required' });
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', category, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
}

// Export with authentication middleware - only admins can delete
export default authMiddleware(handler, 'ADMIN');
