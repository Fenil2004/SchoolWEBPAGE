# Database Connection Guide

## Overview
This document explains how the PostgreSQL database (hosted on Neon.tech) connects to both the frontend and backend of the Angels School Career Institute website.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│  Components: HeroSection, Courses, Gallery, Admin Dashboard │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTP Requests (fetch API)
                        │ /api/courses, /api/gallery, etc.
                        │
┌───────────────────────▼─────────────────────────────────────┐
│              API Routes (Next.js Backend)                   │
│    /pages/api/courses, /pages/api/auth, /pages/api/admin   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Prisma Client Queries
                        │ prisma.course.findMany()
                        │ prisma.user.create()
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                   Prisma ORM Layer                          │
│              Type-safe Database Queries                     │
│         (lib/db.js - Prisma Client Instance)               │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ SQL Queries over TLS/SSL
                        │ Connection Pool Management
                        │
┌───────────────────────▼─────────────────────────────────────┐
│              PostgreSQL Database (Neon.tech)                │
│   Tables: courses, branches, gallery_images, testimonials   │
│          admins, students, enrollments, etc.                │
└─────────────────────────────────────────────────────────────┘
```

## Database Connection Setup

### Step 1: Environment Configuration

**File: `.env`**
```env
# Neon PostgreSQL Connection String
DATABASE_URL="postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Format:
# postgresql://[user]:[password]@[neon-hostname]/[database]?sslmode=require
```

**Connection String Components:**
- `postgresql://` - Database protocol
- `username` - Your Neon database username
- `password` - Your Neon database password
- `ep-xyz.us-east-2.aws.neon.tech` - Neon hostname (specific to your project)
- `neondb` - Database name
- `?sslmode=require` - Enforces secure SSL connection

### Step 2: Prisma Configuration

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

**What this does:**
- `provider = "postgresql"` - Tells Prisma to use PostgreSQL dialect
- `url = env("DATABASE_URL")` - Reads connection string from environment
- `generator client` - Creates TypeScript/JavaScript client for database access

### Step 3: Prisma Client Initialization

**File: `lib/db.js`**
```javascript
import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma Client
const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

**Why Singleton Pattern?**
- Next.js hot-reloading can create multiple Prisma instances
- Each instance opens database connections
- Singleton prevents connection pool exhaustion
- Reuses same connection across hot-reloads

### Step 4: Connection Pool Management

**Neon automatically manages connection pooling:**

```javascript
// Implicit connection pooling by Neon
// No manual pool configuration needed

// Prisma opens connections on-demand
const courses = await prisma.course.findMany();

// Connections return to pool after query
// Neon handles connection lifecycle
```

**Connection Pool Benefits:**
- Automatic connection reuse
- Reduced connection overhead
- Better performance under load
- Handles concurrent requests efficiently

## Frontend to Database Flow

### Example: Loading Courses Page

**1. User visits `/Courses` page**

**File: `pages/Courses.jsx`**
```javascript
import { useEffect, useState } from 'react';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // Frontend makes HTTP request to API route
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>{course.name}</div>
      ))}
    </div>
  );
}
```

**2. API Route handles request**

**File: `pages/api/courses/index.js`**
```javascript
import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Prisma queries Neon database
      const courses = await prisma.course.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        include: {
          branchCourses: {
            include: {
              branch: true
            }
          }
        }
      });

      // Returns JSON to frontend
      return res.status(200).json(courses);
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }
}
```

**3. Database connection established**

```
API Route (Node.js)
    ↓
Prisma Client (lib/db.js)
    ↓
Connection Pool
    ↓
TLS/SSL Encrypted Connection
    ↓
Neon PostgreSQL Database
    ↓
SQL Query: SELECT * FROM courses WHERE is_active = true
    ↓
Result Set returned
    ↓
Prisma transforms to JavaScript objects
    ↓
JSON response to frontend
    ↓
React state updated
    ↓
UI renders courses
```

## Database Query Examples

### 1. Simple Read Query
```javascript
// Frontend component
const response = await fetch('/api/courses');
const courses = await response.json();

// Backend API route
const courses = await prisma.course.findMany();

// SQL executed by Prisma on Neon:
// SELECT * FROM courses;
```

### 2. Filtered Query with Relations
```javascript
// Frontend component
const response = await fetch('/api/courses?category=NEET');
const courses = await response.json();

// Backend API route
const courses = await prisma.course.findMany({
  where: { 
    category: 'NEET',
    isActive: true 
  },
  include: {
    branchCourses: {
      include: { branch: true }
    }
  }
});

// SQL executed by Prisma on Neon:
// SELECT c.*, bc.*, b.* 
// FROM courses c
// LEFT JOIN branch_courses bc ON c.id = bc.course_id
// LEFT JOIN branches b ON bc.branch_id = b.id
// WHERE c.category = 'NEET' AND c.is_active = true;
```

### 3. Create/Insert Query
```javascript
// Frontend component (Admin Dashboard)
const response = await fetch('/api/courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New NEET Course',
    slug: 'new-neet-course',
    category: 'NEET',
    price: 50000,
    duration: '2 Years'
  })
});

// Backend API route
const course = await prisma.course.create({
  data: {
    name: 'New NEET Course',
    slug: 'new-neet-course',
    category: 'NEET',
    price: 50000,
    duration: '2 Years',
    isActive: true
  }
});

// SQL executed by Prisma on Neon:
// INSERT INTO courses (id, name, slug, category, price, duration, is_active, created_at, updated_at)
// VALUES (gen_random_uuid(), 'New NEET Course', 'new-neet-course', 'NEET', 50000, '2 Years', true, NOW(), NOW())
// RETURNING *;
```

### 4. Update Query
```javascript
// Frontend component
const response = await fetch(`/api/courses/${courseId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ price: 55000 })
});

// Backend API route
const course = await prisma.course.update({
  where: { id: courseId },
  data: { price: 55000 }
});

// SQL executed by Prisma on Neon:
// UPDATE courses 
// SET price = 55000, updated_at = NOW()
// WHERE id = 'course-id-here'
// RETURNING *;
```

### 5. Delete Query
```javascript
// Frontend component
const response = await fetch(`/api/courses/${courseId}`, {
  method: 'DELETE'
});

// Backend API route
await prisma.course.delete({
  where: { id: courseId }
});

// SQL executed by Prisma on Neon:
// DELETE FROM courses WHERE id = 'course-id-here';
```

### 6. Aggregate/Count Query
```javascript
// Frontend component (Admin Dashboard)
const response = await fetch('/api/admin/stats');
const stats = await response.json();

// Backend API route
const [coursesCount, galleryCount, testimonialsCount, branchesCount] = 
  await Promise.all([
    prisma.course.count(),
    prisma.galleryImage.count(),
    prisma.testimonial.count(),
    prisma.branch.count()
  ]);

// SQL executed by Prisma on Neon (parallel queries):
// SELECT COUNT(*) FROM courses;
// SELECT COUNT(*) FROM gallery_images;
// SELECT COUNT(*) FROM testimonials;
// SELECT COUNT(*) FROM branches;
```

## Connection Lifecycle

### 1. Application Startup
```javascript
// When Next.js server starts
import { prisma } from '@/lib/db';

// Prisma Client is instantiated
// No immediate connection to database
// Connection opens on first query
```

### 2. First Query
```javascript
// First database query
const courses = await prisma.course.findMany();

// Prisma establishes connection to Neon
// Connection details from DATABASE_URL
// SSL/TLS handshake
// Authentication
// Connection added to pool
```

### 3. Subsequent Queries
```javascript
// Reuses existing connection from pool
const galleries = await prisma.galleryImage.findMany();
const testimonials = await prisma.testimonial.findMany();

// No reconnection overhead
// Faster query execution
```

### 4. Idle Connections
```
- Neon maintains connections in pool
- Idle timeout: Automatically managed
- Stale connections: Automatically recycled
- Max connections: Set by Neon plan
```

### 5. Connection Errors & Retries
```javascript
try {
  const courses = await prisma.course.findMany();
} catch (error) {
  if (error.code === 'P1001') {
    // Connection timeout - Prisma retries automatically
  } else if (error.code === 'P1017') {
    // Connection closed - Prisma reconnects
  }
  console.error('Database error:', error);
}
```

## Database Migrations

### Initial Setup
```bash
# Generate Prisma Client from schema
npx prisma generate

# Push schema to Neon database
npx prisma db push

# Creates all tables, indexes, and constraints on Neon
```

### Schema Changes
```bash
# 1. Modify prisma/schema.prisma
# 2. Push changes to database
npx prisma db push

# 3. Regenerate Prisma Client
npx prisma generate
```

### Migration Workflow
```
Developer edits schema.prisma
    ↓
Runs: npx prisma db push
    ↓
Prisma connects to Neon via DATABASE_URL
    ↓
Compares schema with existing database
    ↓
Generates SQL ALTER/CREATE statements
    ↓
Executes SQL on Neon PostgreSQL
    ↓
Tables/columns created or modified
    ↓
Prisma Client regenerated with new types
    ↓
Application uses updated schema
```

## Transaction Management

### Single Transaction
```javascript
// Frontend makes single request
const response = await fetch('/api/enrollments', {
  method: 'POST',
  body: JSON.stringify({ studentId, courseId, branchId })
});

// Backend uses Prisma transaction
const result = await prisma.$transaction(async (tx) => {
  // All queries in this block execute in single transaction
  const enrollment = await tx.enrollment.create({
    data: { studentId, courseId, branchId }
  });
  
  await tx.course.update({
    where: { id: courseId },
    data: { enrollmentCount: { increment: 1 } }
  });
  
  return enrollment;
});

// Both operations succeed or both fail
// Ensures data consistency
```

## Security Features

### 1. SSL/TLS Encryption
```
All data transmitted between your app and Neon is encrypted:
- TLS 1.2+ required
- Certificate validation
- Encrypted credentials
- Secure connection string with sslmode=require
```

### 2. Connection String Security
```javascript
// Never expose DATABASE_URL in frontend
// Only accessible in API routes (server-side)

// ✅ SECURE - Server-side only
// pages/api/courses/index.js
import { prisma } from '@/lib/db';

// ❌ INSECURE - Never do this
// Components/Courses.jsx
// import { prisma } from '@/lib/db'; // Won't work, should never be attempted
```

### 3. SQL Injection Prevention
```javascript
// Prisma automatically prevents SQL injection
// All inputs are parameterized

// Safe - Prisma handles escaping
const courses = await prisma.course.findMany({
  where: { 
    category: userInput // Automatically escaped
  }
});

// Prisma generates:
// SELECT * FROM courses WHERE category = $1
// Parameters: ['NEET']
```

### 4. Role-Based Access
```javascript
// Database credentials scoped to specific operations
// Neon roles: Owner, Member, Read-only

// Your DATABASE_URL user should have appropriate permissions
// Production: Use read-only replicas for read operations
```

## Performance Optimization

### 1. Connection Pooling
```javascript
// Neon automatically pools connections
// Default pool size: Based on your plan
// Free tier: 1 connection
// Pro tier: Multiple connections
```

### 2. Query Optimization
```javascript
// Select only needed fields
const courses = await prisma.course.findMany({
  select: {
    id: true,
    name: true,
    price: true
    // Excludes other fields from query
  }
});

// Use indexes (defined in schema)
model Course {
  id    String @id @default(cuid())
  slug  String @unique // Indexed automatically
  
  @@index([category]) // Custom index
}
```

### 3. Caching Strategy
```javascript
// Frontend caches API responses
const [courses, setCourses] = useState([]);

useEffect(() => {
  // Only fetch once on mount
  fetchCourses();
}, []); // Empty dependency array

// Backend can implement caching
import { LRUCache } from 'lru-cache';
const cache = new LRUCache({ max: 100, ttl: 1000 * 60 * 5 });

const getCourses = async () => {
  const cached = cache.get('courses');
  if (cached) return cached;
  
  const courses = await prisma.course.findMany();
  cache.set('courses', courses);
  return courses;
};
```

### 4. Batch Operations
```javascript
// Instead of multiple queries
for (const courseData of courses) {
  await prisma.course.create({ data: courseData }); // Slow
}

// Use createMany
await prisma.course.createMany({
  data: courses // Fast - single query
});
```

## Monitoring & Debugging

### 1. Query Logging
```javascript
// Enable in lib/db.js
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

// Console output:
// prisma:query SELECT * FROM courses WHERE category = 'NEET'
// prisma:info Query took 45ms
```

### 2. Prisma Studio
```bash
# Visual database browser
npx prisma studio

# Opens localhost:5555
# View/edit data directly
# See all tables and relations
```

### 3. Error Handling
```javascript
try {
  const course = await prisma.course.findUnique({
    where: { id: 'invalid-id' }
  });
} catch (error) {
  // Prisma error codes
  if (error.code === 'P2025') {
    // Record not found
  } else if (error.code === 'P2002') {
    // Unique constraint violation
  } else if (error.code === 'P1001') {
    // Can't reach database
  }
  
  console.error('Database error:', error.message);
}
```

## Troubleshooting

### Common Issues:

**1. Connection Refused**
```
Error: Can't reach database server at ep-xyz.neon.tech:5432
Solution: 
- Check DATABASE_URL is correct
- Verify Neon project is not suspended
- Check network/firewall settings
```

**2. SSL Required**
```
Error: no pg_hba.conf entry for host
Solution: Add ?sslmode=require to connection string
DATABASE_URL="postgresql://...?sslmode=require"
```

**3. Too Many Connections**
```
Error: Sorry, too many clients already
Solution: 
- Using singleton pattern in lib/db.js
- Check for connection leaks
- Upgrade Neon plan for more connections
```

**4. Schema Out of Sync**
```
Error: Invalid `prisma.course.findMany()` invocation
Solution: 
npx prisma generate
npx prisma db push
```

**5. Slow Queries**
```
Solution:
- Add indexes in schema
- Use prisma.$queryRaw for complex queries
- Check Neon dashboard for query performance
- Optimize includes/relations
```

## Summary

The database connection flow:
1. ✅ Frontend components make HTTP requests to API routes
2. ✅ API routes use Prisma Client to query database
3. ✅ Prisma connects to Neon PostgreSQL via DATABASE_URL
4. ✅ Connection pooling handled automatically by Neon
5. ✅ SSL/TLS encryption for all database traffic
6. ✅ Type-safe queries prevent SQL injection
7. ✅ Singleton pattern prevents connection exhaustion
8. ✅ Automatic retries and error handling

**Key Takeaways:**
- Frontend never directly connects to database
- All database access through secure API routes
- Prisma provides type-safety and prevents SQL injection
- Neon handles infrastructure, scaling, and connection pooling
- Environment variables keep credentials secure
