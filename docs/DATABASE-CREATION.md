# Database Creation Guide

## Overview
This document provides a comprehensive guide on how the PostgreSQL database was created, structured, and deployed for the Angels School Career Institute website using Prisma ORM and Neon.tech.

## Table of Contents
1. [Database Architecture](#database-architecture)
2. [Schema Design Process](#schema-design-process)
3. [Table Creation](#table-creation)
4. [Relationships and Constraints](#relationships-and-constraints)
5. [Indexes and Optimization](#indexes-and-optimization)
6. [Migration Process](#migration-process)
7. [Data Seeding](#data-seeding)

---

## Database Architecture

### Technology Stack
```
┌─────────────────────────────────────────┐
│         Application Layer               │
│    (Next.js + React Components)         │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           ORM Layer                     │
│         (Prisma Client)                 │
│  - Type-safe queries                    │
│  - Schema migrations                    │
│  - Query builder                        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│       Database Engine                   │
│    PostgreSQL 15 (Neon.tech)           │
│  - Serverless architecture              │
│  - Auto-scaling compute                 │
│  - Connection pooling                   │
└─────────────────────────────────────────┘
```

### Database Schema Overview
```
Database: neondb
├── admins                  (Admin user accounts)
├── students                (Student user accounts)
├── courses                 (Course catalog)
├── branches                (Physical locations)
├── branch_courses          (Many-to-many: branches ↔ courses)
├── enrollments             (Student course enrollments)
├── gallery_images          (Website gallery)
├── testimonials            (Student reviews)
└── hero_content            (Dynamic hero section)
```

---

## Schema Design Process

### Step 1: Requirements Analysis

**Business Requirements Identified:**
1. User management (admin and student roles)
2. Course catalog with categories (NEET, JEE, GUJCET, Foundation)
3. Multiple branch locations
4. Student enrollments tracking
5. Gallery management
6. Testimonials display
7. Dynamic content management

### Step 2: Entity-Relationship Design

**Core Entities:**
```
User Entities:
- Admin (manages system)
- Student (enrolls in courses)

Content Entities:
- Course (educational offerings)
- Branch (physical locations)
- GalleryImage (photo gallery)
- Testimonial (reviews)
- HeroContent (homepage content)

Relationship Entities:
- BranchCourse (links branches with courses)
- Enrollment (links students with courses and branches)
```

**Relationship Diagram:**
```
                    ┌─────────┐
                    │ Student │
                    └────┬────┘
                         │
                         │ enrolls in
                         │
                    ┌────▼────────┐
                    │ Enrollment  │
                    └────┬────┬───┘
                         │    │
           offered at    │    │ for
                         │    │
                    ┌────▼──┐ │
                    │Branch │ │
                    └───┬───┘ │
                        │     │
              offers    │     │
                        │     │
                    ┌───▼─────▼──┐
                    │   Course   │
                    └────────────┘
```

### Step 3: Prisma Schema Definition

**File: `prisma/schema.prisma`**

**Initial Schema Setup:**
```prisma
// Database connection configuration
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Prisma Client generation
generator client {
  provider = "prisma-client-js"
}
```

---

## Table Creation

### 1. Admin Table

**Purpose:** Store admin user credentials and information

**Prisma Model:**
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

**Generated SQL:**
```sql
CREATE TABLE admins (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);

-- Indexes
CREATE UNIQUE INDEX admins_email_key ON admins(email);
```

**Field Explanations:**
- `id`: Unique identifier (CUID - Collision-resistant Unique ID)
- `email`: Login credential, must be unique
- `password`: bcrypt hashed, never stored in plain text
- `name`: Admin's full name
- `role`: Future-proofing for different admin levels
- `createdAt`: Account creation timestamp
- `updatedAt`: Last modification timestamp

### 2. Student Table

**Purpose:** Store student user accounts and profile information

**Prisma Model:**
```prisma
model Student {
  id          String       @id @default(cuid())
  email       String       @unique
  password    String       // Hashed with bcrypt
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

**Generated SQL:**
```sql
CREATE TABLE students (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  roll_no TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);

-- Indexes
CREATE UNIQUE INDEX students_email_key ON students(email);
CREATE UNIQUE INDEX students_roll_no_key ON students(roll_no);
```

**Field Explanations:**
- `rollNo`: Unique student identifier (enrollment number)
- `phone`: Optional contact number
- `enrollments`: Relation to Enrollment table (one-to-many)

### 3. Course Table

**Purpose:** Store course catalog with pricing and details

**Prisma Model:**
```prisma
model Course {
  id            String         @id @default(cuid())
  name          String
  slug          String         @unique
  description   String         @db.Text
  category      String         // NEET, JEE, GUJCET, Foundation, GPSC, UPSC
  price         Float
  duration      String
  features      String[]       // Array of features
  syllabus      String?        @db.Text
  image         String?
  isActive      Boolean        @default(true)
  enrollments   Enrollment[]
  branchCourses BranchCourse[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@map("courses")
}
```

**Generated SQL:**
```sql
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  duration TEXT NOT NULL,
  features TEXT[] NOT NULL,
  syllabus TEXT,
  image TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);

-- Indexes
CREATE UNIQUE INDEX courses_slug_key ON courses(slug);
```

**Field Explanations:**
- `slug`: URL-friendly identifier (e.g., "neet-preparation")
- `description`: Full course description (TEXT type for long content)
- `category`: Course type for filtering
- `features`: PostgreSQL array for course features
- `syllabus`: Optional detailed curriculum
- `isActive`: Soft delete functionality

### 4. Branch Table

**Purpose:** Store physical branch locations and details

**Prisma Model:**
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
  facilities    String[]       // Array of facilities
  image         String?
  isActive      Boolean        @default(true)
  enrollments   Enrollment[]
  branchCourses BranchCourse[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@map("branches")
}
```

**Generated SQL:**
```sql
CREATE TABLE branches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  map_url TEXT,
  is_headquarter BOOLEAN NOT NULL DEFAULT false,
  facilities TEXT[] NOT NULL,
  image TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);

-- Indexes
CREATE UNIQUE INDEX branches_slug_key ON branches(slug);
```

**Field Explanations:**
- `isHeadquarter`: Identifies main branch
- `facilities`: Array of available amenities
- `mapUrl`: Google Maps embed URL

### 5. BranchCourse Table (Junction Table)

**Purpose:** Many-to-many relationship between branches and courses

**Prisma Model:**
```prisma
model BranchCourse {
  id        String   @id @default(cuid())
  branchId  String
  courseId  String
  branch    Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([branchId, courseId])
  @@map("branch_courses")
}
```

**Generated SQL:**
```sql
CREATE TABLE branch_courses (
  id TEXT PRIMARY KEY,
  branch_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT branch_courses_branch_id_fkey 
    FOREIGN KEY (branch_id) 
    REFERENCES branches(id) 
    ON DELETE CASCADE,
    
  CONSTRAINT branch_courses_course_id_fkey 
    FOREIGN KEY (course_id) 
    REFERENCES courses(id) 
    ON DELETE CASCADE
);

-- Indexes
CREATE UNIQUE INDEX branch_courses_branch_id_course_id_key 
  ON branch_courses(branch_id, course_id);
```

**Design Decisions:**
- `@@unique([branchId, courseId])`: Prevents duplicate course-branch combinations
- `onDelete: Cascade`: Automatic cleanup when parent records deleted

### 6. Enrollment Table

**Purpose:** Track student course enrollments at specific branches

**Prisma Model:**
```prisma
model Enrollment {
  id         String   @id @default(cuid())
  studentId  String
  courseId   String
  branchId   String
  student    Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  course     Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  branch     Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  status     String   @default("active") // active, completed, dropped
  enrolledAt DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([studentId, courseId])
  @@map("enrollments")
}
```

**Generated SQL:**
```sql
CREATE TABLE enrollments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  enrolled_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT enrollments_student_id_fkey 
    FOREIGN KEY (student_id) 
    REFERENCES students(id) 
    ON DELETE CASCADE,
    
  CONSTRAINT enrollments_course_id_fkey 
    FOREIGN KEY (course_id) 
    REFERENCES courses(id) 
    ON DELETE CASCADE,
    
  CONSTRAINT enrollments_branch_id_fkey 
    FOREIGN KEY (branch_id) 
    REFERENCES branches(id) 
    ON DELETE CASCADE
);

-- Indexes
CREATE UNIQUE INDEX enrollments_student_id_course_id_key 
  ON enrollments(student_id, course_id);
```

**Field Explanations:**
- `status`: Tracks enrollment lifecycle (active/completed/dropped)
- `@@unique([studentId, courseId])`: Student can't enroll in same course twice

### 7. GalleryImage Table

**Purpose:** Manage website gallery photos

**Prisma Model:**
```prisma
model GalleryImage {
  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  imageUrl    String
  category    String   // events, facilities, achievements, students
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("gallery_images")
}
```

**Generated SQL:**
```sql
CREATE TABLE gallery_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);
```

**Field Explanations:**
- `category`: Filters images by type (events, facilities, etc.)
- `imageUrl`: Cloudinary URL for hosted images

### 8. Testimonial Table

**Purpose:** Store student and parent reviews

**Prisma Model:**
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

**Generated SQL:**
```sql
CREATE TABLE testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  course TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  message TEXT NOT NULL,
  image TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);
```

**Field Explanations:**
- `role`: Differentiates between student/parent/alumni testimonials
- `rating`: 1-5 star rating system
- `course`: Optional associated course

### 9. HeroContent Table

**Purpose:** Manage dynamic homepage hero section content

**Prisma Model:**
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
  displayOrder Int     @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("hero_content")
}
```

**Generated SQL:**
```sql
CREATE TABLE hero_content (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta_text TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);
```

**Field Explanations:**
- `displayOrder`: Controls display sequence for multiple heroes
- `ctaText` & `ctaLink`: Call-to-action button configuration

---

## Relationships and Constraints

### Foreign Key Relationships

```prisma
// Student → Enrollment (One-to-Many)
Student {
  enrollments Enrollment[]
}
Enrollment {
  student Student @relation(fields: [studentId], references: [id])
}

// Course → Enrollment (One-to-Many)
Course {
  enrollments Enrollment[]
}
Enrollment {
  course Course @relation(fields: [courseId], references: [id])
}

// Branch → Enrollment (One-to-Many)
Branch {
  enrollments Enrollment[]
}
Enrollment {
  branch Branch @relation(fields: [branchId], references: [id])
}

// Branch ↔ Course (Many-to-Many via BranchCourse)
Branch {
  branchCourses BranchCourse[]
}
Course {
  branchCourses BranchCourse[]
}
BranchCourse {
  branch Branch @relation(fields: [branchId], references: [id])
  course Course @relation(fields: [courseId], references: [id])
}
```

### Cascade Delete Rules

**Behavior when parent records are deleted:**
```sql
-- Delete student → Automatically deletes enrollments
DELETE FROM students WHERE id = 'student-123';
-- Automatically executes: DELETE FROM enrollments WHERE student_id = 'student-123';

-- Delete course → Automatically deletes enrollments and branch associations
DELETE FROM courses WHERE id = 'course-456';
-- Automatically executes: 
-- DELETE FROM enrollments WHERE course_id = 'course-456';
-- DELETE FROM branch_courses WHERE course_id = 'course-456';

-- Delete branch → Automatically deletes enrollments and course associations
DELETE FROM branches WHERE id = 'branch-789';
-- Automatically executes:
-- DELETE FROM enrollments WHERE branch_id = 'branch-789';
-- DELETE FROM branch_courses WHERE branch_id = 'branch-789';
```

### Unique Constraints

**Preventing duplicate data:**
```sql
-- Email uniqueness
ALTER TABLE admins ADD CONSTRAINT admins_email_key UNIQUE (email);
ALTER TABLE students ADD CONSTRAINT students_email_key UNIQUE (email);

-- Slug uniqueness (SEO-friendly URLs)
ALTER TABLE courses ADD CONSTRAINT courses_slug_key UNIQUE (slug);
ALTER TABLE branches ADD CONSTRAINT branches_slug_key UNIQUE (slug);

-- Roll number uniqueness
ALTER TABLE students ADD CONSTRAINT students_roll_no_key UNIQUE (roll_no);

-- Composite uniqueness
ALTER TABLE enrollments 
  ADD CONSTRAINT enrollments_student_id_course_id_key 
  UNIQUE (student_id, course_id);

ALTER TABLE branch_courses 
  ADD CONSTRAINT branch_courses_branch_id_course_id_key 
  UNIQUE (branch_id, course_id);
```

---

## Indexes and Optimization

### Automatic Indexes

**Prisma automatically creates indexes for:**
1. Primary keys (`@id`)
2. Unique constraints (`@unique`)
3. Foreign keys (in some databases)

### Custom Indexes

**Performance optimization for common queries:**
```prisma
model Course {
  // ... fields
  
  @@index([category])        // Fast filtering by category
  @@index([isActive])        // Fast filtering active courses
  @@index([createdAt])       // Fast sorting by date
}

model Branch {
  // ... fields
  
  @@index([city])            // Fast filtering by location
  @@index([isActive])        // Fast filtering active branches
}

model Enrollment {
  // ... fields
  
  @@index([status])          // Fast filtering by status
  @@index([enrolledAt])      // Fast sorting by date
}
```

**Generated SQL:**
```sql
-- Course indexes
CREATE INDEX courses_category_idx ON courses(category);
CREATE INDEX courses_is_active_idx ON courses(is_active);
CREATE INDEX courses_created_at_idx ON courses(created_at);

-- Branch indexes
CREATE INDEX branches_city_idx ON branches(city);
CREATE INDEX branches_is_active_idx ON branches(is_active);

-- Enrollment indexes
CREATE INDEX enrollments_status_idx ON enrollments(status);
CREATE INDEX enrollments_enrolled_at_idx ON enrollments(enrolled_at);
```

---

## Migration Process

### Step 1: Initialize Prisma

```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma project
npx prisma init

# Creates:
# - prisma/schema.prisma (schema definition)
# - .env (environment variables)
```

### Step 2: Configure Database Connection

**File: `.env`**
```env
DATABASE_URL="postgresql://user:password@ep-xyz.neon.tech/neondb?sslmode=require"
```

### Step 3: Define Schema

**File: `prisma/schema.prisma`**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Define all models here...
```

### Step 4: Push Schema to Database

```bash
# Create tables in Neon database
npx prisma db push

# Output:
# ✓ Your database is now in sync with your schema.
# ✓ Generated Prisma Client to ./node_modules/@prisma/client
```

**What happens:**
1. Prisma connects to Neon via DATABASE_URL
2. Compares schema with existing database
3. Generates SQL DDL statements
4. Executes CREATE TABLE commands
5. Creates indexes and constraints
6. Generates Prisma Client with TypeScript types

### Step 5: Generate Prisma Client

```bash
# Generate TypeScript/JavaScript client
npx prisma generate
```

**Generated Files:**
```
node_modules/@prisma/client/
├── index.d.ts          (TypeScript definitions)
├── index.js            (JavaScript client)
└── schema.prisma       (Copy of schema)
```

### Step 6: Verify Database

```bash
# Open Prisma Studio (visual database browser)
npx prisma studio

# Opens: http://localhost:5555
# View all tables, data, and relationships
```

---

## Data Seeding

### Seed Script

**File: `prisma/seed.js`**

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create Admin User
  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@angelsschool.co.in' },
    update: {},
    create: {
      email: 'admin@angelsschool.co.in',
      password: adminPassword,
      name: 'System Administrator',
      role: 'admin'
    }
  });
  console.log('✓ Admin created:', admin.email);

  // 2. Create Branches
  console.log('Creating branches...');
  const branches = await Promise.all([
    prisma.branch.upsert({
      where: { slug: 'bhavnagar-main' },
      update: {},
      create: {
        name: 'Bhavnagar Main Campus',
        slug: 'bhavnagar-main',
        address: 'Angels School Vidyapith Campus, Ghogha Circle',
        city: 'Bhavnagar',
        phone: '+91 90810 44496',
        email: 'bhavnagar@angelsschool.co.in',
        isHeadquarter: true,
        facilities: ['Library', 'Labs', 'Hostel', 'Cafeteria'],
        isActive: true
      }
    }),
    prisma.branch.upsert({
      where: { slug: 'ahmedabad' },
      update: {},
      create: {
        name: 'Ahmedabad Branch',
        slug: 'ahmedabad',
        address: 'Science City Road, Near Gujarat University',
        city: 'Ahmedabad',
        phone: '+91 90810 44497',
        email: 'ahmedabad@angelsschool.co.in',
        isHeadquarter: false,
        facilities: ['Library', 'Labs', 'Cafeteria'],
        isActive: true
      }
    })
  ]);
  console.log('✓ Created', branches.length, 'branches');

  // 3. Create Courses
  console.log('Creating courses...');
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { slug: 'neet-preparation' },
      update: {},
      create: {
        name: 'NEET Preparation',
        slug: 'neet-preparation',
        description: 'Comprehensive NEET preparation program',
        category: 'NEET',
        price: 50000,
        duration: '2 Years',
        features: [
          'Expert Faculty',
          'Daily Practice Tests',
          'Study Material',
          'Doubt Clearing Sessions'
        ],
        isActive: true
      }
    }),
    prisma.course.upsert({
      where: { slug: 'jee-main-advanced' },
      update: {},
      create: {
        name: 'JEE Main + Advanced',
        slug: 'jee-main-advanced',
        description: 'Complete JEE preparation for Main and Advanced',
        category: 'JEE',
        price: 55000,
        duration: '2 Years',
        features: [
          'IIT Alumni Faculty',
          'Mock Tests',
          'Video Lectures',
          'Personal Mentoring'
        ],
        isActive: true
      }
    })
  ]);
  console.log('✓ Created', courses.length, 'courses');

  // 4. Link Courses to Branches
  console.log('Linking courses to branches...');
  for (const branch of branches) {
    for (const course of courses) {
      await prisma.branchCourse.upsert({
        where: {
          branchId_courseId: {
            branchId: branch.id,
            courseId: course.id
          }
        },
        update: {},
        create: {
          branchId: branch.id,
          courseId: course.id
        }
      });
    }
  }
  console.log('✓ Linked courses to branches');

  // 5. Create Gallery Images
  console.log('Creating gallery images...');
  const galleryImages = await Promise.all([
    prisma.galleryImage.create({
      data: {
        title: 'Annual Day 2024',
        description: 'Students celebrating achievements',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
        category: 'events',
        isActive: true
      }
    }),
    prisma.galleryImage.create({
      data: {
        title: 'Modern Laboratory',
        description: 'State-of-the-art science facilities',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
        category: 'facilities',
        isActive: true
      }
    })
  ]);
  console.log('✓ Created', galleryImages.length, 'gallery images');

  // 6. Create Testimonials
  console.log('Creating testimonials...');
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Rahul Sharma',
        role: 'Student',
        course: 'NEET Preparation',
        rating: 5,
        message: 'Excellent teaching methodology and supportive faculty',
        isActive: true
      }
    }),
    prisma.testimonial.create({
      data: {
        name: 'Priya Patel',
        role: 'Parent',
        rating: 5,
        message: 'Best coaching institute in Gujarat for medical entrance',
        isActive: true
      }
    })
  ]);
  console.log('✓ Created', testimonials.length, 'testimonials');

  // 7. Create Hero Content
  console.log('Creating hero content...');
  const heroContent = await prisma.heroContent.create({
    data: {
      title: 'Angels School Career Institute',
      subtitle: 'Building a great nation through holistic development',
      ctaText: 'Enroll Now',
      ctaLink: '/contact',
      isActive: true,
      displayOrder: 0
    }
  });
  console.log('✓ Created hero content');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Run Seed

**Add to `package.json`:**
```json
{
  "prisma": {
    "seed": "node prisma/seed.js"
  }
}
```

**Execute:**
```bash
npx prisma db seed

# Output:
# 🌱 Starting database seed...
# Creating admin user...
# ✓ Admin created: admin@angelsschool.co.in
# Creating branches...
# ✓ Created 2 branches
# Creating courses...
# ✓ Created 2 courses
# ...
# 🎉 Seeding completed successfully!
```

---

## Database Creation Timeline

### Complete Creation Process (Step-by-Step)

```bash
# Day 1: Initial Setup
1. Sign up for Neon.tech account
2. Create PostgreSQL project
3. Copy DATABASE_URL connection string
4. Initialize Prisma in Next.js project
   npx prisma init

# Day 2: Schema Design
5. Define all Prisma models in schema.prisma
6. Add relationships and constraints
7. Add indexes for optimization

# Day 3: Database Creation
8. Push schema to Neon database
   npx prisma db push
9. Generate Prisma Client
   npx prisma generate
10. Verify with Prisma Studio
    npx prisma studio

# Day 4: Data Population
11. Create seed script (prisma/seed.js)
12. Add sample data
13. Run seed
    npx prisma db seed
14. Verify data in Prisma Studio

# Day 5: Integration
15. Create lib/db.js for Prisma Client
16. Create API routes using Prisma
17. Test CRUD operations
18. Deploy to production
```

---

## Verification Steps

### 1. Check Tables Created

```bash
# Open Prisma Studio
npx prisma studio

# Verify all tables exist:
# - admins ✓
# - students ✓
# - courses ✓
# - branches ✓
# - branch_courses ✓
# - enrollments ✓
# - gallery_images ✓
# - testimonials ✓
# - hero_content ✓
```

### 2. Test Queries

```javascript
// Test in API route or script
import { prisma } from '@/lib/db';

// Count records
const counts = await Promise.all([
  prisma.admin.count(),
  prisma.course.count(),
  prisma.branch.count(),
  prisma.galleryImage.count(),
  prisma.testimonial.count()
]);

console.log('Database contains:');
console.log('Admins:', counts[0]);
console.log('Courses:', counts[1]);
console.log('Branches:', counts[2]);
console.log('Gallery Images:', counts[3]);
console.log('Testimonials:', counts[4]);
```

### 3. Verify Relationships

```javascript
// Test relationship queries
const courseWithBranches = await prisma.course.findFirst({
  include: {
    branchCourses: {
      include: {
        branch: true
      }
    }
  }
});

console.log('Course:', courseWithBranches.name);
console.log('Available at branches:', 
  courseWithBranches.branchCourses.map(bc => bc.branch.name)
);
```

---

## Summary

**Database Creation Complete:**
✅ 9 tables created with proper structure
✅ Relationships and foreign keys established
✅ Indexes created for performance
✅ Sample data seeded
✅ Prisma Client generated
✅ Ready for production use

**Database Statistics:**
- Tables: 9
- Relationships: 6 (foreign keys)
- Junction Tables: 2 (many-to-many)
- Indexes: 15+ (unique + performance)
- Total Fields: 90+

**Technology Used:**
- PostgreSQL 15
- Prisma ORM
- Neon.tech (serverless hosting)
- bcrypt (password hashing)
- CUID (unique identifiers)
