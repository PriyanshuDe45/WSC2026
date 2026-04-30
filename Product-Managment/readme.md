Product Management Platform

Admin can manage companies and products; the public can verify GTINs and view a public product page.


Environment variables

Both apps read from a local `.env` file. Sample files (`.env.example`) are committed.

Backend — `backend/.env`

MONGO_URI=mongodb://localhost:27017/products_management
SESSION_SECRET=change-me
PORT=5000




 Frontend — `frontend/.env`

VITE_API_URL=/02_module_b
VITE_BACKEND_URL=http://localhost:5000



cd backend
npm install
npm run dev      

```

Backend listens on `http://localhost:5000` and serves the API under `/02_module_b/*`.


Frontend

cd frontend
npm install
npm run dev      

