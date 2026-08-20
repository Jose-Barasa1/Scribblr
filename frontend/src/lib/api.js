const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('scribblr_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const api = {
  // Workforce
  getWorkers: async () => {
    const res = await fetch(`${API_BASE}/workforce`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch workforce data');
    return res.json();
  },
  createWorker: async (payload) => {
    const res = await fetch(`${API_BASE}/workforce`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create worker entry');
    return res.json();
  },

  // Sites
  getSites: async () => {
    const res = await fetch(`${API_BASE}/sites`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch sites data');
    return res.json();
  },
  createSite: async (payload) => {
    const res = await fetch(`${API_BASE}/sites`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create site entry');
    return res.json();
  },

  // Finance / Requisitions
  getRequisitions: async () => {
    const res = await fetch(`${API_BASE}/pettycash`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch requisition records');
    return res.json();
  },
  createRequisition: async (payload) => {
    const res = await fetch(`${API_BASE}/pettycash`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to submit requisition request');
    return res.json();
  },

  // Equipment
  getEquipment: async () => {
    const res = await fetch(`${API_BASE}/equipment`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch equipment inventory');
    return res.json();
  },
  createEquipment: async (payload) => {
    const res = await fetch(`${API_BASE}/equipment`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to add equipment asset');
    return res.json();
  },

  // Reports
  getReports: async () => {
    const res = await fetch(`${API_BASE}/reports`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch site reports');
    return res.json();
  },
  updateReportStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/reports/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  }
};