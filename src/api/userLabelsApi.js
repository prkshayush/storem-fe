const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:9090';

export async function getUserLabels(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}/labels`);
  if (!res.ok) throw new Error('Failed to fetch user labels');
  return res.json();
}
