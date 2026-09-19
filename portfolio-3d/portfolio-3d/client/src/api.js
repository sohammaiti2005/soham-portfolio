// In development, VITE_API_URL is unset, so requests go to "/api/..." and
// Vite's proxy (see vite.config.js) forwards them to your local backend.
// In production (once deployed), set VITE_API_URL to your live backend's
// URL (e.g. https://your-backend.onrender.com) and requests go straight there.
const BASE = import.meta.env.VITE_API_URL || '';

export async function apiGet(path) {
  const res = await fetch(`${BASE}/api/${path}`);
  if (!res.ok) throw new Error(`Failed to load /api/${path}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}/api/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}
