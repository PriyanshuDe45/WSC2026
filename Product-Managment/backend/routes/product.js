import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import Company from '../models/Company.js';
import { requireAdmin } from '../middlewares/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  }
});

const parsePayload = (req) => {
  if (req.body && req.body.data) {
    try { return JSON.parse(req.body.data); } catch { return {}; }
  }
  return req.body || {};
};

const removeImageFile = (relPath) => {
  if (!relPath) return;
  const abs = path.join(__dirname, '..', relPath);
  if (fs.existsSync(abs)) fs.unlinkSync(abs);
};

const router = Router();
router.use(requireAdmin);

router.get('/', async (req, res) => {
  const products = await Product.find().populate('company').sort({ createdAt: -1 });
  res.json(products);
});

router.get('/:gtin', async (req, res) => {
  const product = await Product.findOne({ gtin: req.params.gtin }).populate('company');
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = parsePayload(req);
    if (!data.company) return res.status(400).json({ error: 'Company is required' });

    const company = await Company.findById(data.company);
    if (!company) return res.status(400).json({ error: 'Company not found' });
    if (company.deactivated) data.hidden = true;

    if (req.file) data.image = `/uploads/${req.file.filename}`;

    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    if (req.file) removeImageFile(`/uploads/${req.file.filename}`);
    if (err.code === 11000) return res.status(400).json({ error: 'GTIN already exists' });
    res.status(400).json({ error: err.message });
  }
});

router.put('/:gtin', upload.single('image'), async (req, res) => {
  try {
    const data = parsePayload(req);
    const existing = await Product.findOne({ gtin: req.params.gtin });
    if (!existing) return res.status(404).json({ error: 'Not found' });

    if (req.file) {
      removeImageFile(existing.image);
      data.image = `/uploads/${req.file.filename}`;
    }

    Object.assign(existing, data);
    await existing.save();
    res.json(existing);
  } catch (err) {
    if (req.file) removeImageFile(`/uploads/${req.file.filename}`);
    if (err.code === 11000) return res.status(400).json({ error: 'GTIN already exists' });
    res.status(400).json({ error: err.message });
  }
});

router.post('/:gtin/hide', async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { gtin: req.params.gtin },
    { hidden: true },
    { new: true }
  );
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.post('/:gtin/unhide', async (req, res) => {
  const product = await Product.findOne({ gtin: req.params.gtin }).populate('company');
  if (!product) return res.status(404).json({ error: 'Not found' });
  if (product.company?.deactivated) {
    return res.status(400).json({ error: 'Cannot unhide — company is deactivated' });
  }
  product.hidden = false;
  await product.save();
  res.json(product);
});

router.delete('/:gtin/image', async (req, res) => {
  const product = await Product.findOne({ gtin: req.params.gtin });
  if (!product) return res.status(404).json({ error: 'Not found' });
  removeImageFile(product.image);
  product.image = null;
  await product.save();
  res.json(product);
});

router.delete('/:gtin', async (req, res) => {
  const product = await Product.findOne({ gtin: req.params.gtin });
  if (!product) return res.status(404).json({ error: 'Not found' });
  if (!product.hidden) return res.status(400).json({ error: 'Only hidden products can be deleted' });
  removeImageFile(product.image);
  await product.deleteOne();
  res.json({ ok: true });
});

export default router;
