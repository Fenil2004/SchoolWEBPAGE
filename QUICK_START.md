# 🚀 Quick Start - Get Your Site Working on Netlify

## The Problem You're Facing

Your images work fine locally but fail on Netlify and mobile devices because:
- Netlify can't store uploaded files permanently
- Images are cached locally but not available elsewhere

## The Solution - 3 Simple Steps

### Step 1: Sign Up for Cloudinary (2 minutes)

1. Go to **https://cloudinary.com**
2. Click **"Sign Up Free"**
3. Fill in your details (or sign up with Google/GitHub)
4. Verify your email

### Step 2: Get Your Credentials (1 minute)

After logging in, you'll see your **Dashboard**. Copy these three values:

```
Cloud Name: [shown at the top]
API Key: [shown in the middle]
API Secret: [click "Show" to reveal]
```

### Step 3: Add to Your Project (2 minutes)

#### For Local Development:

1. Open `.env.local` in your project root
2. Add these lines (replace with YOUR actual values):

```env
CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"
```

3. Save the file
4. Restart your dev server:
   ```bash
   # Press Ctrl+C to stop the current server
   npm run dev
   ```

#### For Netlify Deployment:

1. Go to **Netlify Dashboard** → Your Site
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable** and add these three:
   - Key: `CLOUDINARY_CLOUD_NAME` → Value: your_cloud_name
   - Key: `CLOUDINARY_API_KEY` → Value: your_api_key
   - Key: `CLOUDINARY_API_SECRET` → Value: your_api_secret
4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Deploy site**

## Test It Works

1. **Local Test**:
   - Open http://localhost:3000
   - Log in to admin panel
   - Upload a test image
   - Check your Cloudinary dashboard - you should see it there!

2. **Netlify Test**:
   - After deployment completes, visit your live site
   - Upload an image via admin
   - Check it appears on the site
   - Open DevTools → Network tab → No 404 errors!

## What Happens Now?

✅ **All new uploads** go to Cloudinary automatically
✅ **Images work everywhere** - desktop, mobile, Netlify
✅ **Fast loading** - served from global CDN
✅ **Automatic optimization** - WebP format, compression
✅ **Fallback images** - professional placeholders if something fails

## Need Help?

- **Can't find credentials?** Check Cloudinary Dashboard → Account Details
- **Images still not working?** Make sure you restarted the dev server
- **Netlify deployment fails?** Check the build logs for errors
- **Want to migrate old images?** See `docs/IMAGE_MIGRATION_GUIDE.md`

## Free Tier Limits

Cloudinary free tier includes:
- ✅ 25GB storage
- ✅ 25GB bandwidth per month
- ✅ Unlimited transformations

This is more than enough for most school websites!

---

**That's it!** Your images will now work perfectly on Netlify and all devices. 🎉
