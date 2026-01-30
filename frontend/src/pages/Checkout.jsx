import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
    const { cart, clearCart } = useStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = cart.reduce((acc, item) => {
        const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[₹$]/g, '')) : item.price;
        return acc + (price * item.quantity);
    }, 0);
    const shipping = 10.00;
    const total = subtotal + shipping;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            alert('Order Placed Successfully! (Simulation)');
            navigate('/');
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-page container">
                <div className="empty-state">
                    <h2>Your Cart is Empty</h2>
                    <Link to="/shop" className="btn btn-primary">Go Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page animate-fadeIn">
            <div className="container">
                <h1 className="page-title">Checkout</h1>

                <div className="checkout-grid">
                    {/* Left Column: Forms */}
                    <div className="checkout-forms">
                        {/* Steps Indicator */}
                        <div className="checkout-steps">
                            <div className={`step ${step >= 1 ? 'active' : ''}`}>
                                <div className="step-icon"><Truck size={18} /></div>
                                <span>Shipping</span>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step ${step >= 2 ? 'active' : ''}`}>
                                <div className="step-icon"><CreditCard size={18} /></div>
                                <span>Payment</span>
                            </div>
                        </div>

                        {step === 1 && (
                            <form className="shipping-form animate-slideUp" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                <h3>Shipping Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" required placeholder="John" />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" required placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" required placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" required placeholder="123 Main St" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input type="text" required placeholder="New York" />
                                    </div>
                                    <div className="form-group">
                                        <label>Zip Code</label>
                                        <input type="text" required placeholder="10001" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Continue to Payment
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form className="payment-form animate-slideUp" onSubmit={handlePlaceOrder}>
                                <h3>Payment Details</h3>
                                <div className="payment-alert">
                                    <ShieldCheck size={20} />
                                    <span>Payments are processing securely via Stripe (Simulated)</span>
                                </div>

                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input type="text" placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group">
                                        <label>CVC</label>
                                        <input type="text" placeholder="123" />
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                                        Back
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-block" disabled={isProcessing}>
                                        {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="order-summary-card">
                        <h3>Order Summary</h3>
                        <div className="cart-mini-list">
                            {cart.map((item) => (
                                <div key={item.id} className="mini-item">
                                    <div className="mini-img">
                                        <img src={item.image} alt={item.name} />
                                        <span className="mini-qty">{item.quantity}</span>
                                    </div>
                                    <div className="mini-info">
                                        <span>{item.name}</span>
                                        <span className="mini-price">
                                            ₹{(typeof item.price === 'string' ? parseFloat(item.price.replace(/[₹$]/g, '')) : item.price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>₹{shipping.toFixed(2)}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
