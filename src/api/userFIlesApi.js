const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:9090';

export async function getUserFiles(userId) {
    const res = await fetch(`${API_BASE}/users/${userId}/files`);
    if (!res.ok) throw new Error('Failed to fetch user files');
    return res.json();
}