import React from 'react';

export default function ReportsDashboard() {
  const reportStats = [
    { label: 'Daily Logs Filed', value: '48', change: 'This week', border: 'border-amber-500' },
    { label: 'Pending Approvals', value: '5', change: 'Requires engineer review', border: 'border-yellow-500' },
    { label: 'Safety Incidents', value: '0', change: 'Zero harm target', border: 'border-emerald-500' },
    { label: 'Exported PDF Summary', value: '12', change: 'Generated today', border: 'border-amber-600' },
  ];

  const logs = [
    { id: 'LOG-801', site: 'CBD Tower A', author: 'David Ochieng', date: '2026-08-08', shift: 'Day Shift', status: 'Approved' },
    { id: 'LOG-802', site: 'Westlands Complex', author: 'Samuel Mwangi', date: '2026-08-08', shift: 'Day Shift', status: 'Approved' },
    { id: 'LOG-803', site: 'Kilimani Project', author: 'Kevin Kiprop', date: '2026-08-09', shift: 'Day Shift', status: 'Pending Review' },
    { id: 'LOG-804', site: 'Industrial Park', author: 'Peter Kamau', date: '2026-08-09', shift: 'Night Shift', status: 'Pending Review' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {reportStats.map((stat, idx) => (
          <div key={idx} className={`bg-white border-l-4 ${stat.border} p-5 rounded-xl border-t border-r border-b border-gray-200 shadow-sm`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-amber-600 mt-1 font-semibold">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Site Logs & Reports</h2>
          <p className="text-sm text-gray-500 mt-0.5">Review field manager submissions, site diaries, and audit records.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg border border-gray-300 transition-all">
            Download PDF
          </button>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all">
            + File New Log
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Log ID</th>
                <th className="py-4 px-6">Site Location</th>
                <th className="py-4 px-6">Submitted By</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Shift</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {logs.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-amber-600 font-bold">{item.id}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{item.site}</td>
                  <td className="py-4 px-6 text-gray-600">{item.author}</td>
                  <td className="py-4 px-6 text-gray-700 font-mono text-xs">{item.date}</td>
                  <td className="py-4 px-6 text-gray-600">{item.shift}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                      item.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}