import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import companyRoutes from './routes/companies.js';
import productRoutes from './routes/product.js';
import publicRoutes from './routes/public.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const isProd = process.env.NODE_ENV === 'production';

if (isProd) app.set('trust proxy', 1);

app.use(cors({
    origin: CLIENT_URL.split(',').map(s => s.trim()),
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: isProd ? 'none' : 'lax',
        secure: isProd
    }
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const BASE = '/02_module_b';

app.use(`${BASE}/api/auth`, authRoutes);
app.use(`${BASE}/api/companies`, companyRoutes);
app.use(`${BASE}/api/products`, productRoutes);
app.use(`${BASE}`, publicRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT);
        console.log("MongoDB Connected");
    })
    .catch(() => {
        process.exit(1);
    });
