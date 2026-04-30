import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompany, deactivateCompany, activateCompany } from '../api';

export default function CompanyView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [d, setD] = useState({ company: {}, products: [] });
  const load = () => getCompany(id).then(setD);
  useEffect(() => { load(); }, [id]);

  const toggle = async () => {
    await (d.company.deactivated ? activateCompany : deactivateCompany)(id);
    load();
  };
  const c = d.company;

  return (
    <div>
      <h2>{c.companyName}</h2>
      <p>{c.companyAddress}</p>
      <p>{c.companyTelephone} | {c.companyEmail}</p>
      <p>Owner: {c.owner?.name} ({c.owner?.email})</p>
      <p>Contact: {c.contact?.name} ({c.contact?.email})</p>
      <button onClick={toggle}>{c.deactivated ? 'Activate' : 'Deactivate'}</button>
      <button onClick={() => nav('/02_module_b/companies/' + id + '/edit')}>Edit</button>
      <h3>Products</h3>
      <table>
        <thead><tr><th>GTIN</th><th>Name</th></tr></thead>
        <tbody>{d.products.map(p => <tr key={p.gtin}><td>{p.gtin}</td><td>{p.name?.en}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
