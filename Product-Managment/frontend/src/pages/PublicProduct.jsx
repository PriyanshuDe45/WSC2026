import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicProduct } from '../api';

export default function PublicProduct() {
  const { gtin } = useParams();
  const [p, setP] = useState();
  const [l, setL] = useState('en');

  useEffect(() => { getPublicProduct(gtin).then(setP); }, [gtin]);

  if (p === undefined) return <p>...</p>;
  if (!p) return <h2>Not found</h2>;

  return (
    <div lang={l} style={{ maxWidth: 400 }}>
      <button onClick={() => setL(l === 'en' ? 'fr' : 'en')}>{l === 'en' ? 'FR' : 'EN'}</button>
      <h3>{p.company?.companyName}</h3>
      <h2>{p.name?.[l] || p.name?.en}</h2>
      <p>GTIN: {p.gtin}</p>
      {p.image ? <img src={p.image} alt="" style={{ maxWidth: '100%' }} /> : <p>[no image]</p>}
      <p>{p.description?.[l] || p.description?.en}</p>
      <p>Gross: {p.weight?.gross}{p.weight?.unit}</p>
      <p>Net: {p.weight?.net}{p.weight?.unit}</p>
    </div>
  );
}
