import React from 'react';

export default function FinanceDashboard() {
  const financeStats = [
    { label: 'Petty Cash Dispatched', value: 'KES 450,000', change: 'This month', border: 'border-amber-500' },
    { label: 'Material Inventory Value', value: 'KES 2.8M', change: 'In stock across sites', border: 'border-yellow-500' },
    { label: 'Pending Requisitions', value: '6 Items', change: 'Awaiting clearance', border: 'border-orange-500' },
    { label: 'Vault Safety Balance', value: 'KES 120,000', change: 'On-site reserve', border: 'border-amber-600' },
  ];

  const transactions = [
    { id: 'FIN-101', site: 'CBD Tower A', category: 'Material Order', description: '500 Bags Simba Cement', amount: 'KES 375,000', date: '2026-08-08', status: 'Cleared' },
    { id: 'FIN-102', site: 'Westlands Complex', category: 'Petty Cash', description: 'Daily worker lunch & transport allowances', amount: 'KES 18,500', date: '2026-08-08', status: 'Cleared' },
    { id: 'FIN-103', site: 'Kilimani Project', category: 'Vault Deposit', description: 'Emergency site fuel purchase reserve', amount: 'KES 50,000', date: '2026-08-09', status: 'Pending Approval' },
    { id: 'FIN-104', site: 'Industrial Park', category: 'Material Order', description: 'Y12 Reinforcement Steel Bars (12 Tons)', amount: 'KES 1,120,000', date: '2026-08-09', status: 'Pending Approval' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {financeStats.map((stat, idx) => (
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
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Materials & Site Finance</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track inventory movements, petty cash logs, and vault disbursements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg border border-gray-300 transition-all">
            Filter Category
          </button>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all">
            + New Request
          </button>
        </div>
      </div>

      {/* Finance Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Ref ID</th>
                <th className="py-4 px-6">Site Location</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {transactions.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-amber-600 font-bold">{item.id}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{item.site}</td>
                  <td className="py-4 px-6 text-gray-600">{item.category}</td>
                  <td className="py-4 px-6 text-gray-700">{item.description}</td>
                  <td className="py-4 px-6 font-mono font-bold text-gray-900">{item.amount}</td>
                  <td className="py-4 px-6 text-gray-500 font-mono text-xs">{item.date}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                      item.status === 'Cleared'
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