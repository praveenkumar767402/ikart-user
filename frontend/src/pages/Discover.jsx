import { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Discover.css';

export default function Discover() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCreators();
    }, []);

    const fetchCreators = async () => {
        try {
            const response = await fetch('/api/creators');
            if (!response.ok) throw new Error('Failed to fetch creators');
            const data = await response.json();
            setCreators(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredCreators = creators.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (creator.bio && creator.bio.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="discover-page animate-fadeIn">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Discover Creators</h1>
                    <p className="page-subtitle">
                        Find and follow your favorite influencers. Shop their exclusive collections.
                    </p>

                    {/* Filters Bar */}
                    <div className="filters-bar">
                        <div className="search-wrapper">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search creators..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="filter-actions">
                            <button className="btn btn-secondary filter-btn">
                                <Filter size={18} />
                                All Categories
                            </button>
                            <button className="btn btn-secondary filter-btn">
                                Sort By: Trending
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Creators Grid */}
            <div className="container">
                {loading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading creators...</p>
                    </div>
                )}

                {error && (
                    <div className="error-state">
                        <AlertCircle size={48} />
                        <p>Failed to load creators. Please try again later.</p>
                        <button className="btn btn-primary" onClick={fetchCreators}>Retry</button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="creators-grid-full">
                        {filteredCreators.map((creator, index) => (
                            <div
                                key={creator.id}
                                className={`creator-card-large animate-slideUp stagger-${(index % 6) + 1}`}
                            >
                                <div className="card-banner" style={{ backgroundColor: `hsl(${index * 45}, 70%, 90%)` }}></div>
                                <div className="card-content">
                                    <div className="avatar-container">
                                        <img src={creator.avatar || `https://ui-avatars.com/api/?name=${creator.name}&background=random`} alt={creator.name} className="creator-avatar" />
                                        {/* Mock Trending Badge for visual consistency */}
                                        {index % 3 === 0 && <span className="trending-badge">Trending</span>}
                                    </div>

                                    <h3 className="creator-name">{creator.name}</h3>
                                    <span className="creator-category">{creator.businessName || 'Influencer'}</span>

                                    <p className="creator-bio">{creator.bio || 'No bio available.'}</p>

                                    <div className="creator-stats-row">
                                        <div className="stat-item">
                                            {/* Mock Stats - In real app, these would come from DB */}
                                            <span className="stat-value">{(index + 1) * 1.5}K</span>
                                            <span className="stat-label">Followers</span>
                                        </div>
                                        <div className="stat-separator"></div>
                                        <div className="stat-item">
                                            <span className="stat-value">{Math.floor(Math.random() * 50) + 5}</span>
                                            <span className="stat-label">Products</span>
                                        </div>
                                    </div>

                                    <Link to={`/creator/${creator.id}`} className="btn btn-primary btn-full">
                                        Visit Shop
                                        <ArrowUpRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && filteredCreators.length === 0 && (
                    <div className="empty-state">
                        <p>No creators found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}



