'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function SitesDashboard() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');

  const fetchSites = async () => {
    try {
      setLoading(true);
      const data = await api.getSites();
      if (Array.isArray(data)) {
        setSites(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleCreateSite = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      siteId: `S-${Math.floor(100 + Math.random() * 900)}`,
      name,
      location,
      budget: `KES ${Number(budget).toLocaleString()}`,
      progress: 0,
      status: 'Active',
    };

    try {
      const savedSite = await api.createSite(payload);
      setSites((prev) => [savedSite, ...prev]);
    } catch (err) {
      console.error('Failed to persist site to DB:', err);
    } finally {
      setName('');
      setLocation('');
      setBudget('');
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const handleDeleteSite = async (id) => {
    if (!confirm('Are you sure you want to delete this site record?')) return;
    try {
      await api.deleteSite(id);
      setSites((prev) => prev.filter((s) => (s._id || s.siteId) !== id));
    } catch (err) {
      console.error('Failed to delete site:', err);
      // Fallback UI deletion
      setSites((prev) => prev.filter((s) => (s._id || s.siteId) !== id));
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-semibold">Loading sites from database...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Active Construction Sites</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track site progress and manage active deployments.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all"
        >
          + Add New Site
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.length === 0 ? (
          <div className="col-span-full bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
            No sites found in database. Click <strong>+ Add New Site</strong> to create one.
          </div>
        ) : (
          sites.map((site) => (
            <div key={site._id || site.siteId} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-600">{site.siteId}</span>
                  <h3 className="text-lg font-bold text-gray-900">{site.name}</h3>
                  <p className="text-xs text-gray-500">{site.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {site.status || 'Active'}
                  </span>
                  <button
                    onClick={() => handleDeleteSite(site._id || site.siteId)}
                    className="text-xs font-bold text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                    title="Delete Site"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-gray-900">{site.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${site.progress || 0}%` }}></div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Budget</span>
                <span className="font-bold text-gray-900">{site.budget}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Register New Site</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateSite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Site Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Upper Hill Tower" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location</label>
                <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Upper Hill, Nairobi" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Estimated Budget (KES)</label>
                <input type="number" required value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. 5000000" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 rounded-lg disabled:opacity-50">
                  {submitting ? 'Creating...' : 'Create Site'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}