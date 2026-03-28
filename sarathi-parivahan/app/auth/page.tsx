'use client';

import { useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignup) {
        // Signup logic
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Signup failed');
          return;
        }

        setSuccess('Account created successfully! Redirecting...');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        // Login logic
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Login failed');
          return;
        }

        setSuccess('Login successful! Redirecting...');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Store user info (you might want to use cookies/session in production)
        localStorage.setItem('user', JSON.stringify(data));
        
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-2xl flex-col items-center justify-center px-6 py-10 sm:px-8">
        <div className="w-full max-w-md rounded-2xl bg-[#a47f30] px-8 py-10 shadow-2xl shadow-black/30">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-white">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="mt-2 text-sm text-white/80">
              {isSignup
                ? 'Join Sarathi Parivahan today'
                : 'Sign in to your account'}
            </p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/90 px-4 py-3 text-white text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg bg-green-500/90 px-4 py-3 text-white text-sm">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/90 px-4 py-3 text-[#111] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                placeholder="Enter username"
                required
                disabled={loading}
              />
            </div>

            {isSignup && (
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/90 px-4 py-3 text-[#111] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  placeholder="Enter email"
                  required={isSignup}
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/90 px-4 py-3 text-[#111] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>

            {isSignup && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/90 px-4 py-3 text-[#111] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  placeholder="Confirm password"
                  required={isSignup}
                  disabled={loading}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-[#111] transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 border-t border-white/20 pt-6 text-center">
            <p className="text-sm text-white mb-3">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
                setSuccess('');
                setFormData({
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
              className="inline-block rounded-lg bg-white/80 px-6 py-2 text-sm font-semibold text-[#111] transition hover:opacity-90"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>

        {/* Back home button */}
        <div className="mt-8">
          <a
            href="/"
            className="text-white hover:underline text-sm font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
