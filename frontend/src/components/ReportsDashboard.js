'use client';

import React, { useState } from 'react';

export default function ReportsDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [reports, setReports] = useState([
    { id: 'LOG-801', site: 'CBD Tower A', author: 'David Ochieng', date: '2026-08-08', shift: 'Day Shift', status: 'Approved' },
    { id: 'LOG-802', site: 'Westlands Complex', author: 'Samuel Mwangi', date: '2026-08-08', shift: 'Day Shift', status: 'Approved' },
    { id: 'LOG-803', site: 'Kilimani Project', author: 'Kevin Kiprop', date: '2026-08-09', shift: 'Day Shift', status: 'Pending Review' },
    { id: 'LOG-804', site: 'Industrial Park', author: 'Peter Kamau', date: '2026-08-09', shift: 'Night Shift', status: 'Pending Review' },
  ]);

  // Toggle Status Directly
  const toggleStatus = (id) => {
    setReports(reports.map(report => {
      if (report.id === id) {
        const nextStatus = report.status === 'Approved' ? 'Pending Review' : 'Approved';
        return { ...report, status: nextStatus };
      }
      return report;
    }));
  };

  // Filter Logic
  const filteredReports = reports.filter(item => {
    const matchesSearch = item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Site Logs & Field Reports</h2>
          <p className="text-sm text-gray-500 mt-0.5">Review field manager submissions, site audit records, and approvals.</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search by log, site, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending Review">Pending Review</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-4 px-6">Log ID</th>
              <th className="py-4 px-6">Site Location</th>
              <th className="py-4 px-6">Submitted By</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Shift</th>
              <th className="py-4 px-6 text-right">Status (Click to Toggle)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-amber-600 font-bold">{report.id}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{report.site}</td>
                  <td className="py-4 px-6 text-gray-600">{report.author}</td>
                  <td className="py-4 px-6 text-gray-700">{report.date}</td>
                  <td className="py-4 px-6 text-gray-600">{report.shift}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => toggleStatus(report.id)}
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer shadow-sm ${
                        report.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                      }`}
                    >
                      {report.status}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500 font-medium">
                  No daily logs matching your search filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}