import { useState } from 'react';
import { verifyGTINs } from '../api';

export default function GtinVerify() {
  const [t, setT] = useState('');
  const [r, setR] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setR(await verifyGTINs(t.split('\n').map(s => s.trim()).filter(Boolean)));
  };

  return (
    <div>
      <h2>GTIN Verify</h2>
      <form onSubmit={submit}>
        <textarea rows="6" value={t} onChange={e => setT(e.target.value)} placeholder="One GTIN per line" />
        <button>Verify</button>
      </form>
      {r && <>
        {r.allValid && <p className="ok">All valid ✓</p>}
        <ul>{r.results.map((x, i) => (
          <li key={i} className={x.valid ? 'ok' : 'err'}>{x.gtin}: {x.valid ? '✓' : '✗'}</li>
        ))}</ul>
      </>}
    </div>
  );
}
