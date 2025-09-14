const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:9090';

export async function getLabels() {
  const res = await fetch(`${API_BASE}/labels`);
  if (!res.ok) throw new Error('Failed to fetch labels');
  return res.json();
}


export async function createLabel(data) {
  const res = await fetch(`${API_BASE}/labels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create label');
  // Handle empty or 204 No Content response
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}


export async function deleteLabel(id) {
  const res = await fetch(`${API_BASE}/labels/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete label');
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
