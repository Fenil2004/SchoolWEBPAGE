import { authMiddleware } from '@/lib/auth';
import { upload, handleUploadError } from '@/lib/upload';
import nc from 'next-connect';

// Create handler with next-connect for middleware support
const handler = nc({
  onError: handleUploadError,
  onNoMatch: (req, res) => {
    res.status(405).json({ error: 'Method not allowed' });
  },
});

// Apply authentication middleware - only admins can upload
handler.use(authMiddleware);

// Handle POST request for file upload
handler.post(upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const category = req.query.category || 'general';
    const fileUrl = `/uploads/${category}/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        category: category,
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Disable body parser for this route (needed for file uploads)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
