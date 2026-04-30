import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, hideProduct, unhideProduct, deleteProduct } from '../api';

export default function AdminProducts() {
  const [list, setList] = useState([]);
  const nav = useNavigate();
  const load = () => getProducts().then(setList);
  useEffect(() => { load(); }, []);

  const act = async (fn, g) => { await fn(g); load(); };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={() => nav('/02_module_b/products/new')}>+ New</button>
      <table>
        <thead><tr><th>GTIN</th><th>Name</th><th>Company</th><th>Hidden</th><th></th></tr></thead>
        <tbody>{list.map(p => (
          <tr key={p.gtin}>
            <td>{p.gtin}</td><td>{p.name?.en}</td><td>{p.company?.companyName}</td><td>{p.hidden ? 'Y' : 'N'}</td>
            <td>
              <button onClick={() => nav('/02_module_b/products/' + p.gtin)}>Edit</button>
              {p.hidden
                ? <><button onClick={() => act(unhideProduct, p.gtin)}>Show</button>
                    <button onClick={() => confirm('Delete?') && act(deleteProduct, p.gtin)}>Del</button></>
                : <button onClick={() => act(hideProduct, p.gtin)}>Hide</button>}
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
