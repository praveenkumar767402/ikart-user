import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="container hero-content animate-fadeIn">
                <div className="hero-badge">✦ EXCLUSIVE NEW</div>
                <h1 className="hero-title">
                    SHOP THE <span className="gradient-text">FEED</span>:<br />
                    THE SUMMER DROP
                </h1>
                <p className="hero-description">
                    Curated by the dig's elite. Limited edition collections from<br />
                    your favorite creators, available exclusively on our platform.
                </p>
                <div className="hero-cta">
                    <Link to="/shop" className="btn btn-primary">
                        Shop Now
                        <ArrowRight size={20} />
                    </Link>
                    <Link to="/discover" className="btn btn-secondary">
                        View Lookbook
                    </Link>
                </div>
            </div>
        </section>
    );
}
