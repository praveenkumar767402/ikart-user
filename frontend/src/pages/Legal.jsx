import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Legal() {
    return (
        <div className="legal-page animate-fadeIn" style={{ paddingTop: '2rem', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-light)', marginBottom: '2rem', textDecoration: 'none' }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Legal Information</h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>Last updated: March 15, 2026</p>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Privacy Policy</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        At Influencer Kart, we take your privacy seriously. This policy describes how we collect, use, and handle your data.
                        We use secure encryption to protect your personal information and do not share your data with third parties without consent.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                        We collect data to improve your shopping experience, process orders, and provide personalized recommendations from your favorite creators.
                    </p>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Terms of Service</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        By using our platform, you agree to our terms. You must be at least 13 years old to use this service.
                        Creators are responsible for the authenticity of their curated lists.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Cookie Policy</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                        We use cookies to remember your preferences, cart items, and login status. By continuing to use our site, you accept our use of cookies.
                    </p>
                </section>
            </div>
        </div>
    );
}
