import bcrypt from "bcryptjs";
// import prisma from your lib file that uses the global pattern
import { prisma } from "@/lib/prisma"; // <- ensure this path exists
import { generateToken } from "@/lib/auth";

console.log("DEBUG: /api/auth/login route loaded", new Date().toISOString());
console.log("DEBUG: NODE_ENV =", process.env.NODE_ENV);
console.log("DEBUG: DATABASE_URL present =", !!process.env.DATABASE_URL);

export default async function handler(req, res) {
  console.log("DEBUG: handler invoked - method:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, password, userType } = req.body;
    console.log("DEBUG: received body - email present:", !!email, "userType:", userType);

    // Validation
    if (!email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and userType are required",
      });
    }

    if (!["admin", "student"].includes(userType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user type",
      });
    }

    // Find user based on type
    console.log("DEBUG: About to run prisma query for", userType);
    let user;
    try {
      if (userType === "admin") {
        user = await prisma.admin.findUnique({ where: { email } });
      } else {
        user = await prisma.student.findUnique({ where: { email } });
      }
      console.log("DEBUG: prisma query result:", !!user);
    } catch (err) {
      console.error("DEBUG: prisma query threw:", err);
      throw err;
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // NOTE: confirm your DB column name for password. If your DB uses passwordHash, change the line below.
    console.log("DEBUG: verifying password (user has password field?:", user.password !== undefined, ")");
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      ...(userType === "student" && { rollNo: user.rollNo }),
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
