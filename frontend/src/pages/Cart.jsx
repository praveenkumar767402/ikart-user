import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import './Cart.css';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const subtotal = cart.reduce((acc, item) => {
        // Handle price strings like "$89.00"
        const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[₹$]/g, '')) : item.price;
        return acc + (price * item.quantity);
    }, 0);

    const shipping = cart.length > 0 ? 10.00 : 0;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="cart-page animate-fadeIn">
                <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h1>Your Cart is Empty 🛒</h1>
                    <p style={{ margin: '1rem 0 2rem' }}>Looks like you haven't added anything yet.</p>
                    <Link to="/discover" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page animate-fadeIn">
            <div className="container">
                <h1 className="page-title">Shopping Cart ({cart.length})</h1>

                <div className="cart-layout">
                    {/* Cart Items List */}
                    <div className="cart-items">
                        {cart.map((item) => {
                            const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[₹$]/g, '')) : item.price;
                            return (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image-wrapper">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <div className="item-header">
                                            <Link to={`/product/${item.id}`} className="item-name">{item.name}</Link>
                                            <span className="item-price">₹{price.toFixed(2)}</span>
                                        </div>
                                        <p className="item-meta">
                                            {item.features?.[0] || 'Standard'}
                                        </p>
                                        <p className="item-creator">Sold by {item.creator}</p>

                                        <div className="item-actions">
                                            <div className="qty-controls">
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 size={18} />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="cart-summary">
                        <h2 className="summary-title">Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping Estimate</span>
                            <span>₹{shipping.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className="btn btn-primary btn-block checkout-btn">
                            Proceed to Checkout <ArrowRight size={20} />
                        </Link>
                        <p className="secure-text">🔒 Secure Checkout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
