import { HelpCircle, Package, RefreshCw, Truck, Mail } from 'lucide-react';
import './Support.css';

export default function Support() {
    return (
        <div className="support-page animate-fadeIn">
            <div className="container">
                <h1 className="page-title">Help Center</h1>
                <p className="page-subtitle">How can we assist you today?</p>

                <div className="support-grid">
                    <div className="support-card">
                        <div className="icon-wrapper"><Package size={32} /></div>
                        <h3>Order Tracking</h3>
                        <p>Check the status of your recent orders and deliveries.</p>
                        <button className="btn btn-secondary btn-sm">Track Order</button>
                    </div>

                    <div className="support-card">
                        <div className="icon-wrapper"><RefreshCw size={32} /></div>
                        <h3>Returns & Exchanges</h3>
                        <p>Start a return or learn about our 30-day policy.</p>
                        <button className="btn btn-secondary btn-sm">Start Return</button>
                    </div>

                    <div className="support-card">
                        <div className="icon-wrapper"><Truck size={32} /></div>
                        <h3>Shipping Info</h3>
                        <p>Delivery times, rates, and international shipping details.</p>
                        <button className="btn btn-secondary btn-sm">View Rates</button>
                    </div>

                    <div className="support-card">
                        <div className="icon-wrapper"><HelpCircle size={32} /></div>
                        <h3>FAQs</h3>
                        <p>Find answers to the most common questions.</p>
                        <button className="btn btn-secondary btn-sm">Browse FAQs</button>
                    </div>
                </div>

                <div className="contact-section">
                    <h2>Still need help?</h2>
                    <p>Our support team is available 24/7.</p>
                    <button className="btn btn-primary contact-btn">
                        <Mail size={20} /> Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}
