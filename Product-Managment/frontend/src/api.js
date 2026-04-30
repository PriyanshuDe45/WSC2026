import { useEffect, useState } from 'react';

const B = import.meta.env.VITE_API_URL ;

const j = (p, o = {}) => fetch(B + p, { credentials: 'include', ...o }).then(r => r.json());
const jb = (p, m, b) => j(p, { method: m, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) });
const fb = (p, m, d, img) => { const f = new FormData(); f.append('data', JSON.stringify(d)); if (img) f.append('image', img); return j(p, { method: m, body: f }); };

export const useAuth = () => {
  const [a, s] = useState(null);
  useEffect(() => { j('/api/auth/me').then(d => s(!!d.isAdmin)).catch(() => s(false)); }, []);
  return a;
};

export const login = (p) => fetch(B + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ passphrase: p }) }).then(r => r.ok);
export const logout = () => j('/api/auth/logout', { method: 'POST' });

export const getProducts = () => j('/api/products');
export const getProduct = (g) => j('/api/products/' + g);
export const createProduct = (d, i) => fb('/api/products', 'POST', d, i);
export const updateProduct = (g, d, i) => fb('/api/products/' + g, 'PUT', d, i);
export const hideProduct = (g) => j('/api/products/' + g + '/hide', { method: 'POST' });
export const unhideProduct = (g) => j('/api/products/' + g + '/unhide', { method: 'POST' });
export const deleteProduct = (g) => j('/api/products/' + g, { method: 'DELETE' });

export const getCompanies = (d = false) => j('/api/companies?deactivated=' + d);
export const getCompany = (i) => j('/api/companies/' + i);
export const createCompany = (d) => jb('/api/companies', 'POST', d);
export const updateCompany = (i, d) => jb('/api/companies/' + i, 'PUT', d);
export const deactivateCompany = (i) => j('/api/companies/' + i + '/deactivate', { method: 'POST' });
export const activateCompany = (i) => j('/api/companies/' + i + '/activate', { method: 'POST' });

export const getPublicProduct = (g) => fetch(B + '/products/' + g + '.json').then(r => r.ok ? r.json() : null);
export const verifyGTINs = (g) => jb('/api/verify', 'POST', { gtins: g });
