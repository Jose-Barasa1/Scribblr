'use client';

import React, { useState } from 'react';

export default function NewLogModal({ isOpen, onClose }) {
  const [site, setSite] = useState('CBD Tower A');
  const [logType, setLogType] = useState('Daily Progress');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Log Created!\nSite: ${site}\nType: ${logType}\nNotes: ${notes}`);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200 animate-in fade-in zoom-in duration-150">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Create Field Entry / Daily Log</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Project Site</label>
            <select
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option>CBD Tower A</option>
              <option>Westlands Commercial Hub</option>
              <option>Kilimani Residential</option>
              <option>Industrial Park Warehouse</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Log Type</label>
            <select
              value={logType}
              onChange={(e) => setLogType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option>Daily Progress</option>
              <option>Safety Inspection</option>
              <option>Material Delivery</option>
              <option>Equipment Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Field Notes & Summary</label>
            <textarea
              required
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detail site activity, weather delay, or deliveries..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-sm"
            >
              Submit Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}