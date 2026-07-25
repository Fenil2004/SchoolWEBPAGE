import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRouter } from 'next/router';
import GoogleLoginButton from '@/components/ui/GoogleLoginButton';

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
        cache: 'no-store',
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          userType: 'admin',
        }),
      });

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
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
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
    <div className="min-h-[85vh] bg-gradient-to-br from-[#005F80] via-[#0082AD] to-[#004761] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#0082AD]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7AA13B]/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="rounded-3xl shadow-2xl border-none bg-white overflow-hidden">
          <CardHeader className="text-center pb-4 pt-10 px-8 bg-gradient-to-b from-[#E6F4F8] to-white">
            <img
              src="/images/logo.jpg"
              alt="Angels School Logo"
              className="w-16 h-16 rounded-2xl object-contain mx-auto mb-4 shadow-md border-2 border-white bg-white"
            />
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-2xl font-extrabold text-[#0082AD]">Angels</span>
              <span className="text-2xl font-extrabold text-[#7AA13B]">School</span>
            </div>
            <h2 className="text-lg font-bold text-slate-800">Admin Portal</h2>
            <p className="text-xs text-slate-500 font-medium">Authorized Personnel Authentication</p>
          </CardHeader>

          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-700">Admin Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@angelsschool.com"
                    className="pl-10 h-11 rounded-xl border-slate-200 focus:border-[#0082AD] focus:ring-[#0082AD] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-slate-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 rounded-xl border-slate-200 focus:border-[#0082AD] focus:ring-[#0082AD] text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#7AA13B] hover:bg-[#8DB843] text-white font-extrabold h-11 rounded-xl shadow-md transition-all mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}
              </Button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                  Or Sign In With
                </span>
              </div>

              <GoogleLoginButton />

              <div className="text-center pt-2 border-t border-slate-100 mt-4">
                <a href="/student-login" className="text-xs font-bold text-[#0082AD] hover:underline">
                  Student Portal Access →
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-cyan-200 text-xs mt-6 font-medium">
          © {new Date().getFullYear()} Angels School Career Institute. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}

