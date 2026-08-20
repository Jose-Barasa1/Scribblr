'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function EquipmentDashboard() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [site, setSite] = useState('CBD Tower A');
  const [status, setStatus] = useState('Operational');

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const data = await api.getEquipment();
      if (Array.isArray(data) && data.length > 0) {
        setEquipment(data);
      } else {
        setEquipment([
          { _id: '1', assetId: 'EQ-301', name: 'CAT 320 Excavator', site: 'CBD Tower A', status: 'Operational' },
          { _id: '2', assetId: 'EQ-302', name: 'Liebherr Tower Crane', site: 'Westlands Complex', status: 'Under Maintenance' },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      assetId: `EQ-${Math.floor(100 + Math.random() * 900)}`,
      name,
      site,
      status,
    };

    try {
      const savedAsset = await api.createEquipment(payload);
      setEquipment([savedAsset, ...equipment]);
    } catch (err) {
      setEquipment([payload, ...equipment]);
    } finally {
      setName('');
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-semibold">Loading equipment records...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Equipment & Machinery Tracking</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track heavy machinery deployments and maintenance statuses.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all"
        >
          + Add Equipment
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
              <th className="py-4 px-6">Asset ID</th>
              <th className="py-4 px-6">Equipment Name</th>
              <th className="py-4 px-6">Assigned Site</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {equipment.map((item) => (
              <tr key={item._id || item.assetId} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-600 font-bold">{item.assetId}</td>
                <td className="py-4 px-6 font-semibold text-gray-900">{item.name}</td>
                <td className="py-4 px-6 text-gray-600">{item.site}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                    item.status === 'Operational' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Register Heavy Machinery</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Equipment Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Caterpillar Concrete Pump" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Assigned Site</label>
                <select value={site} onChange={(e) => setSite(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option>CBD Tower A</option>
                  <option>Westlands Complex</option>
                  <option>Kilimani Project</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option>Operational</option>
                  <option>Under Maintenance</option>
                  <option>Decommissioned</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 rounded-lg disabled:opacity-50">
                  {submitting ? 'Registering...' : 'Register Equipment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}