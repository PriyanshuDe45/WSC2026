import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompany, createCompany, updateCompany } from '../api';

const blank = {
  companyName: '', companyAddress: '', companyTelephone: '', companyEmail: '',
  owner: { name: '', mobileNumber: '', email: '' },
  contact: { name: '', mobileNumber: '', email: '' }
};

export default function CompanyForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [f, setF] = useState(blank);

  useEffect(() => { if (id) getCompany(id).then(d => setF({ ...blank, ...d.company })); }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await (id ? updateCompany(id, f) : createCompany(f));
    nav('/02_module_b/companies');
  };
  const set = (k, v) => setF({ ...f, [k]: v });
  const setN = (g, k, v) => setF({ ...f, [g]: { ...f[g], [k]: v } });

  return (
    <form onSubmit={submit}>
      <h2>{id ? 'Edit' : 'New'} Company</h2>
      <input placeholder="Name" value={f.companyName} onChange={e => set('companyName', e.target.value)} required />
      <input placeholder="Address" value={f.companyAddress} onChange={e => set('companyAddress', e.target.value)} />
      <input placeholder="Phone" value={f.companyTelephone} onChange={e => set('companyTelephone', e.target.value)} />
      <input placeholder="Email" value={f.companyEmail} onChange={e => set('companyEmail', e.target.value)} />
      <h4>Owner</h4>
      <input placeholder="Name" value={f.owner.name} onChange={e => setN('owner', 'name', e.target.value)} />
      <input placeholder="Mobile" value={f.owner.mobileNumber} onChange={e => setN('owner', 'mobileNumber', e.target.value)} />
      <input placeholder="Email" value={f.owner.email} onChange={e => setN('owner', 'email', e.target.value)} />
      <h4>Contact</h4>
      <input placeholder="Name" value={f.contact.name} onChange={e => setN('contact', 'name', e.target.value)} />
      <input placeholder="Mobile" value={f.contact.mobileNumber} onChange={e => setN('contact', 'mobileNumber', e.target.value)} />
      <input placeholder="Email" value={f.contact.email} onChange={e => setN('contact', 'email', e.target.value)} />
      <button>Save</button>
    </form>
  );
}
