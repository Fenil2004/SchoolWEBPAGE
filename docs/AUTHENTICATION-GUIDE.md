# Authentication Implementation Guide

## Overview
This document explains the secure authentication system implemented using HttpOnly cookies, JWT tokens, and proper caching controls.

## Security Features

✅ **HttpOnly Cookies** - Token stored in HTTP-only cookie (not accessible via JavaScript)  
✅ **XSS Protection** - Tokens cannot be stolen via XSS attacks  
✅ **CSRF Protection** - SameSite cookie attribute prevents CSRF  
✅ **Secure Flag** - Cookies only sent over HTTPS in production  
✅ **No-Cache Policy** - Auth endpoints never cached by browser/CDN  
✅ **JWT Tokens** - Stateless authentication with 7-day expiration  

## Authentication Flow

### 1. Login Process

**Client Side (`Components/pages-content/AdminLogin.jsx`):**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault(); // CRITICAL: Prevents form reload
  
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store', // Prevent browser caching
    credentials: 'include', // Include HttpOnly cookies
    body: JSON.stringify({
      email,
      password,
      userType: 'admin',
    }),
  });

  // Handle non-JSON responses (error pages)
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (parseErr) {
    console.error('Non-JSON response received:', text);
    setError('Server returned an invalid response.');
    return;
  }

  if (data.success) {
    // Cookie is set automatically by server
    localStorage.setItem('user', JSON.stringify(data.user));
    await router.push('/admin/dashboard');
  }
};
```

**Server Side (`pages/api/auth/login.js`):**
```javascript
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

export default async function handler(req, res) {
  // Prevent caching of auth responses
  res.setHeader('Cache-Control', 'no-store');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, password, userType } = req.body;

  // Find user
  let user;
  if (userType === 'admin') {
    user = await prisma.admin.findUnique({ where: { email } });
  } else {
    user = await prisma.student.findUnique({ where: { email } });
  }

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  // Set HttpOnly cookie
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  res.setHeader('Set-Cookie', cookie);

  // Return user data (without password)
  const { password: _, ...userWithoutPassword } = user;
  return res.status(200).json({
    success: true,
    user: userWithoutPassword,
  });
}
```

### 2. Protected Routes

**Auth Middleware (`lib/auth.js`):**
```javascript
export function authMiddleware(handler) {
  return async (req, res) => {
    // Prevent caching
    res.setHeader('Cache-Control', 'no-store');
    
    // Get token from cookies (HttpOnly) or Authorization header (fallback)
    let token = req.cookies?.token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }

    // Attach user to request
    req.user = decoded;
    return handler(req, res);
  };
}
```

**Usage in API Route:**
```javascript
import { authMiddleware } from '@/lib/auth';

async function meHandler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  
  const userId = req.user.id;
  // ... fetch user data
}

export default authMiddleware(meHandler);
```

### 3. Client-Side Authentication Check

**Admin Dashboard (`Components/pages-content/AdminDashboard.jsx`):**
```javascript
const checkAuth = async () => {
  try {
    // Verify authentication with server using HttpOnly cookie
    const response = await fetch('/api/auth/me', {
      credentials: 'include' // Include HttpOnly cookie
    });
    
    if (!response.ok) {
      router.push('/admin-login');
      return;
    }
    
    const data = await response.json();
    
    if (!data.success || data.user.role !== 'admin') {
      router.push('/admin-login');
      return;
    }
    
    setUser(data.user);
  } catch (error) {
    router.push('/admin-login');
  }
};
```

### 4. Logout Process

**Client Side:**
```javascript
const handleLogout = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('user');
    router.push('/');
  }
};
```

**Server Side (`pages/api/auth/logout.js`):**
```javascript
import { serialize } from 'cookie';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Clear HttpOnly cookie
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // Expire immediately
  });
  res.setHeader('Set-Cookie', cookie);
  
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
```

## Caching Strategy

### API Endpoints - No Caching
All authentication endpoints include `Cache-Control: no-store` header:
- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/me`

### Netlify CDN Configuration
File: `public/_headers`
```
# Prevent caching for API endpoints and admin pages
/api/*
  Cache-Control: no-store

/admin-login
  Cache-Control: no-store

/admin/*
  Cache-Control: no-store
```

### Client-Side Fetch Options
```javascript
fetch('/api/auth/login', {
  cache: 'no-store', // Prevent browser caching
  credentials: 'include' // Include cookies
})
```

## Security Best Practices

### ✅ DO's
- Use `e.preventDefault()` in form submissions to prevent page reload
- Include `credentials: 'include'` in all authenticated requests
- Set `cache: 'no-store'` for auth-related fetch calls
- Use `httpOnly: true` for cookie-based tokens
- Set `secure: true` in production
- Use `sameSite: 'lax'` or `'strict'` for CSRF protection
- Parse response text before JSON to handle HTML error pages

### ❌ DON'Ts
- Don't store JWT tokens in localStorage (XSS vulnerability)
- Don't use `Authorization: Bearer` headers for primary auth (use cookies)
- Don't allow auth endpoints to be cached
- Don't skip `e.preventDefault()` in form handlers
- Don't assume `response.json()` will work (use text → parse pattern)

## Troubleshooting

### Login works with cache disabled but fails normally
**Solution:** Implemented `Cache-Control: no-store` headers and `cache: 'no-store'` fetch option

### "Unexpected token '<'" error
**Solution:** Use text → JSON.parse() pattern to handle HTML error responses

### Cookies not being sent to API
**Solution:** Add `credentials: 'include'` to all fetch requests

### Login causes page reload
**Solution:** Use `e.preventDefault()` in form submit handler

## Environment Variables

Required in `.env`:
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key-change-in-production"
NODE_ENV="production" # or "development"
```

## Testing Authentication

### 1. Login Test
- Open browser (normal mode, cache enabled)
- Navigate to `/admin-login`
- Enter credentials and submit
- Should redirect to `/admin/dashboard` without errors

### 2. Cookie Verification
- Open DevTools → Network
- Submit login form
- Check `/api/auth/login` response headers
- Should see `Set-Cookie: token=...` header
- Should see `Cache-Control: no-store` header

### 3. Protected Route Test
- Login as admin
- Navigate to `/admin/dashboard`
- Check Network tab for `/api/auth/me` request
- Should include cookie in request
- Should return user data

### 4. Logout Test
- Click logout button
- Should clear cookie and redirect to home
- Try accessing `/admin/dashboard` → should redirect to login

## Dependencies

```json
{
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.3",
  "cookie": "^1.1.1",
  "@prisma/client": "^5.22.0"
}
```
