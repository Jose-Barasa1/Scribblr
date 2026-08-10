import React from 'react';

export default function EquipmentDashboard() {
  const equipmentStats = [
    { label: 'Total Units On Site', value: '24', change: 'Across 6 sites', border: 'border-amber-500' },
    { label: 'Active Machinery', value: '18', change: '75% utilization', border: 'border-yellow-500' },
    { label: 'In Maintenance', value: '2', change: 'Scheduled service', border: 'border-orange-500' },
    { label: 'Idle / Standby', value: '4', change: 'Ready for dispatch', border: 'border-amber-600' },
  ];

  const fleet = [
    { id: 'EQ-201', name: 'CAT 320 Excavator', category: 'Earthmoving', site: 'CBD Tower A', operator: 'Samuel Mwangi', status: 'Active', hours: '1,240 hrs' },
    { id: 'EQ-205', name: 'Komatsu PC200', category: 'Earthmoving', site: 'Westlands Complex', operator: 'John Koech', status: 'Active', hours: '890 hrs' },
    { id: 'EQ-310', name: 'Liebherr Tower Crane', category: 'Lifting', site: 'CBD Tower A', operator: 'Francis Mutua', status: 'Active', hours: '2,100 hrs' },
    { id: 'EQ-104', name: 'CAT CS56B Roller', category: 'Compaction', site: 'Industrial Park', operator: 'Unassigned', status: 'Maintenance', hours: '650 hrs' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {equipmentStats.map((stat, idx) => (
          <div key={idx} className={`bg-white border-l-4 ${stat.border} p-5 rounded-xl border-t border-r border-b border-gray-200 shadow-sm`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-amber-600 mt-1 font-semibold">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Heavy Equipment & Machinery</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track deployment, active operators, and maintenance statuses.</p>
        </div>
        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all">
          + Add Equipment
        </button>
      </div>

      {/* Equipment Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Asset ID</th>
                <th className="py-4 px-6">Equipment Name</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Assigned Site</th>
                <th className="py-4 px-6">Operator</th>
                <th className="py-4 px-6">Operating Hours</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {fleet.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-amber-600 font-bold">{item.id}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">{item.name}</td>
                  <td className="py-4 px-6 text-gray-600">{item.category}</td>
                  <td className="py-4 px-6 text-gray-700">{item.site}</td>
                  <td className="py-4 px-6 text-gray-600">{item.operator}</td>
                  <td className="py-4 px-6 font-mono text-xs text-gray-500">{item.hours}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                      item.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
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