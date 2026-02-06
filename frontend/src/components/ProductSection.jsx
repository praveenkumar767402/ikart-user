import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Star } from 'lucide-react';
import './ProductSection.css';

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.slice(0, 8)); // Show top 8
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="product-section">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Trending Creator Picks</h2>
                        <p className="section-subtitle">
                            Discover the hottest products recommended by top creators
                        </p>
                    </div>
                    <Link to="/shop" className="view-all-link">
                        Shop All
                        <ChevronRight size={20} />
                    </Link>
                </div>

                <div className="products-container">
                    <div className="products-scroll">
                        {loading ? (
                            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280' }}>Loading products...</p>
                        ) : products.length === 0 ? (
                            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280' }}>No products available yet.</p>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-wrapper">
                                        <Link to={`/product/${product.id}`}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                            <span className={`product-badge badge-${product.badgeColor || 'blue'}`}>
                                                {product.badge || 'New'}
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="product-info">
                                        <div className="product-creator-wrapper">
                                            <span className="product-creator-link">
                                                by {product.creatorName}
                                            </span>
                                        </div>
                                        <h3 className="product-name">
                                            <Link to={`/product/${product.id}`} className="product-link-overlay">
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <div className="product-footer">
                                            <span className="product-price">₹{Number(product.price).toFixed(2)}</span>
                                            <div className="product-rating">
                                                <Star size={16} fill="currentColor" />
                                                <span>{product.rating || '4.5'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
