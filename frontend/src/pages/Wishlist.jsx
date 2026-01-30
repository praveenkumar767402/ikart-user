import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './Wishlist.css';

export default function Wishlist() {
    const { wishlist, removeFromWishlist, addToCart } = useStore();

    return (
        <div className="wishlist-page animate-fadeIn">
            <div className="container">
                <h1 className="page-title">My Wishlist ({wishlist.length})</h1>

                {wishlist.length > 0 ? (
                    <div className="wishlist-grid">
                        {wishlist.map((item) => {
                            const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
                            return (
                                <div key={item.id} className="wishlist-card">
                                    <Link to={`/product/${item.id}`} className="w-image-wrapper">
                                        <img src={item.image} alt={item.name} />
                                        {/* {item.badge && <span className="w-badge">{item.badge}</span>} */}
                                    </Link>

                                    <div className="w-details">
                                        <div className="w-meta">
                                            <span className="w-creator">by {item.creator}</span>
                                            <button
                                                className="w-remove-btn"
                                                title="Remove from Wishlist"
                                                onClick={() => removeFromWishlist(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <h3 className="w-title">
                                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                                        </h3>

                                        <div className="w-footer">
                                            <span className="w-price">${price.toFixed(2)}</span>
                                            <button
                                                className="btn btn-sm btn-primary w-add-btn"
                                                onClick={() => addToCart(item)}
                                            >
                                                <ShoppingCart size={16} /> Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="wishlist-empty">
                        <Heart size={64} className="empty-icon" />
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you love to revisit them later.</p>
                        <Link to="/discover" className="btn btn-primary">Start Shopping</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
