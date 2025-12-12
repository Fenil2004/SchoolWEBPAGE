# Cloudinary Image Storage - Quick Setup

## What Changed?

Your school website now uses **Cloudinary** for image storage instead of local files. This fixes the image loading issues on Netlify.

## Quick Start

### 1. Get Cloudinary Credentials

1. Sign up at [https://cloudinary.com](https://cloudinary.com) (free tier)
2. From your dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

### 2. Add Credentials Locally

Add to `.env.local`:

```env
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Restart dev server: `npm run dev`

### 3. Add Credentials to Netlify

1. Netlify Dashboard → Site Settings → Environment Variables
2. Add the three Cloudinary variables
3. Redeploy your site

### 4. Test Upload

1. Log in to admin panel
2. Upload a test image
3. Check it appears in Cloudinary dashboard
4. Verify it displays on your site

## What's New?

✅ **Cloud Storage**: Images stored on Cloudinary CDN
✅ **Fallback Images**: Placeholder images if upload fails
✅ **Error Handling**: No more broken image icons
✅ **Automatic Optimization**: WebP format, compression

## Files Changed

- `lib/cloudinary.js` - Cloudinary configuration
- `pages/api/upload.js` - Upload to cloud instead of local
- `next.config.js` - Allow Cloudinary domain
- `Components/pages-content/Courses.jsx` - Error handling
- `Components/pages-content/Gallery.jsx` - Error handling
- `public/images/` - Fallback images

## Need Help?

See detailed guide: `docs/IMAGE_MIGRATION_GUIDE.md`

## Benefits

- ✅ Images work on Netlify deployments
- ✅ Images work on mobile devices
- ✅ Fast CDN delivery worldwide
- ✅ Automatic image optimization
- ✅ 25GB free storage/bandwidth
