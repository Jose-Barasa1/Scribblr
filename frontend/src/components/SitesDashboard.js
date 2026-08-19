'use client';

import React, { useState } from 'react';

export default function SitesDashboard() {
  const [sites, setSites] = useState([
    { id: 'SIT-01', name: 'CBD Tower A', location: 'Nairobi CBD', foreman: 'David Ochieng', workers: 45, progress: 75, status: 'Active' },
    { id: 'SIT-02', name: 'Westlands Commercial Hub', location: 'Westlands', foreman: 'Samuel Mwangi', workers: 38, progress: 40, status: 'Active' },
    { id: 'SIT-03', name: 'Kilimani Project', location: 'Kilimani', foreman: 'Kevin Kiprop', workers: 22, progress: 90, status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [foreman, setForeman] = useState('');
  const [workers, setWorkers] = useState(10);

  const handleAddSite = (e) => {
    e.preventDefault();
    const newSite = {
      id: `SIT-0${sites.length + 1}`,
      name,
      location,
      foreman,
      workers: Number(workers),
      progress: 0,
      status: 'Active'
    };
    setSites([newSite, ...sites]);
    setName('');
    setLocation('');
    setForeman('');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Active Construction Sites</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage site progress, foreman assignments, and active rosters.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all"
        >
          + Add New Site
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div key={site.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600">{site.id}</span>
                <h3 className="text-lg font-bold text-gray-900">{site.name}</h3>
                <p className="text-xs text-gray-500">{site.location}</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {site.status}
              </span>
            </div>

            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between"><span>Site Foreman:</span> <strong className="text-gray-900">{site.foreman}</strong></div>
              <div className="flex justify-between"><span>Assigned Workers:</span> <strong className="text-gray-900">{site.workers} On Site</strong></div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Completion Progress</span>
                <span>{site.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${site.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Register New Site</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <form onSubmit={handleAddSite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Site Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Upper Hill Tower" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location</label>
                <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Upper Hill, Nairobi" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Assigned Foreman</label>
                <input type="text" required value={foreman} onChange={(e) => setForeman(e.target.value)} placeholder="Foreman Full Name" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Initial Worker Roster</label>
                <input type="number" min="1" value={workers} onChange={(e) => setWorkers(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 rounded-lg">Create Site</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}