'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function WorkforceDashboard() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await api.getWorkers();
        if (Array.isArray(data) && data.length > 0) {
          setWorkers(data);
        } else {
          // Fallback static data if backend MongoDB collection is empty
          setWorkers([
            { id: 'W-101', name: 'David Ochieng', role: 'Site Engineer', site: 'CBD Tower A', status: 'Present' },
            { id: 'W-104', name: 'Samuel Mwangi', role: 'Crane Operator', site: 'Westlands Complex', status: 'Present' },
            { id: 'W-109', name: 'Grace Njeri', role: 'Safety Inspector', site: 'CBD Tower A', status: 'Present' },
            { id: 'W-112', name: 'Kevin Kiprop', role: 'Foreman', site: 'Kilimani Project', status: 'Late' },
            { id: 'W-115', name: 'Peter Kamau', role: 'Masonry Lead', site: 'Westlands Complex', status: 'Absent' },
          ]);
        }
      } catch (err) {
        console.warn('Backend API unavailable, falling back to local roster:', err.message);
        setWorkers([
          { id: 'W-101', name: 'David Ochieng', role: 'Site Engineer', site: 'CBD Tower A', status: 'Present' },
          { id: 'W-104', name: 'Samuel Mwangi', role: 'Crane Operator', site: 'Westlands Complex', status: 'Present' },
          { id: 'W-109', name: 'Grace Njeri', role: 'Safety Inspector', site: 'CBD Tower A', status: 'Present' },
          { id: 'W-112', name: 'Kevin Kiprop', role: 'Foreman', site: 'Kilimani Project', status: 'Late' },
          { id: 'W-115', name: 'Peter Kamau', role: 'Masonry Lead', site: 'Westlands Complex', status: 'Absent' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-semibold">Loading workforce data...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Main Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Workforce & Site Attendance</h2>
          <p className="text-sm text-gray-500 mt-0.5">Real-time daily roster and active site assignments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all">
            + Log Attendance
          </button>
        </div>
      </div>

      {/* Workforce Data Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Worker ID</th>
                <th className="py-4 px-6">Full Name</th>
                <th className="py-4 px-6">Role / Trade</th>
                <th className="py-4 px-6">Assigned Site</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {workers.map((worker) => (
                <tr key={worker._id || worker.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-amber-600 font-bold">{worker.workerId || worker.id}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{worker.name}</td>
                  <td className="py-4 px-6 text-gray-600">{worker.role}</td>
                  <td className="py-4 px-6 text-gray-700">{worker.site || 'Unassigned'}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                        worker.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : worker.status === 'Late'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {worker.status || 'Active'}
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