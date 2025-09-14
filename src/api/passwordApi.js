const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:9090';

export async function getPasswords() {
  const res = await fetch(`${API_BASE}/passwords`);
  if (!res.ok) throw new Error('Failed to fetch passwords');
  return res.json();
}

export async function getPassword(id) {
  const res = await fetch(`${API_BASE}/passwords/${id}`);
  if (!res.ok) throw new Error('Failed to fetch password');
  return res.json();
}

export async function createOrUpdatePassword(data) {
  const res = await fetch(`${API_BASE}/passwords`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create/update password');
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function deletePassword(id) {
  const res = await fetch(`${API_BASE}/passwords/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete password');
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
