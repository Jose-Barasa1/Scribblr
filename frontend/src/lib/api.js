const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetcher(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Request Failed');
  }

  return res.json();
}

export const api = {
  // Workforce & Workers
  getWorkers: () => fetcher('/workers'),
  getAttendance: () => fetcher('/attendance'),
  logAttendance: (data) => fetcher('/attendance', { method: 'POST', body: JSON.stringify(data) }),

  // Sites
  getSites: () => fetcher('/sites'),

  // Equipment
  getEquipment: () => fetcher('/equipment'),

  // Reports & Logs
  getDailyLogs: () => fetcher('/daily-logs'),
  createDailyLog: (data) => fetcher('/daily-logs', { method: 'POST', body: JSON.stringify(data) }),

  // Materials & Finance
  getMaterials: () => fetcher('/materials'),
  getPettyCash: () => fetcher('/petty-cash'),
  getVaultItems: () => fetcher('/vault'),
};