'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState<{ username: string; userId: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
      <div className="text-xl font-bold tracking-wide">PARIVAHAN SEWA</div>
      <nav className="flex items-center gap-4 text-sm font-medium">
        <a className="hover:underline" href="/">Home</a>
        <a className="hover:underline" href="/services">Services</a>
        <a className="hover:underline" href="#">External Links</a>
        
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="rounded border border-white/40 bg-red-600/80 px-4 py-1 text-xs font-semibold text-white transition hover:opacity-90"
            >
              Logout
            </button>
          </div>
        ) : (
          <a href="/auth" className="rounded border border-white/40 bg-white/80 px-4 py-1 text-xs font-semibold text-[#111] transition hover:opacity-90">
            Login
          </a>
        )}
      </nav>
    </header>
  );
}