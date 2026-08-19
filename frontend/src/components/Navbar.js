'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ScribbleLogo from './ScribbleLogo';
import NewLogModal from './NewLogModal';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('scribblr_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('scribblr_token');
    localStorage.removeItem('scribblr_user');
    setUser(null);
    router.push('/login');
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/" prefetch={true} className="flex items-center gap-3 cursor-pointer">
          <ScribbleLogo width={36} height={36} />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Scribble
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <Link href="/workforce" prefetch={true} className="hover:text-amber-600 transition-colors">Workforce</Link>
          <Link href="/sites" prefetch={true} className="hover:text-amber-600 transition-colors">Sites</Link>
          <Link href="/equipment" prefetch={true} className="hover:text-amber-600 transition-colors">Equipment</Link>
          <Link href="/reports" prefetch={true} className="hover:text-amber-600 transition-colors">Reports</Link>
          <Link href="/finance" prefetch={true} className="hover:text-amber-600 transition-colors">Finance & Materials</Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            + New Log
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div
                title={`${user.name} (${user.role})`}
                className="w-9 h-9 rounded-full bg-gray-900 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500 shadow-sm"
              >
                {user.initials || 'BM'}
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-rose-600 font-medium ml-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-700 hover:text-amber-600 px-3 py-1.5"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Global New Log Modal */}
      <NewLogModal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} />
    </>
  );
}