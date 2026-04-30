import { Link, useNavigate } from 'react-router-dom';
import { useAuth, logout } from '../api';

const B = '/02_module_b';

export default function Nav() {
  const a = useAuth();
  const nav = useNavigate();
  if (a === null) return null;
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to={B + '/verify'}>Verify</Link>
      {a ? (
        <>
          <Link to={B + '/products'}>Products</Link>
          <Link to={B + '/companies'}>Companies</Link>
          <button onClick={async () => { await logout(); nav('/'); }}>Logout</button>
        </>
      ) : <Link to={B + '/login'}>Login</Link>}
    </nav>
  );
}
