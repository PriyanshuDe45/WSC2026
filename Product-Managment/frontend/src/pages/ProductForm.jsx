import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, createProduct, updateProduct, getCompanies } from '../api';

const blank = {
  name: { en: '', fr: '' }, description: { en: '', fr: '' },
  gtin: '', brand: '', countryOfOrigin: '',
  weight: { gross: '', net: '', unit: 'g' }, company: ''
};

export default function ProductForm() {
  const { gtin } = useParams();
  const nav = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [img, setImg] = useState(null);
  const [f, setF] = useState(blank);
  const [err, setErr] = useState('');

  useEffect(() => {
    getCompanies().then(setCompanies);
    if (gtin) getProduct(gtin).then(p => setF({
      ...blank, ...p,
      name: { ...blank.name, ...p.name },
      description: { ...blank.description, ...p.description },
      weight: { ...blank.weight, ...p.weight },
      company: p.company?._id || p.company || ''
    }));
  }, [gtin]);

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\d{13,14}$/.test(f.gtin)) return setErr('GTIN must be 13 or 14 digits');
    const d = { ...f, weight: { ...f.weight, gross: +f.weight.gross || 0, net: +f.weight.net || 0 } };
    const r = gtin ? await updateProduct(gtin, d, img) : await createProduct(d, img);
    if (r?.error) return setErr(r.error);
    nav('/02_module_b/products');
  };
  const set = (k, v) => setF({ ...f, [k]: v });
  const setN = (g, k, v) => setF({ ...f, [g]: { ...f[g], [k]: v } });

  return (
    <form onSubmit={submit}>
      <h2>{gtin ? 'Edit' : 'New'} Product</h2>
      <input placeholder="GTIN" value={f.gtin} onChange={e => set('gtin', e.target.value)} disabled={!!gtin} required />
      <input placeholder="Name EN" value={f.name.en} onChange={e => setN('name', 'en', e.target.value)} required />
      <input placeholder="Name FR" value={f.name.fr} onChange={e => setN('name', 'fr', e.target.value)} />
      <textarea placeholder="Desc EN" value={f.description.en} onChange={e => setN('description', 'en', e.target.value)} />
      <textarea placeholder="Desc FR" value={f.description.fr} onChange={e => setN('description', 'fr', e.target.value)} />
      <input placeholder="Brand" value={f.brand} onChange={e => set('brand', e.target.value)} />
      <input placeholder="Country" value={f.countryOfOrigin} onChange={e => set('countryOfOrigin', e.target.value)} />
      <input placeholder="Gross" type="number" step="0.01" value={f.weight.gross} onChange={e => setN('weight', 'gross', e.target.value)} />
      <input placeholder="Net" type="number" step="0.01" value={f.weight.net} onChange={e => setN('weight', 'net', e.target.value)} />
      <input placeholder="Unit" value={f.weight.unit} onChange={e => setN('weight', 'unit', e.target.value)} />
      <select value={f.company} onChange={e => set('company', e.target.value)} required>
        <option value="">-- Company --</option>
        {companies.map(c => <option key={c._id} value={c._id}>{c.companyName}</option>)}
      </select>
      <input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />
      {err && <p className="err">{err}</p>}
      <button>Save</button>
    </form>
  );
}
