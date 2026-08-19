'use client';

import React, { useState } from 'react';

export default function EquipmentDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const [equipment, setEquipment] = useState([
    { id: 'EQ-201', name: 'CAT 320 Excavator', category: 'Earthmoving', site: 'CBD Tower A', operator: 'Samuel Mwangi', hours: '1,240 hrs', status: 'Active' },
    { id: 'EQ-205', name: 'Komatsu PC200', category: 'Earthmoving', site: 'Westlands Complex', operator: 'John Koech', hours: '890 hrs', status: 'Active' },
    { id: 'EQ-310', name: 'Liebherr Tower Crane', category: 'Lifting', site: 'CBD Tower A', operator: 'Francis Mutua', hours: '2,100 hrs', status: 'Active' },
    { id: 'EQ-104', name: 'CAT CS56B Roller', category: 'Compaction', site: 'Industrial Park', operator: 'Unassigned', hours: '650 hrs', status: 'Maintenance' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Earthmoving');
  const [site, setSite] = useState('CBD Tower A');
  const [operator, setOperator] = useState('');

  const handleAddEquipment = (e) => {
    e.preventDefault();
    const newEq = {
      id: `EQ-${Math.floor(200 + Math.random() * 100)}`,
      name,
      category,
      site,
      operator: operator || 'Unassigned',
      hours: '0 hrs',
      status: 'Active'
    };
    setEquipment([newEq, ...equipment]);
    setName('');
    setOperator('');
    setIsModalOpen(false);
  };

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Heavy Equipment & Machinery</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track deployment, active operators, and maintenance statuses.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search machinery or site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg shadow-sm transition-all"
          >
            + Add Equipment
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
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
            {filteredEquipment.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-600 font-bold">{item.id}</td>
                <td className="py-4 px-6 font-semibold text-gray-900">{item.name}</td>
                <td className="py-4 px-6 text-gray-600">{item.category}</td>
                <td className="py-4 px-6 text-gray-700">{item.site}</td>
                <td className="py-4 px-6 text-gray-700">{item.operator}</td>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Register New Equipment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Equipment Name / Model</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Caterpillar 320" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option>Earthmoving</option>
                  <option>Lifting</option>
                  <option>Compaction</option>
                  <option>Hauling</option>
                </select>
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
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Assigned Operator</label>
                <input type="text" value={operator} onChange={(e) => setOperator(e.target.value)} placeholder="Operator Name (Optional)" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 rounded-lg">Add Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}