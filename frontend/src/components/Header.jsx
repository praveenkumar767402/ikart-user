import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, LogIn } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
    const { cartCount, wishlistCount } = useStore();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchTerm.trim()) {
                navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            }
        }
    };

    return (
        <header className="header">
            <div className="container header-content">
                {/* Logo */}
                <Link to="/" className="logo">
                    <span className="logo-icon">✦</span>
                    <span className="logo-text gradient-text">INFLUENCERKART</span>
                </Link>

                {/* Search Bar */}
                <div className="search-bar">
                    <Search size={20} onClick={handleSearch} style={{ cursor: 'pointer' }} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>

                {/* Navigation */}
                <nav className="nav-links">
                    <Link to="/discover">Discover</Link>
                    <Link to="/shop">NewDrops</Link>
                    <Link to="/live" className="live-badge">
                        Live
                        <span className="pulse-dot"></span>
                    </Link>
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
                        <Heart size={22} />
                        {wishlistCount > 0 && <span className="notification-badge">{wishlistCount}</span>}
                    </Link>
                    <Link to="/cart" className="icon-btn" aria-label="Shopping Cart">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && <span className="notification-badge">{cartCount}</span>}
                    </Link>

                    {user ? (
                        <Link to="/profile" className="icon-btn profile-btn" aria-label="Profile" title={user.name}>
                            <User size={22} />
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem' }}>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
