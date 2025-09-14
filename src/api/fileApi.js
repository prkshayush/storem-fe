const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:9090';

export async function getFiles() {
  const res = await fetch(`${API_BASE}/files`);
  if (!res.ok) throw new Error('Failed to fetch files');
  return res.json();
}

export async function createFiles(files) {
  const res = await fetch(`${API_BASE}/files`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(files),
  });
  if (!res.ok) throw new Error('Failed to add files');
  return res.json();
}

export async function deleteFile(id) {
  const res = await fetch(`${API_BASE}/files/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete file');
  return res.json();
}
