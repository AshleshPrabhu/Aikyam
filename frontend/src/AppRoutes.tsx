import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/main/Home';
import Products from './pages/main/Products';
import ProductDetail from './pages/main/ProductDetail';
import Orders from './pages/main/Orders';
import Support from './pages/main/Support';
import Regions from './pages/main/Regions';
import Villages from './pages/main/Villages';
import Villagers from './pages/main/Villagers';
import Roadmap from './pages/main/Roadmap';
import SellerDashboard from './pages/seller/Dashboard';
import SellerLogin from './pages/seller/Login';

// Placeholder components that will be implemented later

const Login = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">Login Page - Coming Soon</h1>
  </div>
);

const Register = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">Register Page - Coming Soon</h1>
  </div>
);

const Profile = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">Profile Page - Coming Soon</h1>
  </div>
);

const Cart = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">Cart Page - Coming Soon</h1>
  </div>
);

const Artisans = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">Artisans Page - Coming Soon</h1>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">About Page - Coming Soon</h1>
  </div>
);

// Seller portal placeholder
const SellerListProduct = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">AI Product Listing - Coming Soon</h1>
  </div>
);

const SellerProfile = () => (
  <div className="min-h-screen bg-cream-200 flex items-center justify-center">
    <h1 className="font-headline text-4xl text-brown-800">Seller Profile - Coming Soon</h1>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main/Buyer Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/regions" element={<Regions />} />
      <Route path="/region/:regionId/villages" element={<Villages />} />
      <Route path="/village/:villageId/villagers" element={<Villagers />} />
      <Route path="/village/:villageId/roadmap" element={<Roadmap />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/support" element={<Support />} />
      <Route path="/artisans" element={<Artisans />} />
      <Route path="/about" element={<About />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* User Routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      
      {/* Seller Routes */}
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/seller/list-product" element={<SellerListProduct />} />
      <Route path="/seller/profile" element={<SellerProfile />} />
      
      {/* 404 for unknown routes */}
      <Route path="*" element={
        <div className="min-h-screen bg-cream-200 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-headline text-6xl text-brown-800">404</h1>
            <p className="font-body text-xl text-brown-700">Page Not Found</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary font-body"
            >
              Back to Home
            </button>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;