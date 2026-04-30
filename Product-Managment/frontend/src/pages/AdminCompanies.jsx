import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanies, deactivateCompany, activateCompany } from '../api';

export default function AdminCompanies() {
  const [active, setActive] = useState(true);
  const [list, setList] = useState([]);
  const nav = useNavigate();
  const load = () => getCompanies(!active).then(setList);
  useEffect(() => { load(); }, [active]);

  const toggle = async (c) => {
    await (c.deactivated ? activateCompany : deactivateCompany)(c._id);
    load();
  };

  return (
    <div>
      <h2>Companies ({active ? 'Active' : 'Deactivated'})</h2>
      <button onClick={() => setActive(!active)}>Show {active ? 'Deactivated' : 'Active'}</button>
      <button onClick={() => nav('/02_module_b/companies/new')}>+ New</button>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th></th></tr></thead>
        <tbody>{list.map(c => (
          <tr key={c._id}>
            <td><a href="#" onClick={e => { e.preventDefault(); nav('/02_module_b/companies/' + c._id); }}>{c.companyName}</a></td>
            <td>{c.companyEmail}</td>
            <td><button onClick={() => toggle(c)}>{c.deactivated ? 'Activate' : 'Deactivate'}</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
