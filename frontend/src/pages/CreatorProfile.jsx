import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, ShoppingBag, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CreatorProfile.css';

const CreatorProfile = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/public/creators/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCreator(data);
                }
            } catch (error) {
                console.error("Error fetching creator:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCreator();
    }, [id]);

    if (loading) return <div className="loading-state">Loading...</div>;
    if (!creator) return <div className="error-state">Creator not found</div>;

    return (
        <div className="creator-profile-page">
            {/* Hero / Cover Section */}
            <div className="profile-banner-container">
                <img
                    src={creator.image || `https://ui-avatars.com/api/?name=${creator.name}&background=1a1c23&color=fff`}
                    alt="Cover"
                    className="profile-banner"
                />
                <div className="banner-overlay"></div>
            </div>

            {/* Profile Header Card */}
            <div className="profile-header-wrapper">
                <div className="profile-header-card animate-slideUp">
                    <div className="profile-avatar-container">
                        <img
                            src={creator.image || `https://ui-avatars.com/api/?name=${creator.name}&background=random`}
                            alt={creator.name}
                            className="profile-avatar"
                        />
                    </div>

                    <div className="profile-content">
                        <div className="creator-identity">
                            <div>
                                <h1 className="creator-name">{creator.name}</h1>
                                <div className="creator-meta">
                                    <span className="creator-category">Influencer</span>
                                    {creator.location && (
                                        <>
                                            <span>•</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <MapPin size={14} /> {creator.location}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="creator-bio">{creator.bio || "Welcome to my exclusive store! Check out my curated collection of products below."}</p>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-value">{creator.Products?.length || 0}</span>
                                <span className="stat-label"><ShoppingBag size={14} /> Products</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">4.9</span>
                                <span className="stat-label"><Star size={14} /> Rating</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">12.5K</span>
                                <span className="stat-label"><Users size={14} /> Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="products-section container">
                <h2 className="section-title">Latest Collections</h2>

                <div className="products-grid">
                    {creator.Products && creator.Products.length > 0 ? (
                        creator.Products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                <div className="product-image-ratio">
                                    <img
                                        src={`http://localhost:8000${product.image}` || `https://placehold.co/600x600?text=${encodeURIComponent(product.name)}`}
                                        alt={product.name}
                                        onError={(e) => { e.target.src = 'https://placehold.co/600x600?text=No+Image'; }}
                                    />
                                </div>
                                <div className="product-details">
                                    <h3 className="product-title">{product.name}</h3>
                                    <div className="product-price">₹{Number(product.price).toLocaleString('en-IN')}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>No products listed yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatorProfile;
