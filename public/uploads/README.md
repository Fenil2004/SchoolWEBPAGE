# Uploads Directory

This directory contains all images uploaded by admins through the admin dashboard.

## Structure

```
uploads/
├── gallery/        # Gallery images
├── hero/          # Hero section backgrounds
├── testimonials/  # Testimonial photos
├── courses/       # Course thumbnails
└── branches/      # Branch photos
```

## Guidelines

- Maximum file size: 5MB per image
- Supported formats: JPG, PNG, WebP, GIF
- Recommended dimensions:
  - Gallery: 1200x800px
  - Hero: 1920x1080px
  - Testimonials: 400x400px
  - Courses: 800x600px
  - Branches: 1200x800px

## Security

- All uploads should be validated server-side
- Sanitize file names before saving
- Check MIME types to prevent malicious files
- Store metadata in database

## Access

Images in this directory are publicly accessible at:
`/uploads/{category}/{filename}`

Example: `/uploads/gallery/campus-2024.jpg`
