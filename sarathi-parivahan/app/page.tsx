'use client';

import { useEffect, useState } from 'react';
import Header from "./components/Header";

export default function Home() {
  const [user, setUser] = useState<{ username: string; userId: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-3xl flex-col items-center justify-center px-6 py-10 sm:px-8">
        <section className="mb-10 rounded-xl bg-[#a47f30] px-7 py-6 shadow-xl shadow-black/20">
          <div className="flex gap-4">
            <span className="h-14 w-14 rounded-full bg-red-500 shadow-lg shadow-black/30" />
            <span className="h-14 w-14 rounded-full bg-yellow-400 shadow-lg shadow-black/30" />
            <span className="h-14 w-14 rounded-full bg-green-500 shadow-lg shadow-black/30" />
          </div>
        </section>

        <section className="mb-8 rounded-xl bg-[#f7c64f] px-7 py-6 text-center shadow-lg shadow-black/20">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#172a0f] sm:text-4xl">
            सड़क परिवहन और राज्यमार्ग मंत्रालय
          </h1>
          <p className="mt-2 text-lg font-semibold text-[#101b10]">Ministry of Road Transport Highways</p>
          <p className="mt-2 text-sm text-[#0f1b0f]">Safer roads. Better futures.</p>
        </section>

        {!user && (
          <div className="mb-8 grid w-full gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white px-6 py-4 text-center shadow-lg shadow-black/20">
              <h3 className="font-semibold mb-2">New to Sarathi Parivahan?</h3>
              <p className="text-sm text-gray-600 mb-4">Create an account to access our services</p>
              <a href="/auth" className="inline-block rounded-lg bg-[#f2b630] px-4 py-2 text-sm font-semibold text-[#111] hover:opacity-90 transition">
                Sign Up
              </a>
            </div>
            <div className="rounded-xl bg-white px-6 py-4 text-center shadow-lg shadow-black/20">
              <h3 className="font-semibold mb-2">Already have an account?</h3>
              <p className="text-sm text-gray-600 mb-4">Sign in to manage your applications</p>
              <a href="/auth" className="inline-block rounded-lg bg-[#a47f30] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition">
                Sign In
              </a>
            </div>
          </div>
        )}

        {user && (
          <div className="mb-8 rounded-xl bg-white px-6 py-4 text-center shadow-lg shadow-black/20 w-full">
            <h2 className="text-2xl font-bold text-[#172a0f] mb-2">Welcome back, {user.username}! 👋</h2>
            <p className="text-gray-600">Ready to manage your applications?</p>
          </div>
        )}

        <div className="mb-8 text-center">
          <p className="mb-6 text-lg font-semibold">Explore our services</p>
          <a href="/services" className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#111] shadow-sm transition hover:opacity-90">
            Go to Services
          </a>
        </div>
      </main>
    </div>
  );
}
