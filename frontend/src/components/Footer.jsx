import { ArrowRight, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/* Newsletter Section */}
                <div className="newsletter-section">
                    <h3 className="newsletter-title">Newsletter</h3>
                    <p className="newsletter-description">
                        Be the first to stay updated on all<br />
                        exclusive drops and creator launches.
                    </p>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your e-mail"
                            className="newsletter-input"
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Subscribe
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="footer-content">
                    {/* Column 1: Logo & About */}
                    <div className="footer-column">
                        <div className="footer-logo">
                            <span className="logo-icon">✦</span>
                            <span className="logo-text gradient-text">INFLUENCERKART</span>
                        </div>
                        <p className="footer-tagline">
                            The future of people-commerce.<br />
                            Authentic products curated exclusively<br />
                            by the creators you love.
                        </p>
                        <div className="social-links">
                            <a href="#instagram" className="social-link" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#twitter" className="social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#youtube" className="social-link" aria-label="YouTube">
                                <Youtube size={20} />
                            </a>
                            <a href="#facebook" className="social-link" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Shop */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Shop</h4>
                        <ul className="footer-links">
                            <li><Link to="/shop">New Arrivals</Link></li>
                            <li><Link to="/shop">Best Sellers</Link></li>
                            <li><Link to="/shop">Exclusive Drops</Link></li>
                            <li><Link to="/shop">Gift Cards</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Support</h4>
                        <ul className="footer-links">
                            <li><Link to="/support">Order Tracking</Link></li>
                            <li><Link to="/support">Returns & Exchanges</Link></li>
                            <li><Link to="/support">Shipping Information</Link></li>
                            <li><Link to="/support">Help Center</Link></li>
                            <li><Link to="/support">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="copyright">
                        © 2026 InfluencerKart. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <Link to="/legal">Privacy Policy</Link>
                        <span className="divider">•</span>
                        <Link to="/legal">Terms of Service</Link>
                        <span className="divider">•</span>
                        <Link to="/legal">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
