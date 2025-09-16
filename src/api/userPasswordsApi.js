const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:9090';

export async function getUserPasswords(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}/passwords`);
  if (!res.ok) throw new Error('Failed to fetch user passwords');
  return res.json();
}
