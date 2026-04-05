'use client';

import { useEffect, useState } from 'react';
import Header from "./components/Header";

export default function Home() {
  const [user, setUser] = useState<{ username: string; userId: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'activity'>('dashboard');
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

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

  const fetchActivity = async (username: string) => {
    setLoadingActivity(true);
    try {
      const res = await fetch(`/api/user/activity?username=${username}`);
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error(err);
    }
    setLoadingActivity(false);
  };

  useEffect(() => {
    if (activeTab === 'activity' && user && applications.length === 0) {
      fetchActivity(user.username);
    }
  }, [activeTab, user, applications.length]);

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
          <div className="mb-8 rounded-xl bg-white px-6 py-4 shadow-lg shadow-black/20 w-full text-left">
            <div className="flex border-b border-gray-200 mb-4">
              <button 
                className={`py-2 px-4 font-semibold ${activeTab === 'dashboard' ? 'border-b-2 border-[#172a0f] text-[#172a0f]' : 'text-gray-500 hover:text-[#172a0f]'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`py-2 px-4 font-semibold ${activeTab === 'activity' ? 'border-b-2 border-[#172a0f] text-[#172a0f]' : 'text-gray-500 hover:text-[#172a0f]'}`}
                onClick={() => setActiveTab('activity')}
              >
                Activity
              </button>
            </div>

            {activeTab === 'dashboard' ? (
                <div className="text-center py-4">
                  <h2 className="text-2xl font-bold text-[#172a0f] mb-2">Welcome back, {user.username}! 👋</h2>
                  <p className="text-gray-600 mb-6">Ready to manage your applications?</p>
                </div>
            ) : (
                <div className="py-2">
                  <h2 className="text-xl font-bold text-[#172a0f] mb-4">Your Recent Activity</h2>
                  {loadingActivity ? (
                      <div className="animate-pulse flex space-x-4">
                          <div className="flex-1 space-y-4 py-1">
                              <div className="h-2 bg-gray-200 rounded"></div>
                              <div className="h-2 bg-gray-200 rounded"></div>
                          </div>
                      </div>
                  ) : applications.length > 0 ? (
                      <div className="space-y-4">
                          {applications.map((app, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-[#f8f9fa] hover:bg-[#f1f3f5] transition">
                                  <div>
                                      <p className="font-bold text-[#172a0f] text-lg">{app.service_name}</p>
                                      <p className="text-sm text-gray-500 mt-1">Application ID: <span className="font-mono">{app.application_id}</span></p>
                                      <p className="text-sm text-gray-500">Submitted: {new Date(app.submitted_at?.$date || app.submitted_at || Date.now()).toLocaleString()}</p>
                                  </div>
                                  <div>
                                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${app.status === 'submitted' ? 'bg-blue-100 text-blue-800' : app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                          {app.status ? app.status : 'UNKNOWN'}
                                      </span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <p className="text-gray-500 italic">No recent activity found. Apply for a service to see your activity here.</p>
                  )}
                </div>
            )}
          </div>
        )}

        <div className="mb-8 text-center">
          <p className="mb-6 text-lg font-semibold">Explore our services</p>
          <a href="/services" className="inline-block rounded-lg bg-white px-6 py-3 text-base font-bold text-[#172a0f] shadow-md transition hover:bg-gray-50">
            Go to Services
          </a>
        </div>
      </main>
    </div>
  );
}
