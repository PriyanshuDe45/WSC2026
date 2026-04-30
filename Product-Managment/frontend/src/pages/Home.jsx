import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Product Management</h2>
      <Link to="/02_module_b/verify">Verify GTIN</Link> | <Link to="/02_module_b/login">Admin</Link>
    </div>
  );
}
