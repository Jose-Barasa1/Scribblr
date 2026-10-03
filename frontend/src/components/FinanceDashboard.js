'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function FinanceDashboard() {
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [site, setSite] = useState('CBD Tower A');

  const fetchRequisitions = async () => {
    try {
      setLoading(true);
      const data = await api.getRequisitions();
      if (Array.isArray(data) && data.length > 0) {
        setRequisitions(data);
      } else {
        setRequisitions([
          { _id: '1', reqId: 'REQ-801', description: 'Emergency Cement Purchase', site: 'CBD Tower A', amount: 'KES 35,000', status: 'Approved' },
          { _id: '2', reqId: 'REQ-802', description: 'Fuel for Excavator Unit 3', site: 'Westlands Complex', amount: 'KES 18,500', status: 'Pending Approval' },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const handleCreateRequisition = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      reqId: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      description,
      site,
      amount: `KES ${Number(amount).toLocaleString()}`,
      status: 'Pending Approval',
    };

    try {
      const savedReq = await api.createRequisition(payload);
      setRequisitions([savedReq, ...requisitions]);
    } catch (err) {
      setRequisitions([payload, ...requisitions]);
    } finally {
      setDescription('');
      setAmount('');
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-semibold">Loading financial requisitions...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Requisitions</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage field petty cash and material disbursements.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all"
        >
          + New Requisition Request
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
              <th className="py-4 px-6">Req ID</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6">Site</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {requisitions.map((req) => (
              <tr key={req._id || req.reqId} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-600 font-bold">{req.reqId}</td>
                <td className="py-4 px-6 font-semibold text-gray-900">{req.description}</td>
                <td className="py-4 px-6 text-gray-600">{req.site}</td>
                <td className="py-4 px-6 font-mono font-bold text-gray-900">{req.amount}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {req.status}
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
              <h3 className="text-lg font-bold text-gray-900">New Requisition Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateRequisition} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Steel Rebar Batch B" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Site</label>
                <select value={site} onChange={(e) => setSite(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option>CBD Tower A</option>
                  <option>Westlands Complex</option>
                  <option>Kilimani Project</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Amount (KES)</label>
                <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 25000" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 rounded-lg disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Requisition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}