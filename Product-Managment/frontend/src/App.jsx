import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import AuthRoute from './components/AuthRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminProducts from './pages/AdminProducts';
import AdminCompanies from './pages/AdminCompanies';
import ProductForm from './pages/ProductForm';
import CompanyForm from './pages/CompanyForm';
import CompanyView from './pages/CompanyView';
import GtinVerify from './pages/GtinVerify';
import PublicProduct from './pages/PublicProduct';

const B = '/02_module_b';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={B + '/login'} element={<Login />} />
        <Route path={B + '/products'} element={<AuthRoute><AdminProducts /></AuthRoute>} />
        <Route path={B + '/products/new'} element={<AuthRoute><ProductForm /></AuthRoute>} />
        <Route path={B + '/products/:gtin'} element={<AuthRoute><ProductForm /></AuthRoute>} />
        <Route path={B + '/companies'} element={<AuthRoute><AdminCompanies /></AuthRoute>} />
        <Route path={B + '/companies/new'} element={<AuthRoute><CompanyForm /></AuthRoute>} />
        <Route path={B + '/companies/:id'} element={<AuthRoute><CompanyView /></AuthRoute>} />
        <Route path={B + '/companies/:id/edit'} element={<AuthRoute><CompanyForm /></AuthRoute>} />
        <Route path={B + '/verify'} element={<GtinVerify />} />
        <Route path={B + '/01/:gtin'} element={<PublicProduct />} />
      </Routes>
    </>
  );
}
