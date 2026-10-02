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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    router.push('/login');
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3.5 flex items-center justify-between shadow-sm sticky top-0 z-40">
        {/* Brand Logo & Title */}
        <Link href="/" prefetch={true} className="flex items-center gap-3 cursor-pointer">
          <ScribbleLogo width={36} height={36} />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Scribble
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link href="/" prefetch={true} className="hover:text-amber-600 transition-colors flex items-center gap-1">
            <span>🏠</span> Home
          </Link>
          <Link href="/workforce" prefetch={true} className="hover:text-amber-600 transition-colors">Workforce</Link>
          <Link href="/sites" prefetch={true} className="hover:text-amber-600 transition-colors">Sites</Link>
          <Link href="/equipment" prefetch={true} className="hover:text-amber-600 transition-colors">Equipment</Link>
          <Link href="/reports" prefetch={true} className="hover:text-amber-600 transition-colors">Reports</Link>
          <Link href="/finance" prefetch={true} className="hover:text-amber-600 transition-colors">Finance & Materials</Link>
        </div>

        {/* Action Controls & User Avatar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="hidden sm:inline-block bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
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
                className="hidden sm:inline-block text-xs text-gray-500 hover:text-rose-600 font-medium ml-1"
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="text-xl font-bold">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-3 text-sm font-semibold text-gray-700 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-600 font-bold border-b border-gray-100"
          >
            🏠 Home Dashboard
          </Link>
          <Link href="/workforce" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-amber-600">Workforce</Link>
          <Link href="/sites" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-amber-600">Sites</Link>
          <Link href="/equipment" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-amber-600">Equipment</Link>
          <Link href="/reports" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-amber-600">Reports</Link>
          <Link href="/finance" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-amber-600">Finance & Materials</Link>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLogModalOpen(true);
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold py-2 rounded-lg shadow-sm"
            >
              + New Log
            </button>
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left py-1.5 text-xs text-rose-600 font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Global New Log Modal */}
      <NewLogModal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} />
    </>
  );
}