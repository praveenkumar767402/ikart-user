import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import './Shopping.css';

export default function Shopping() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/public/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.creatorName && product.creatorName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        if (query) {
            setSearchParams({ search: query });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className="shopping-page animate-fadeIn">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Shop Products</h1>
                    <p className="page-subtitle">
                        {searchQuery
                            ? `Showing results for "${searchQuery}"`
                            : "Curated collections from the world's best creators."}
                    </p>

                    {/* Filters Bar */}
                    <div className="filters-bar">
                        <div className="search-wrapper">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="filter-actions">
                            <button className="btn btn-secondary filter-btn">
                                <Filter size={18} />
                                All Categories
                            </button>
                            <button className="btn btn-secondary filter-btn">
                                Sort By: Recent
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container">
                {loading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="error-state">
                        <AlertCircle size={48} />
                        <p>Failed to load products. Please try again later.</p>
                        <button className="btn btn-primary" onClick={fetchProducts}>Retry</button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {filteredProducts.length > 0 ? (
                            <div className="products-grid-full">
                                {filteredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`product-card-large animate-slideUp stagger-${(index % 6) + 1}`}
                                    >
                                        <Link to={`/product/${product.id}`} className="product-image-container">
                                            <img
                                                src={product.image || `https://placehold.co/600x400?text=${encodeURIComponent(product.name)}`}
                                                alt={product.name}
                                                className="product-image-large"
                                            />

                                            {product.badge && (
                                                <span className={`product-badge badge-${product.badgeColor || 'blue'}`}>
                                                    {product.badge}
                                                </span>
                                            )}

                                            <div className="product-overlay">
                                                <button className="btn btn-primary add-to-cart-btn">
                                                    <ShoppingCart size={18} />
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </Link>

                                        <div className="product-details">
                                            <div className="product-meta">
                                                <span className="product-category">{product.category || 'General'}</span>
                                                <span className="product-creator">
                                                    by <Link to={`/creator/${product.SellerId || ''}`} className="creator-link-shop">{product.creatorName || 'Unknown'}</Link>
                                                </span>
                                            </div>

                                            <h3 className="product-title">
                                                <Link to={`/product/${product.id}`} className="title-link-shop">
                                                    {product.name}
                                                </Link>
                                            </h3>

                                            <div className="product-price-row">
                                                <span className="price-tag-shop">₹{Number(product.price).toFixed(2)}</span>
                                                <div className="rating">
                                                    <Star size={16} fill="currentColor" />
                                                    <span>{product.rating || '4.5'}</span>
                                                    <span className="reviews">({product.reviews || Math.floor(Math.random() * 100)})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
                                <h2>No products found matching "{searchQuery}"</h2>
                                <p>Try checking your spelling or using different keywords.</p>
                                <button
                                    className="btn btn-secondary"
                                    style={{ marginTop: '1rem' }}
                                    onClick={() => setSearchParams({})}
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}



