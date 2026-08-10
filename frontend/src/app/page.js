import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const stats = [
    { label: 'Total Workers On Site', value: '142', change: '+12 today', border: 'border-amber-500', link: '/workforce' },
    { label: 'Active Site Locations', value: '6', change: 'All active', border: 'border-yellow-500', link: '/sites' },
    { label: 'Heavy Equipment In Use', value: '18', change: '2 in maintenance', border: 'border-orange-500', link: '/equipment' },
    { label: 'Pending Safety Checks', value: '3', change: 'Action required', border: 'border-amber-600', link: '/reports' },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-16 pb-12 px-4 text-center border-b border-gray-100 bg-gray-50/50">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold tracking-wide uppercase mb-4">
          <span>Scribble Platform</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 max-w-4xl leading-tight mb-4">
          From blueprint to build, <span className="text-amber-500">automated.</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-6 font-normal">
          Comprehensive civil engineering site management. Control daily logs, track heavy equipment, and optimize site workforce from one centralized workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/workforce" className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-md transition-all text-center">
            Open Site Dashboard
          </Link>
          <Link href="/sites" className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl border border-gray-300 shadow-sm transition-all text-center">
            View Active Projects
          </Link>
        </div>
      </section>

      {/* Operations Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Operations Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <Link
              key={idx}
              href={stat.link}
              className={`bg-white border-l-4 ${stat.border} p-5 rounded-xl border-t border-r border-b border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all block`}
            >
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
              <p className="text-xs text-amber-600 mt-1 font-semibold">{stat.change} &rarr;</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}