import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './CreatorSection.css';

const CreatorSection = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/public/creators');
                if (response.ok) {
                    const data = await response.json();
                    setCreators(data.slice(0, 4)); // Show top 4
                }
            } catch (error) {
                console.error("Error fetching creators:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreators();
    }, []);

    return (
        <section className="creator-section">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Top Creators You Can Shop From</h2>
                        <p className="section-subtitle">
                            Explore products from the most loved creators of The Influencer Kart community
                        </p>
                    </div>
                    <Link to="/discover" className="view-all-link">
                        View All Creators
                        <ChevronRight size={20} />
                    </Link>
                </div>

                <div className="creator-grid">
                    {loading ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280' }}>Loading creators...</p>
                    ) : creators.length === 0 ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280' }}>No creators yet. Be the first to join!</p>
                    ) : (
                        creators.map((creator, index) => (
                            <div key={creator.id} className={`creator-card animate-slideUp stagger-${index + 1}`}>
                                <div className="creator-avatar-wrapper">
                                    <img src={creator.image} alt={creator.name} className="creator-avatar" />
                                    <div className="creator-badge">{creator.category}</div>
                                </div>
                                <h3 className="creator-name">{creator.name}</h3>
                                <div className="creator-stats">
                                    <span className="stat">{creator.followers || 'New'} Followers</span>
                                    <span className="stat-divider">•</span>
                                    <span className="stat">10+ Items</span>
                                </div>
                                <Link to={`/creator/${creator.id}`} className="btn btn-small btn-outline">Visit Shop</Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default CreatorSection;
