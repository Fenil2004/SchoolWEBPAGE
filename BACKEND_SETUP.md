# Backend Setup Guide for Angels School

This guide explains how to set up the backend for the Angels School web application with authentication, database connectivity, and API endpoints.

## Technology Stack Options

### Option 1: Next.js API Routes (Recommended)
- Built-in API routes in Next.js
- Serverless functions
- Easy deployment on Vercel

### Option 2: Separate Node.js Backend
- Express.js server
- More control and flexibility
- Can be deployed separately

## Recommended Setup: Next.js API Routes + PostgreSQL/MongoDB

### 1. Install Required Dependencies

```bash
# Database (choose one)
npm install pg          # PostgreSQL
# OR
npm install mongoose    # MongoDB

# Authentication
npm install bcryptjs jsonwebtoken
npm install cookie-parser

# Environment variables
npm install dotenv

# Validation
npm install joi
npm install zod  # Alternative to Joi

# ORM (optional but recommended)
npm install prisma @prisma/client  # For PostgreSQL/MySQL
# OR
npm install mongoose  # For MongoDB
```

### 2. Project Structure

```
your-project/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js           # Admin/Student login
│   │   │   ├── logout.js          # Logout endpoint
│   │   │   ├── register.js        # Student registration
│   │   │   └── me.js              # Get current user
│   │   ├── admin/
│   │   │   ├── courses.js         # CRUD for courses
│   │   │   ├── branches.js        # CRUD for branches
│   │   │   ├── testimonials.js    # CRUD for testimonials
│   │   │   ├── gallery.js         # CRUD for gallery
│   │   │   ├── hero.js            # CRUD for hero sections
│   │   │   └── settings.js        # Site settings
│   │   └── public/
│   │       ├── courses.js         # Public course list
│   │       ├── branches.js        # Public branch list
│   │       └── testimonials.js    # Public testimonials
├── lib/
│   ├── db.js                      # Database connection
│   ├── auth.js                    # Auth middleware
│   └── utils.js                   # Helper functions
├── models/                        # Database models
│   ├── User.js
│   ├── Course.js
│   ├── Branch.js
│   ├── Testimonial.js
│   ├── Gallery.js
│   └── HeroContent.js
└── .env.local                     # Environment variables
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/angels_school"
# OR for MongoDB
# MONGODB_URI="mongodb://localhost:27017/angels_school"

# JWT Secret (generate a strong random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Admin Credentials (for initial setup)
ADMIN_EMAIL="admin@angelsschool.co.in"
ADMIN_PASSWORD="Admin@123"  # Change this!

# API Configuration
API_URL="http://localhost:3000"
NODE_ENV="development"

# Email Configuration (optional, for password reset)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# File Upload (if using cloud storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Or AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="angels-school-uploads"
```

### 4. Database Connection Setup

Create `lib/db.js`:

#### For PostgreSQL with Prisma:
```javascript
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
```

#### For MongoDB with Mongoose:
```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

### 5. Authentication Middleware

Create `lib/auth.js`:

```javascript
import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export function authMiddleware(handler, requiredRole = null) {
  return async (req, res) => {
    try {
      // Get token from cookies or header
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      // Check role if required
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      // Attach user to request
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  };
}
```

### 6. Example API Routes

#### Login Endpoint (`pages/api/auth/login.js`):

```javascript
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import prisma from '@/lib/db'; // or connectDB for MongoDB

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find user by email and role
    const user = await prisma.user.findFirst({
      where: {
        email,
        role: role.toUpperCase()
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    );

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
```

#### Protected Admin Endpoint (`pages/api/admin/courses.js`):

```javascript
import { authMiddleware } from '@/lib/auth';
import prisma from '@/lib/db';

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getCourses(req, res);
    case 'POST':
      return createCourse(req, res);
    case 'PUT':
      return updateCourse(req, res);
    case 'DELETE':
      return deleteCourse(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
}

async function createCourse(req, res) {
  try {
    const course = await prisma.course.create({
      data: req.body
    });
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create course' });
  }
}

// Export with authentication middleware requiring admin role
export default authMiddleware(handler, 'ADMIN');
```

### 7. Update Frontend Components

Update your login components to use the API:

```javascript
// In AdminLogin.jsx or StudentLogin.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role: 'admin' // or 'student'
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store token in localStorage (optional, already in cookie)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on role
      router.push(data.user.role === 'ADMIN' ? '/admin/dashboard' : '/');
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login');
  } finally {
    setIsLoading(false);
  }
};
```

### 8. API Client Helper

Create `lib/apiClient.js`:

```javascript
class APIClient {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new APIClient();
```

### 9. Testing the Backend

1. **Test login endpoint:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@angelsschool.co.in","password":"Admin@123","role":"admin"}'
```

2. **Test protected endpoint:**
```bash
curl -X GET http://localhost:3000/api/admin/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 10. Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`
3. **Hash passwords** - Always use bcrypt with salt rounds >= 10
4. **Validate input** - Use Joi or Zod for validation
5. **Rate limiting** - Install `express-rate-limit` or use Vercel's built-in
6. **CORS configuration** - Set proper CORS headers
7. **HTTPS only** - In production, enforce HTTPS
8. **HTTP-only cookies** - Store tokens in HTTP-only cookies
9. **SQL injection prevention** - Use parameterized queries (Prisma does this)
10. **XSS prevention** - Sanitize user inputs

### 11. Deployment Checklist

- [ ] Set all environment variables in hosting platform
- [ ] Set up production database
- [ ] Enable database SSL connections
- [ ] Configure CORS for production domain
- [ ] Set up monitoring and logging
- [ ] Enable rate limiting
- [ ] Set up backup strategy
- [ ] Configure CDN for static assets
- [ ] Enable HTTPS
- [ ] Test all API endpoints

### 12. Next Steps

1. Set up Prisma schema (see DATABASE_SETUP.md)
2. Run database migrations
3. Seed initial admin user
4. Implement remaining CRUD operations
5. Add file upload functionality
6. Set up email service
7. Implement password reset flow
8. Add API documentation (Swagger/OpenAPI)

## Support

For issues or questions:
- Check the DATABASE_SETUP.md file
- Review Next.js API Routes documentation
- Check Prisma/Mongoose documentation
