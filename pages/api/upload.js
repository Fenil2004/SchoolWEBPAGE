import { authMiddleware } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parser for this route (needed for file uploads)
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check authentication
  try {
    await authMiddleware(req, res, async () => {
      // Parse the multipart form data
      const form = formidable({
        maxFileSize: 5 * 1024 * 1024, // 5MB max file size
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          return res.status(500).json({ error: 'Failed to parse upload' });
        }

        try {
          // Get the uploaded file
          const file = files.file;
          if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }

          // Get the file path (formidable v3 uses filepath, v2 uses path)
          const filePath = file.filepath || file.path;

          // Get category from query or default to 'general'
          const category = req.query.category || fields.category || 'general';

          // Upload to Cloudinary
          const uploadResult = await uploadToCloudinary(filePath, category);

          // Clean up temporary file
          try {
            fs.unlinkSync(filePath);
          } catch (cleanupError) {
            console.warn('Failed to delete temp file:', cleanupError);
          }

          // Return success response
          return res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            file: {
              filename: file.originalFilename || file.name,
              mimetype: file.mimetype,
              size: file.size,
              url: uploadResult.url,
              publicId: uploadResult.publicId,
              category: category,
              width: uploadResult.width,
              height: uploadResult.height,
            }
          });
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          return res.status(500).json({
            error: 'Failed to upload file',
            details: uploadError.message
          });
        }
      });
    });
  } catch (authError) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export default handler;

