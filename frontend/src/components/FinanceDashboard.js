'use client';

import React, { useState } from 'react';

export default function FinanceDashboard() {
  const [requests, setRequests] = useState([
    { ref: 'FIN-101', site: 'CBD Tower A', category: 'Material Order', desc: '500 Bags Simba Cement', amount: 'KES 375,000', date: '2026-08-08', status: 'Cleared' },
    { ref: 'FIN-102', site: 'Westlands Complex', category: 'Petty Cash', desc: 'Daily worker lunch & transport', amount: 'KES 18,500', date: '2026-08-08', status: 'Cleared' },
    { ref: 'FIN-103', site: 'Kilimani Project', category: 'Vault Deposit', desc: 'Emergency site fuel reserve', amount: 'KES 50,000', date: '2026-08-09', status: 'Pending Approval' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [site, setSite] = useState('CBD Tower A');
  const [category, setCategory] = useState('Material Order');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddRequest = (e) => {
    e.preventDefault();
    const newReq = {
      ref: `FIN-10${requests.length + 1}`,
      site,
      category,
      desc,
      amount: `KES ${Number(amount).toLocaleString()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Approval'
    };
    setRequests([newReq, ...requests]);
    setDesc('');
    setAmount('');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Materials & Site Finance</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track inventory movements, petty cash logs, and vault disbursements.</p>
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
              <th className="py-4 px-6">Ref ID</th>
              <th className="py-4 px-6">Site Location</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {requests.map((item) => (
              <tr key={item.ref} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-600 font-bold">{item.ref}</td>
                <td className="py-4 px-6 font-semibold">{item.site}</td>
                <td className="py-4 px-6 text-gray-600">{item.category}</td>
                <td className="py-4 px-6 text-gray-700">{item.desc}</td>
                <td className="py-4 px-6 font-bold text-gray-900">{item.amount}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                    item.status === 'Cleared' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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
              <h3 className="text-lg font-bold text-gray-900">File Requisition Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleAddRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Site</label>
                <select value={site} onChange={(e) => setSite(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option>CBD Tower A</option>
                  <option>Westlands Complex</option>
                  <option>Kilimani Project</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option>Material Order</option>
                  <option>Petty Cash</option>
                  <option>Vault Deposit</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                <input type="text" required value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Purchase of steel bars" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Amount (KES)</label>
                <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 150000" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 rounded-lg">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}