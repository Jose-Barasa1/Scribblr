'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function WorkforceDashboard() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Worker Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('Site Worker');
  const [site, setSite] = useState('CBD Tower A');
  const [status, setStatus] = useState('Present');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await api.getWorkers();
        if (Array.isArray(data) && data.length > 0) {
          setWorkers(data);
        } else {
          setWorkers([
            { id: 'W-101', name: 'David Ochieng', role: 'Site Engineer', site: 'CBD Tower A', status: 'Present' },
            { id: 'W-104', name: 'Samuel Mwangi', role: 'Crane Operator', site: 'Westlands Complex', status: 'Present' },
            { id: 'W-109', name: 'Grace Njeri', role: 'Safety Inspector', site: 'CBD Tower A', status: 'Present' },
            { id: 'W-112', name: 'Kevin Kiprop', role: 'Foreman', site: 'Kilimani Project', status: 'Late' },
          ]);
        }
      } catch (err) {
        setWorkers([
          { id: 'W-101', name: 'David Ochieng', role: 'Site Engineer', site: 'CBD Tower A', status: 'Present' },
          { id: 'W-104', name: 'Samuel Mwangi', role: 'Crane Operator', site: 'Westlands Complex', status: 'Present' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddWorker = (e) => {
    e.preventDefault();
    const newWorker = {
      id: `W-${Math.floor(100 + Math.random() * 900)}`,
      name,
      role,
      site,
      status
    };
    setWorkers([newWorker, ...workers]);
    setName('');
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-semibold">Loading workforce data...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Workforce & Site Attendance</h2>
          <p className="text-sm text-gray-500 mt-0.5">Real-time daily roster and active site assignments.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all"
        >
          + Log Attendance
        </button>
      </div>

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

      {/* Attendance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Log Worker Attendance</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleAddWorker} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Worker Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Role / Trade</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Masonry Lead"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Assigned Site</label>
                <select
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>CBD Tower A</option>
                  <option>Westlands Complex</option>
                  <option>Kilimani Project</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>Present</option>
                  <option>Late</option>
                  <option>Absent</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-sm"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}