'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function ReportsDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await api.getReports();
      if (Array.isArray(data) && data.length > 0) {
        setReports(data);
      } else {
        setReports([
          { _id: '1', logId: 'LOG-501', title: 'Foundation Concrete Pouring Inspection', site: 'CBD Tower A', author: 'Brian Manager', status: 'Pending Review', date: '2026-08-18' },
          { _id: '2', logId: 'LOG-502', title: 'HVAC Piping Alignment Check', site: 'Westlands Complex', author: 'Samuel Mwangi', status: 'Approved', date: '2026-08-19' },
          { _id: '3', logId: 'LOG-503', title: 'Site Drainage System Inspection', site: 'Kilimani Project', author: 'David Ochieng', status: 'Approved', date: '2026-08-20' },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Approved' ? 'Pending Review' : 'Approved';

    // Optimistic UI update
    setReports(reports.map(r => (r._id === id || r.logId === id) ? { ...r, status: newStatus } : r));

    try {
      await api.updateReportStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update status in DB:', err);
    }
  };

  const filteredReports = reports.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.site.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-8 text-center text-gray-500 font-semibold">Loading daily site logs...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Site Reports & Inspection Logs</h2>
          <p className="text-sm text-gray-500 mt-0.5">Filter, review, and approve daily site logs submitted from the field.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <input
          type="text"
          placeholder="Search by log title or site..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending Review">Pending Review</option>
        </select>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
              <th className="py-4 px-6">Log ID</th>
              <th className="py-4 px-6">Report Title</th>
              <th className="py-4 px-6">Site</th>
              <th className="py-4 px-6">Submitted By</th>
              <th className="py-4 px-6 text-right">Status (Click to toggle)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">No matching reports found.</td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report._id || report.logId} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-amber-600 font-bold">{report.logId}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{report.title}</td>
                  <td className="py-4 px-6 text-gray-600">{report.site}</td>
                  <td className="py-4 px-6 text-gray-700">{report.author || 'Site Inspector'}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleToggleStatus(report._id || report.logId, report.status)}
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full transition-transform active:scale-95 cursor-pointer ${
                        report.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {report.status}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}