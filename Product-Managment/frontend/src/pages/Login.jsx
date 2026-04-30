import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const [p, setP] = useState('');
  const [e, setE] = useState('');
  const nav = useNavigate();

  const submit = async (ev) => {
    ev.preventDefault();
    if (await login(p)) nav('/02_module_b/products');
    else setE('Invalid passphrase');
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Passphrase" />
      <button>Login</button>
      {e && <p className="err">{e}</p>}
    </form>
  );
}
