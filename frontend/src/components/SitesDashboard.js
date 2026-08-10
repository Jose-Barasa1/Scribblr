import React from 'react';

export default function SitesDashboard() {
  const siteStats = [
    { label: 'Active Projects', value: '6', change: 'On schedule', border: 'border-amber-500' },
    { label: 'Total Site Crews', value: '12', change: 'Across all locations', border: 'border-yellow-500' },
    { label: 'Active Inspections', value: '4', change: 'Passed today', border: 'border-orange-500' },
    { label: 'Overall Completion', value: '68%', change: 'Target: Q4 2026', border: 'border-amber-600' },
  ];

  const sites = [
    {
      id: 'SIT-01',
      name: 'CBD Tower A',
      location: 'Nairobi CBD',
      foreman: 'David Ochieng',
      progress: 75,
      status: 'Active',
      workers: 45,
    },
    {
      id: 'SIT-02',
      name: 'Westlands Commercial Hub',
      location: 'Westlands',
      foreman: 'Samuel Mwangi',
      progress: 40,
      status: 'Active',
      workers: 38,
    },
    {
      id: 'SIT-03',
      name: 'Kilimani Residential Estate',
      location: 'Kilimani',
      foreman: 'Kevin Kiprop',
      progress: 90,
      status: 'Near Completion',
      workers: 24,
    },
    {
      id: 'SIT-04',
      name: 'Industrial Park Warehouse',
      location: 'Mombasa Road',
      foreman: 'Peter Kamau',
      progress: 15,
      status: 'Initial Phase',
      workers: 35,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {siteStats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white border-l-4 ${stat.border} p-5 rounded-xl border-t border-r border-b border-gray-200 shadow-sm`}
          >
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-amber-600 mt-1 font-semibold">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Active Construction Sites</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage site progress, foreman assignments, and active rosters.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg border border-gray-300 transition-all">
            Export Report
          </button>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all">
            + Add New Site
          </button>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sites.map((site) => (
          <div key={site.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600">{site.id}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">{site.name}</h3>
                <p className="text-sm text-gray-500">{site.location}</p>
              </div>
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                {site.status}
              </span>
            </div>

            <div className="my-4 pt-3 border-t border-gray-100 text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Site Foreman:</span>
                <span className="font-semibold text-gray-900">{site.foreman}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Workers:</span>
                <span className="font-semibold text-gray-900">{site.workers} On Site</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-500">Completion Progress</span>
                <span className="text-gray-900">{site.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${site.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}