import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

const toCompanyJSON = (c) => {
  if (!c) return null;
  return {
    companyName: c.companyName,
    companyAddress: c.companyAddress,
    companyTelephone: c.companyTelephone,
    companyEmail: c.companyEmail,
    owner: {
      name: c.owner?.name,
      mobileNumber: c.owner?.mobileNumber,
      email: c.owner?.email
    },
    contact: {
      name: c.contact?.name,
      mobileNumber: c.contact?.mobileNumber,
      email: c.contact?.email
    }
  };
};

const toProductJSON = (p) => ({
  name: { en: p.name?.en || '', fr: p.name?.fr || '' },
  description: { en: p.description?.en || '', fr: p.description?.fr || '' },
  gtin: p.gtin,
  brand: p.brand,
  countryOfOrigin: p.countryOfOrigin,
  weight: {
    gross: p.weight?.gross,
    net: p.weight?.net,
    unit: p.weight?.unit
  },
  image: p.image,
  company: toCompanyJSON(p.company)
});

router.get('/products.json', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = 10;
  const query = (req.query.query || '').trim();

  const filter = { hidden: false };
  if (query) {
    const rx = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { 'name.en': rx },
      { 'name.fr': rx },
      { 'description.en': rx },
      { 'description.fr': rx }
    ];
  }

  const total = await Product.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const products = await Product.find(filter)
    .populate('company')
    .skip((page - 1) * perPage)
    .limit(perPage);

  const base = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const buildUrl = (p) => {
    const params = new URLSearchParams();
    params.set('page', String(p));
    if (query) params.set('query', query);
    return `${base}?${params.toString()}`;
  };

  res.json({
    data: products.map(toProductJSON),
    pagination: {
      current_page: page,
      total_pages: totalPages,
      per_page: perPage,
      next_page_url: page < totalPages ? buildUrl(page + 1) : null,
      prev_page_url: page > 1 ? buildUrl(page - 1) : null
    }
  });
});

router.get('/products/:gtin.json', async (req, res) => {
  const product = await Product.findOne({ gtin: req.params.gtin, hidden: false }).populate('company');
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(toProductJSON(product));
});

router.post('/api/verify', async (req, res) => {
  const { gtins } = req.body || {};
  if (!Array.isArray(gtins)) return res.status(400).json({ error: 'gtins must be an array' });

  const results = [];
  for (const raw of gtins) {
    const gtin = String(raw || '').trim();
    if (!gtin) continue;
    const product = await Product.findOne({ gtin, hidden: false });
    results.push({ gtin, valid: !!product });
  }
  const allValid = results.length > 0 && results.every(r => r.valid);
  res.json({ results, allValid });
});

export default router;
