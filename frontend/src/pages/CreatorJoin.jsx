import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreatorJoin() {
    return (
        <div className="join-page animate-fadeIn" style={{ minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                <div style={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6B46C1, #EC4899)',
                    marginBottom: '2rem',
                    color: 'white'
                }}>
                    <Sparkles size={40} />
                </div>

                <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Start Your Creator Journey</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '3rem', lineHeight: '1.6' }}>
                    Join top influencers who are monetizing their taste. Build your personalized shop, curate products you love, and earn commissions on every sale.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem', textAlign: 'left' }}>
                    <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)', borderRadius: '1rem', border: '1px solid rgba(139,92,246,0.1)' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Check size={20} color="#10B981" /> Instant Storefront
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Launch your branded shop in minutes. No coding required.</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)', borderRadius: '1rem', border: '1px solid rgba(139,92,246,0.1)' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Check size={20} color="#10B981" /> Passive Income
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Earn up to 10% commission on all products you curate.</p>
                    </div>
                </div>

                <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                    Apply Now <ArrowRight size={20} />
                </button>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary-light)' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
}
