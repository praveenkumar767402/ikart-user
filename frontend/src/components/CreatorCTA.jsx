import { Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CreatorCTA.css';

export default function CreatorCTA() {
    return (
        <section className="creator-cta">
            <div className="container">
                <div className="cta-content">
                    <div className="cta-icon">
                        <Sparkles size={48} />
                    </div>
                    <h2 className="cta-title">Are you a creator?</h2>
                    <p className="cta-description">
                        With Influencer Kart's growing marketplace, transform your influence<br />
                        into income. Launch your store, connect with fans, and start earning today.
                    </p>
                    <div className="cta-actions">
                        <Link to="/join-creator" className="btn btn-primary">
                            <Sparkles size={20} />
                            Start Selling Now
                        </Link>
                        <Link to="/join-creator" className="btn btn-secondary">
                            <BookOpen size={20} />
                            Learn How It Works
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
