import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Prevent browser caching
        credentials: 'include', // Include cookies in request
        body: JSON.stringify({
          email,
          password,
          userType: 'admin',
        }),
      });

      // Handle non-JSON responses (e.g., HTML error pages)
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error('Non-JSON response received:', text);
        setError('Server returned an invalid response. Please try again.');
        setIsLoading(false);
        return;
      }

      if (data.success) {
        // Cookie is set automatically by the server (HttpOnly)
        // Store user info in localStorage (not sensitive data)
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to admin dashboard
        await router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A94B8] via-[#056C8C] to-[#044E64] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0A94B8] to-[#056C8C] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <p className="text-gray-500 mt-2">Access the admin dashboard</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@Angels School.co.in"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#76A440] hover:bg-[#8FC85C] text-white"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login as Admin'}
              </Button>

              <div className="text-center pt-4">
                <a href="/student-login" className="text-sm text-[#0A94B8] hover:underline">
                  Student? Click here to login
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-white/80 text-sm mt-6">
          © {new Date().getFullYear()} Angels School Career Institute
        </p>
      </motion.div>
    </div>
  );
}
