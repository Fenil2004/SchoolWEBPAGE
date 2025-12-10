# Backend Setup Guide

## Overview
This document explains how the backend was created for the Angels School Career Institute website using Next.js API Routes, Prisma ORM, and PostgreSQL.

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Next.js 14 (API Routes)
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon)
- **Authentication:** JWT + bcrypt + HttpOnly Cookies
- **File Storage:** Cloudinary
- **Validation:** Built-in JavaScript validation
- **Security:** CSRF protection via SameSite cookies, XSS protection via HttpOnly

## Step-by-Step Backend Creation

### 1. Initial Setup

**Install Dependencies:**
```bash
npm install @prisma/client prisma
npm install bcryptjs jsonwebtoken
npm install formidable cloudinary
```

**Initialize Prisma:**
```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma` - Database schema definition
- `.env` - Environment variables file

### 2. Database Schema Design

**File: `prisma/schema.prisma`**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

**Models Created:**

1. **Admin Model** - Admin user authentication
```prisma
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed with bcrypt
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("admins")
}
```

2. **Student Model** - Student user accounts
```prisma
model Student {
  id          String       @id @default(cuid())
  email       String       @unique
  password    String
  name        String
  phone       String?
  rollNo      String       @unique
  role        String       @default("student")
  enrollments Enrollment[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  @@map("students")
}
```

3. **Course Model** - Course management
```prisma
model Course {
  id           String       @id @default(cuid())
  name         String
  slug         String       @unique
  description  String       @db.Text
  category     String       // NEET, JEE, GUJCET, Foundation
  price        Float
  duration     String
  features     String[]
  syllabus     String?      @db.Text
  image        String?
  isActive     Boolean      @default(true)
  enrollments  Enrollment[]
  branchCourses BranchCourse[]
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  @@map("courses")
}
```

4. **Branch Model** - Branch locations
```prisma
model Branch {
  id            String         @id @default(cuid())
  name          String
  slug          String         @unique
  address       String         @db.Text
  city          String
  phone         String
  email         String
  mapUrl        String?
  isHeadquarter Boolean        @default(false)
  facilities    String[]
  image         String?
  isActive      Boolean        @default(true)
  enrollments   Enrollment[]
  branchCourses BranchCourse[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  @@map("branches")
}
```

5. **GalleryImage Model** - Gallery management
```prisma
model GalleryImage {
  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  imageUrl    String
  category    String   // events, facilities, achievements
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@map("gallery_images")
}
```

6. **Testimonial Model** - Student testimonials
```prisma
model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String   // Student, Parent, Alumni
  course    String?
  rating    Int      @default(5)
  message   String   @db.Text
  image     String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("testimonials")
}
```

7. **HeroContent Model** - Dynamic hero section
```prisma
model HeroContent {
  id          String   @id @default(cuid())
  title       String
  subtitle    String   @db.Text
  ctaText     String
  ctaLink     String
  imageUrl    String?
  videoUrl    String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@map("hero_content")
}
```

### 3. Database Migration

**Push Schema to Database:**
```bash
npx prisma db push
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

**View Database in Prisma Studio:**
```bash
npx prisma studio
```

### 4. Prisma Client Setup

**File: `lib/db.js`**

```javascript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

**Why this pattern?**
- Prevents multiple Prisma Client instances in development
- Avoids connection pool exhaustion
- Enables hot-reload without reconnecting

### 5. Authentication System

**File: `lib/auth.js`**

**Password Hashing:**
```javascript
import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
```

**JWT Token Generation:**
```javascript
import jwt from 'jsonwebtoken';

export function generateToken(userId, role) {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
```

**Authentication Middleware:**
```javascript
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    req.user = decoded;
    return next ? next() : true;
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export const requireRole = (role, handler) => {
  return async (req, res) => {
    const isAuth = await authMiddleware(req, res);
    if (isAuth !== true) return;
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    return handler(req, res);
  };
};
```

### 6. API Routes Implementation

**Authentication Routes:**

**File: `pages/api/auth/login.js`**
```javascript
import { prisma } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, userType } = req.body;

  try {
    // Determine which table to query
    const model = userType === 'admin' ? prisma.admin : prisma.student;
    
    // Find user
    const user = await model.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    // Return success
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
```

**File: `pages/api/auth/signup.js`**
```javascript
import { prisma } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name, phone, rollNo, userType } = req.body;

  try {
    // Check if user exists
    const model = userType === 'admin' ? prisma.admin : prisma.student;
    const existingUser = await model.findUnique({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userData = {
      email,
      password: hashedPassword,
      name,
      role: userType === 'admin' ? 'admin' : 'student'
    };

    if (userType === 'student') {
      userData.phone = phone;
      userData.rollNo = rollNo;
    }

    const user = await model.create({ data: userData });

    // Generate token
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
```

**CRUD Routes Example:**

**File: `pages/api/courses/index.js`**
```javascript
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

async function handler(req, res) {
  // GET - Public access
  if (req.method === 'GET') {
    try {
      const courses = await prisma.course.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        include: {
          branchCourses: {
            include: { branch: true }
          }
        }
      });
      return res.status(200).json(courses);
    } catch (error) {
      console.error('Get courses error:', error);
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }

  // POST - Admin only
  if (req.method === 'POST') {
    return requireRole('admin', async (req, res) => {
      try {
        const { name, slug, description, category, price, duration, features, image } = req.body;

        // Validation
        if (!name || !slug || !description || !category || !price || !duration) {
          return res.status(400).json({ 
            success: false, 
            message: 'Missing required fields' 
          });
        }

        // Create course
        const course = await prisma.course.create({
          data: {
            name,
            slug,
            description,
            category,
            price: parseFloat(price),
            duration,
            features: features || [],
            image,
            isActive: true
          }
        });

        res.status(201).json({ success: true, course });
      } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({ 
          success: false, 
          message: 'Failed to create course' 
        });
      }
    })(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default handler;
```

**File: `pages/api/courses/[id].js`**
```javascript
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';

async function handler(req, res) {
  const { id } = req.query;

  // GET - Public
  if (req.method === 'GET') {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
        include: {
          branchCourses: {
            include: { branch: true }
          }
        }
      });
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      
      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch course' });
    }
  }

  // PUT - Admin only
  if (req.method === 'PUT') {
    return requireRole('admin', async (req, res) => {
      try {
        const course = await prisma.course.update({
          where: { id },
          data: req.body
        });
        res.status(200).json({ success: true, course });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Update failed' });
      }
    })(req, res);
  }

  // DELETE - Admin only
  if (req.method === 'DELETE') {
    return requireRole('admin', async (req, res) => {
      try {
        await prisma.course.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Course deleted' });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Delete failed' });
      }
    })(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default handler;
```

### 7. Database Seeding

**File: `prisma/seed.js`**

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@angelsschool.co.in' },
    update: {},
    create: {
      email: 'admin@angelsschool.co.in',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    }
  });

  console.log('Created admin:', admin.email);

  // Seed courses
  const courses = [
    {
      name: 'NEET Preparation',
      slug: 'neet-preparation',
      description: 'Comprehensive NEET preparation program',
      category: 'NEET',
      price: 50000,
      duration: '2 Years',
      features: ['Expert Faculty', 'Mock Tests', 'Study Material'],
      isActive: true
    },
    // ... more courses
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: course
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Run seed:**
```bash
npx prisma db seed
```

### 8. Environment Variables

**File: `.env`**
```env
# Database
DATABASE_URL="postgresql://user:password@host/database"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"
```

### 9. File Upload Setup

**File: `lib/cloudinary.js`**
```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
```

**File upload API route:**
```javascript
import formidable from 'formidable';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  const form = formidable();
  
  form.parse(req, async (err, fields, files) => {
    const result = await cloudinary.uploader.upload(files.image.filepath);
    res.status(200).json({ url: result.secure_url });
  });
}
```

### 10. Admin Statistics API

**File: `pages/api/admin/stats.js`**
```javascript
import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      message: 'Error fetching statistics',
      error: error.message 
    });
  }
}
```

## Testing the Backend

### Using Postman/Thunder Client:

**1. Test Login:**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@angelsschool.co.in",
  "password": "admin123",
  "userType": "admin"
}
```

**2. Test Get Courses:**
```
GET http://localhost:3000/api/courses
```

**3. Test Create Course (with auth):**
```
POST http://localhost:3000/api/courses
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "New Course",
  "slug": "new-course",
  "description": "Description",
  "category": "JEE",
  "price": 40000,
  "duration": "1 Year"
}
```

## Deployment Considerations

1. **Environment Variables:** Set all environment variables in production
2. **Database:** Migrate to production database
3. **Security:** Enable rate limiting, CORS policies
4. **Monitoring:** Add logging and error tracking
5. **Backup:** Schedule regular database backups
6. **SSL:** Ensure HTTPS for all API calls

## Summary

The backend was built with:
- ✅ PostgreSQL database hosted on Neon
- ✅ Prisma ORM for type-safe database access
- ✅ Next.js API routes for serverless functions
- ✅ JWT authentication with role-based access
- ✅ Cloudinary for file storage
- ✅ RESTful API design
- ✅ Error handling and validation
- ✅ Database seeding for initial data
