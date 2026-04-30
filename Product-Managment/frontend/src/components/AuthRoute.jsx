import { Navigate } from 'react-router-dom';
import { useAuth } from '../api';

export default function AuthRoute({ children }) {
  const a = useAuth();
  if (a === null) return <p>...</p>;
  return a ? children : <Navigate to="/02_module_b/login" />;
}
