import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, RefreshCw, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart, addToWishlist } = useStore();
    const [product, setProduct] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch main product
                const productRes = await fetch(`/api/products/${id}`);
                if (!productRes.ok) throw new Error('Failed to fetch product details');
                const productData = await productRes.json();
                setProduct(productData);
                setActiveImageIndex(0);

                // Fetch suggested products (all products for now, filtered client-side)
                const suggestedRes = await fetch('/api/products');
                if (suggestedRes.ok) {
                    const allProducts = await suggestedRes.json();
                    // Filter out current product and take 4 random/first ones
                    const otherProducts = allProducts.filter(p => p.id !== parseInt(id) && p.id !== productData.id);
                    // Simple shuffle or slice
                    const shuffled = otherProducts.sort(() => 0.5 - Math.random());
                    setSuggestedProducts(shuffled.slice(0, 4));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="product-details-page loading-container">
                <Loader className="spinner" size={48} />
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-details-page error-container">
                <AlertCircle size={48} />
                <h2>{error || 'Product Not Found'}</h2>
                <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="product-details-page animate-fadeIn">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className="current">{product.name}</span>
                </div>

                {/* Main Product Layout */}
                <div className="product-grid">
                    {/* Left: Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image-wrapper">
                            <img
                                src={product.image || `https://placehold.co/600x600?text=${encodeURIComponent(product.name)}`}
                                alt={product.name}
                                className="main-image"
                            />
                        </div>
                        <div className="thumbnail-list">
                            {product.images?.map((img, i) => (
                                <button
                                    key={i}
                                    className={`thumbnail-btn ${i === activeImageIndex ? 'active' : ''}`}
                                    onClick={() => setActiveImageIndex(i)}
                                >
                                    <img src={img} alt={`View ${i}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="product-info-column">
                        <div className="product-header">
                            <span className="product-category-badge">{product.category || 'General'}</span>
                            <h1 className="product-title-large">{product.name}</h1>
                            <div className="product-meta-row">
                                <Link to={`/creator/${product.creatorId || ''}`} className="creator-link-large">
                                    by {product.creatorName || 'Unknown Creator'}
                                </Link>
                                <span className="divider">•</span>
                                <div className="rating-badge">
                                    <Star size={16} fill="currentColor" />
                                    <span>{product.rating || '4.5'}</span>
                                    <span className="review-count">({product.reviews || 0} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="product-price-section">
                            <span className="current-price">₹{Number(product.price).toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="original-price">{product.originalPrice}</span>
                            )}
                        </div>

                        <p className="product-description">{product.description || 'No description available.'}</p>

                        <div className="product-features">
                            {product.features?.map((feature, i) => (
                                <div key={i} className="feature-item">
                                    <ShieldCheck size={16} />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="product-actions">
                            <button
                                className="btn btn-primary btn-large btn-add-cart"
                                onClick={() => addToCart(product)}
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button
                                className="btn btn-secondary btn-icon-only"
                                onClick={() => addToWishlist(product)}
                            >
                                <Heart size={20} />
                            </button>
                        </div>

                        <div className="product-delivery-info">
                            <div className="delivery-item">
                                <Truck size={20} />
                                <div>
                                    <span className="d-title">Free Shipping</span>
                                    <span className="d-desc">On orders over ₹1000</span>
                                </div>
                            </div>
                            <div className="delivery-item">
                                <RefreshCw size={20} />
                                <div>
                                    <span className="d-title">Free Returns</span>
                                    <span className="d-desc">Within 30 days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggested Products */}
                <div className="suggested-products-section">
                    <div className="section-header">
                        <h2 className="section-title">You Might Also Like</h2>
                        <Link to="/shop" className="view-all-link">
                            View All <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="suggested-grid">
                        {suggestedProducts.length > 0 ? (
                            suggestedProducts.map((p) => (
                                <Link to={`/product/${p.id}`} key={p.id} className="suggested-card">
                                    <div className="s-image-wrapper">
                                        <img src={p.image} alt={p.name} />
                                    </div>
                                    <div className="s-info">
                                        <h4 className="s-title">{p.name}</h4>
                                        <span className="s-creator">by {p.creatorName}</span>
                                        <span className="s-price">₹{Number(p.price).toFixed(2)}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No similar products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
