import React from 'react';
import Link from 'next/link';
import ScribbleLogo from './ScribbleLogo';

export default function Navbar() {
  return (
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
        <button className="bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all">
          + New Log
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center cursor-pointer border border-gray-300 hover:border-amber-500 transition-all">
          BM
        </div>
      </div>
    </nav>
  );
}