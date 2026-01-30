import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CreatorSection from './components/CreatorSection';
import ProductSection from './components/ProductSection';
import CreatorCTA from './components/CreatorCTA';
import Footer from './components/Footer';
import Discover from './pages/Discover';
import Shopping from './pages/Shopping';

import CreatorProfile from './pages/CreatorProfile';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';
import Checkout from './pages/Checkout';
// New imports
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';



// Placeholder Pages
const Live = () => <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h1>Live Streams Coming Soon 🎥</h1></div>;
const Support = () => <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h1>Support Center 🛠️</h1></div>;
const Legal = () => <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h1>Legal & Privacy ⚖️</h1></div>;
const CreatorJoin = () => <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h1>Join as a Creator 🚀</h1></div>;


export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <CreatorSection />
              <ProductSection />
              <CreatorCTA />
            </>
          } />

          {/* Public Routes */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/shop" element={<Shopping />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/live" element={<Live />} />
          <Route path="/support" element={<Support />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/join-creator" element={<CreatorJoin />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />



          {/* Protected Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );

}
