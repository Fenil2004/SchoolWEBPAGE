# Image Migration Guide - Cloudinary Setup

## Overview

This guide will help you migrate from local file uploads to Cloudinary cloud storage. This fixes the image loading issues on Netlify deployments.

## Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click **Sign Up** (free tier includes 25GB storage and 25GB bandwidth/month)
3. Complete the registration process
4. After login, you'll see your **Dashboard**

## Step 2: Get Your Cloudinary Credentials

From your Cloudinary Dashboard, you'll find:

- **Cloud Name**: Your unique cloud identifier
- **API Key**: Your API key
- **API Secret**: Your API secret (click "Show" to reveal)

## Step 3: Add Credentials to Environment Variables

### Local Development

1. Open `.env.local` in your project root
2. Add the following lines (replace with your actual credentials):

```env
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

3. Save the file
4. Restart your development server (`npm run dev`)

### Netlify Deployment

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add the following variables:
   - `CLOUDINARY_CLOUD_NAME` = your_cloud_name
   - `CLOUDINARY_API_KEY` = your_api_key
   - `CLOUDINARY_API_SECRET` = your_api_secret
5. Click **Save**
6. Trigger a new deployment

## Step 4: Test Upload Functionality

1. Start your development server: `npm run dev`
2. Log in to your admin panel
3. Try uploading a new image (course, gallery, or branch)
4. Check your Cloudinary dashboard - you should see the image in the `school/` folder
5. Verify the image displays correctly on your site

## Step 5: Migrate Existing Images (Optional)

If you have existing images in `public/uploads/`, you need to:

### Option A: Manual Upload via Admin Panel

1. Download all images from `public/uploads/` to your local machine
2. Re-upload each image through the admin panel
3. The new Cloudinary URLs will automatically be saved to the database

### Option B: Bulk Upload via Cloudinary Dashboard

1. Go to Cloudinary Dashboard → **Media Library**
2. Click **Upload** → **Upload multiple**
3. Select all your images
4. Choose folder structure: `school/gallery`, `school/courses`, etc.
5. After upload, manually update database records with new URLs

### Option C: Programmatic Migration (Advanced)

Create a migration script to upload all local images to Cloudinary:

```javascript
// scripts/migrate-images.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrateImages() {
  const uploadsDir = path.join(__dirname, '../public/uploads');
  const categories = ['gallery', 'courses', 'branches', 'testimonials', 'hero'];

  for (const category of categories) {
    const categoryPath = path.join(uploadsDir, category);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `school/${category}`,
        });
        console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);
        // TODO: Update database record with new URL
      } catch (error) {
        console.error(`❌ Failed to upload ${file}:`, error.message);
      }
    }
  }
}

migrateImages();
```

Run with: `node scripts/migrate-images.js`

## Step 6: Update Database URLs

After migrating images, update your database records:

```sql
-- Example: Update course images
UPDATE Course 
SET image = 'https://res.cloudinary.com/your-cloud/image/upload/v123/school/courses/image.jpg'
WHERE image LIKE '/uploads/courses/%';

-- Example: Update gallery images
UPDATE GalleryImage 
SET imageUrl = 'https://res.cloudinary.com/your-cloud/image/upload/v123/school/gallery/image.jpg'
WHERE imageUrl LIKE '/uploads/gallery/%';
```

## Step 7: Verify on Netlify

1. Deploy your updated code to Netlify
2. Ensure environment variables are set (Step 3)
3. Test all pages with images:
   - Courses page
   - Gallery page
   - Branches page
4. Open DevTools → Network tab
5. Verify all images load with 200 status (no 404 errors)
6. Test on mobile device or mobile emulator

## Troubleshooting

### Images Not Uploading

**Error**: "Failed to upload to Cloudinary"

**Solution**:
- Check that environment variables are set correctly
- Verify API credentials in Cloudinary dashboard
- Ensure file size is under 5MB
- Check Cloudinary account quota (free tier limits)

### Images Not Displaying

**Error**: Images show fallback placeholder

**Solution**:
- Check browser console for errors
- Verify image URL in database is correct Cloudinary URL
- Ensure `res.cloudinary.com` is in `next.config.js` domains
- Clear browser cache and reload

### 401 Unauthorized Error

**Solution**:
- Verify you're logged in as admin
- Check JWT token is valid
- Ensure `authMiddleware` is working correctly

### Images Work Locally But Not on Netlify

**Solution**:
- Verify environment variables are set in Netlify dashboard
- Trigger a new deployment after adding env vars
- Check Netlify build logs for errors
- Ensure Next.js build completed successfully

## Fallback Images

The system now includes fallback images that display when an image fails to load:

- `/images/course-fallback.jpg` - For course cards
- `/images/gallery-fallback.jpg` - For gallery items
- `/images/branch-fallback.jpg` - For branch images

These ensure your site never shows broken image icons.

## Benefits of Cloudinary

✅ **Persistent Storage**: Images survive deployments
✅ **Global CDN**: Fast image delivery worldwide
✅ **Automatic Optimization**: WebP format, compression
✅ **Transformations**: Resize, crop on-the-fly
✅ **Backup**: Images stored safely in the cloud

## Next Steps

After successful migration:

1. ✅ Test all image functionality
2. ✅ Verify on mobile devices
3. ✅ Remove old `public/uploads/` folder (optional)
4. ✅ Update documentation for future admins
5. ✅ Monitor Cloudinary usage in dashboard

## Support

If you encounter issues:
- Check Cloudinary documentation: https://cloudinary.com/documentation
- Review Netlify build logs
- Check browser console for errors
- Verify all environment variables are set correctly
