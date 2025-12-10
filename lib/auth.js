import jwt from 'jsonwebtoken';

// JWT Secret - In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Generate JWT token for authenticated user
 * @param {Object} payload - User data to encode in token
 * @param {string} expiresIn - Token expiration time (default: 7 days)
 * @returns {string} JWT token
 */
export function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

/**
 * Authentication middleware for Next.js API routes
 * Checks for valid JWT token in Authorization header
 * @param {Function} handler - The API route handler to protect
 * @returns {Function} Wrapped handler with authentication
 */
export function authMiddleware(handler) {
  return async (req, res) => {
    try {
      // Get token from Authorization header
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false, 
          message: 'No authentication token provided' 
        });
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      
      // Verify token
      const decoded = verifyToken(token);
      
      if (!decoded) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid or expired token' 
        });
      }

      // Attach user info to request object
      req.user = decoded;
      
      // Call the actual handler
      return handler(req, res);
      
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Authentication failed' 
      });
    }
  };
}

/**
 * Optional: Extract user from token without enforcing authentication
 * Useful for optional auth routes
 * @param {Object} req - Next.js request object
 * @returns {Object|null} Decoded user or null
 */
export function getUserFromRequest(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7);
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has specific role
 * @param {Object} user - Decoded user object from token
 * @param {string} requiredRole - Role to check (e.g., 'admin', 'student')
 * @returns {boolean}
 */
export function hasRole(user, requiredRole) {
  return user && user.role === requiredRole;
}

/**
 * Role-based authentication middleware
 * @param {string} requiredRole - Role required to access route
 * @param {Function} handler - The API route handler to protect
 * @returns {Function} Wrapped handler with role-based authentication
 */
export function requireRole(requiredRole, handler) {
  return authMiddleware(async (req, res) => {
    if (!hasRole(req.user, requiredRole)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Insufficient permissions' 
      });
    }
    
    return handler(req, res);
  });
}
