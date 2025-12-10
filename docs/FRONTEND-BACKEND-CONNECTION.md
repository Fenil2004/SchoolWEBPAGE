# Frontend-Backend Connection Guide

## Overview
This document explains how the frontend (Next.js) connects with the backend (API routes + Prisma + PostgreSQL) in the Angels School Career Institute website.

## Architecture

```
Frontend (React/Next.js)
    ↓
API Routes (/pages/api/*)
    ↓
Prisma ORM
    ↓
PostgreSQL Database (Neon)
```

## Connection Flow

### 1. Database Connection Setup

**File: `lib/db.js`**
```javascript
import { PrismaClient } from '@prisma/client';

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
```

- Uses Prisma Client to connect to PostgreSQL database
- Reuses connection in development to prevent connection exhaustion
- Database URL configured in `.env` file as `DATABASE_URL`

### 2. API Routes Structure

**Location: `/pages/api/`**

API routes follow Next.js convention where each file becomes an endpoint:

```
pages/api/
├── admin/
│   └── stats.js          → /api/admin/stats
├── auth/
│   ├── login.js          → /api/auth/login
│   └── signup.js         → /api/auth/signup
├── branches/
│   ├── index.js          → /api/branches
│   └── [id].js           → /api/branches/:id
├── courses/
│   ├── index.js          → /api/courses
│   └── [id].js           → /api/courses/:id
├── gallery/
│   ├── index.js          → /api/gallery
│   └── [id].js           → /api/gallery/:id
├── testimonials/
│   ├── index.js          → /api/testimonials
│   └── [id].js           → /api/testimonials/:id
└── hero.js               → /api/hero
```

### 3. Frontend Data Fetching Patterns

#### Pattern 1: useEffect Hook (Client-Side Fetching)

**Example: Hero Section**
```javascript
// Components/home/HeroSection.jsx
useEffect(() => {
  fetchHeroContent();
}, []);

const fetchHeroContent = async () => {
  try {
    const response = await fetch('/api/hero', {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (response.ok) {
      const data = await response.json();
      setHeroContent(data);
    }
  } catch (error) {
    console.error('Error fetching hero content:', error);
  }
};
```

#### Pattern 2: Direct API Calls (Form Submissions)

**Example: Admin Login (with HttpOnly Cookies)**
```javascript
// Components/pages-content/AdminLogin.jsx
const handleSubmit = async (e) => {
  e.preventDefault(); // CRITICAL: Prevent form reload
  
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store', // Prevent browser caching
    credentials: 'include', // Include HttpOnly cookies
    body: JSON.stringify({ email, password, userType: 'admin' }),
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    router.push('/admin/dashboard');
  }
};
```

#### Pattern 3: Server-Side Rendering (SSR)

**Example: Courses Page**
```javascript
// pages/Courses.jsx
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`);
  const courses = await res.json();
  
  return {
    props: { courses },
  };
}
```

### 4. Authentication Flow

**Login Process:**
1. User submits credentials → `/api/auth/login`
2. API validates credentials using Prisma
3. Returns JWT token + user data
4. Frontend stores in localStorage
5. Subsequent requests include token in headers

**Protected Routes:**
```javascript
// lib/auth.js
export const authMiddleware = async (req, res) => {
  const authToken = req.headers.authorization?.replace('Bearer ', '');
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Verify token and attach user to req
};
```

### 5. Data Mutation Flow

**Example: Adding a Course**

**Frontend:**
```javascript
const response = await fetch('/api/courses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify(courseData)
});
```

**Backend (API Route):**
```javascript
// pages/api/courses/index.js
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

async function handler(req, res) {
  if (req.method === 'POST') {
    return requireRole('admin', async (req, res) => {
      const course = await prisma.course.create({
        data: req.body
      });
      return res.status(201).json(course);
    })(req, res);
  }
}
```

### 6. Real-Time Data Updates

**Admin Dashboard Stats:**
```javascript
// Components/pages-content/AdminDashboard.jsx
useEffect(() => {
  if (user) {
    fetchStats();
  }
}, [user]);

const fetchStats = async () => {
  const response = await fetch('/api/admin/stats');
  const data = await response.json();
  setStats(data);
};
```

**API Implementation:**
```javascript
// pages/api/admin/stats.js
import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  const [coursesCount, galleryCount, testimonialsCount, branchesCount] = 
    await Promise.all([
      prisma.course.count(),
      prisma.galleryImage.count(),
      prisma.testimonial.count(),
      prisma.branch.count()
    ]);
    
  res.status(200).json({
    courses: coursesCount,
    galleryImages: galleryCount,
    testimonials: testimonialsCount,
    branches: branchesCount
  });
}
```

### 7. File Upload Flow

**Image Upload to Cloudinary:**

1. Frontend uploads file with form data
2. API route receives file
3. File is uploaded to Cloudinary
4. Cloudinary URL is stored in database via Prisma

```javascript
// API handles multipart form data
import formidable from 'formidable';
import cloudinary from '@/lib/cloudinary';

const imageUrl = await cloudinary.uploader.upload(file.filepath);
await prisma.galleryImage.create({
  data: { imageUrl: imageUrl.secure_url }
});
```

### 8. Error Handling

**Frontend:**
```javascript
try {
  const response = await fetch('/api/courses');
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
  setError('Failed to load courses');
}
```

**Backend:**
```javascript
try {
  const data = await prisma.course.findMany();
  res.status(200).json(data);
} catch (error) {
  console.error('Database error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
```

## Key Integration Points

### 1. Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="http://localhost:3000"
JWT_SECRET="your-secret-key"
CLOUDINARY_URL="cloudinary://..."
```

### 2. CORS Configuration
Next.js API routes automatically handle CORS for same-origin requests.

### 3. Type Safety
Prisma generates TypeScript types automatically, ensuring type safety across the stack.

### 4. Path Aliases
```javascript
// jsconfig.json or tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Allows imports like:
```javascript
import { prisma } from '@/lib/db';
import HeroSection from '@/Components/home/HeroSection';
```

## Data Flow Example: Courses Page

1. **User visits `/Courses`**
2. **Next.js renders page** → `pages/Courses.jsx`
3. **Page component fetches data** → `useEffect` calls `/api/courses`
4. **API route handles request** → `pages/api/courses/index.js`
5. **Prisma queries database** → `prisma.course.findMany()`
6. **PostgreSQL returns data** → Course records
7. **API sends JSON response** → Array of courses
8. **Frontend updates state** → `setCourses(data)`
9. **React re-renders** → Displays courses

## Best Practices

1. **Always validate input** on both frontend and backend
2. **Use authentication middleware** for protected routes
3. **Handle errors gracefully** with user-friendly messages
4. **Cache static data** to reduce database queries
5. **Use loading states** for better UX during data fetching
6. **Sanitize user input** to prevent XSS and SQL injection
7. **Log errors** for debugging in production
8. **Use environment variables** for sensitive configuration
9. **Implement rate limiting** for API routes
10. **Test API endpoints** independently before integration

## Troubleshooting

### Common Issues:

**1. Database Connection Errors**
- Check DATABASE_URL in .env
- Verify Neon database is running
- Run `npx prisma generate` after schema changes

**2. API Route 404 Errors**
- Verify file structure in pages/api/
- Check file naming conventions
- Restart Next.js dev server

**3. CORS Errors**
- Use relative URLs for API calls (`/api/...` not `http://localhost:3000/api/...`)
- Check API route export default function

**4. Authentication Errors**
- Verify JWT token is stored correctly
- Check token expiration
- Ensure authMiddleware is applied correctly

**5. Data Not Updating**
- Check cache headers in fetch requests
- Verify Prisma schema matches database
- Run `npx prisma db push` if schema changed
