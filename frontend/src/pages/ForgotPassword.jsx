import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import './Auth.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [resetLink, setResetLink] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                const data = await res.json();
                setSubmitted(true);
                // For simulation: Store the link in state to display it
                setResetLink(data.resetLink);
            } else {
                const data = await res.json();
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to connect to server');
        }
    };

    if (submitted) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Check Your Email</h2>
                        <p>We've sent password reset instructions to {email}</p>
                        {resetLink && (
                            <div style={{ marginTop: '1rem', padding: '10px', background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: '8px', wordBreak: 'break-all' }}>
                                <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '5px' }}><strong>Simulation Mode:</strong></p>
                                <a href={resetLink} style={{ color: '#15803d', textDecoration: 'underline' }}>Click here to Reset Password</a>
                            </div>
                        )}
                    </div>
                    <div className="auth-footer">
                        <Link to="/login" className="back-link">
                            <ArrowLeft size={16} /> Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Forgot Password?</h2>
                    <p>Enter your email to reset your password</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">
                        Send Reset Link
                    </button>
                </form>

                <div className="auth-footer">
                    <Link to="/login" className="back-link">
                        <ArrowLeft size={16} /> Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
