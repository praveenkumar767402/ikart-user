import { useState, useEffect } from 'react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Edit2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

export default function UserProfile() {
    const { user, logout, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Edit Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || 'No bio yet.',
        location: user?.location || 'Unknown Location'
    });

    const [addresses, setAddresses] = useState([]);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressForm, setAddressForm] = useState({
        type: 'Home',
        fullName: user?.name || '',
        mobile: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India'
    });

    // Fetch Addresses
    useEffect(() => {
        if (activeTab === 'addresses') {
            fetchAddresses();
        }
    }, [activeTab]);

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem('token');
            // Using absolute URL to bypass potentially stale proxy
            const res = await fetch('http://localhost:5004/api/addresses', {
                headers: { 'x-auth-token': token }
            });
            if (res.ok) {
                const data = await res.json();
                setAddresses(data);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    const handleDeleteAddress = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5004/api/addresses/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            fetchAddresses();
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = editingAddress
                ? `http://localhost:5004/api/addresses/${editingAddress.id}`
                : 'http://localhost:5004/api/addresses';

            const method = editingAddress ? 'PUT' : 'POST';

            console.log('Submitting Address:', addressForm);

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(addressForm)
            });

            if (res.ok) {
                setShowAddressModal(false);
                setEditingAddress(null);
                setAddressForm({
                    type: 'Home',
                    fullName: user?.name || '',
                    mobile: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: 'India'
                });
                fetchAddresses();
            } else {
                const errData = await res.json();
                alert(`Failed to save: ${errData.msg || 'Unknown Error'}`);
                console.error("Save Error Response:", errData);
            }
        } catch (error) {
            console.error("Save Network Error:", error);
            alert(`Network Error: ${error.message}`);
        }
    };

    const openAddressModal = (address = null) => {
        if (address) {
            setEditingAddress(address);
            setAddressForm({
                type: address.type,
                fullName: address.fullName,
                mobile: address.mobile,
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip,
                country: address.country
            });
        } else {
            setEditingAddress(null);
            setAddressForm({
                type: 'Home',
                fullName: user?.name || '',
                mobile: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                country: 'India'
            });
        }
        setShowAddressModal(true);
    };

    // Mock Orders (Keep mocked for now)
    const orders = [
        {
            id: '#ORD-7782',
            date: 'Oct 24, 2025',
            status: 'Delivered',
            total: '$134.00',
            items: ['Neon Solid Oversized Hoodie by @street_style', 'Luminous Glow Serum v2 by @beauty_by_j']
        },
        {
            id: '#ORD-7541',
            date: 'Sept 12, 2025',
            status: 'Delivered',
            total: '$79.00',
            items: ['Urban Explorer Backpack by @life_with_leo']
        }
    ];

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            alert('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null; // Should be handled by ProtectedRoute

    return (
        <div className="user-profile-page animate-fadeIn">
            {/* Address Modal */}
            {showAddressModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                        <form onSubmit={handleAddressSubmit}>
                            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="profile-input"
                                        value={addressForm.fullName}
                                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        className="profile-input"
                                        value={addressForm.mobile}
                                        onChange={(e) => setAddressForm({ ...addressForm, mobile: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    className="profile-input"
                                    value={addressForm.zip}
                                    onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        className="profile-input"
                                        value={addressForm.city}
                                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        className="profile-input"
                                        value={addressForm.state}
                                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Complete Address (House No, Building, Street)</label>
                                <textarea
                                    className="profile-input"
                                    rows="3"
                                    value={addressForm.street}
                                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Address Type</label>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    {['Home', 'Work', 'Other'].map(type => (
                                        <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--up-text-secondary)', fontSize: '0.9rem' }}>
                                            <input
                                                type="radio"
                                                name="addressType"
                                                value={type}
                                                checked={addressForm.type === type}
                                                onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                                            />
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-ghost" onClick={() => setShowAddressModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Address</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="container">
                <h1 className="page-title">My Account</h1>

                {/* User Hero Section */}
                <div className="user-hero-section">
                    <div className="user-header-content">
                        <div className="user-avatar-wrapper">
                            <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} alt={user.name} className="user-profile-avatar" />
                        </div>
                        <div className="user-identity-block">
                            <h2 className="user-name-large">{user.name}</h2>
                            <p className="user-email-large">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-layout">
                    {/* Sidebar Navigation */}
                    <aside className="profile-sidebar">
                        <nav className="profile-nav">
                            <button
                                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                <Package size={18} /> Orders
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
                                onClick={() => setActiveTab('addresses')}
                            >
                                <MapPin size={18} /> Addresses
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings size={18} /> Settings
                            </button>
                            <div className="nav-divider"></div>
                            <button className="nav-item logout" onClick={() => { logout(); navigate('/login'); }}>
                                <LogOut size={18} /> Log Out
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="profile-content">

                        {/* ORDERS SECTION */}
                        {activeTab === 'orders' && (
                            <section className="profile-section">
                                <h2 className="section-header">Order History</h2>
                                <div className="orders-list">
                                    {orders.map((order) => (
                                        <div key={order.id} className="order-card">
                                            <div className="order-header">
                                                <div>
                                                    <span className="order-id">{order.id}</span>
                                                    <span className="order-date">{order.date}</span>
                                                </div>
                                                <span className={`order-status status-${order.status.toLowerCase()}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="order-items">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="order-item-line">• {item}</div>
                                                ))}
                                            </div>
                                            <div className="order-footer">
                                                <span className="order-total">Total: {order.total}</span>
                                                <button className="btn-link">View Details <ChevronRight size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ADDRESSES SECTION */}
                        {activeTab === 'addresses' && (
                            <section className="profile-section">
                                <h2 className="section-header">Saved Addresses</h2>
                                <div className="addresses-grid">
                                    {addresses.length === 0 ? <p className="text-secondary">No addresses saved yet.</p> : null}
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className="address-card">
                                            <div className="address-type">{addr.type}</div>
                                            <div className="address-details" style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.25rem', color: 'var(--up-text-primary)' }}>{addr.fullName}</h4>
                                                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--up-text-secondary)' }}>{addr.mobile}</p>
                                                <p className="address-text" style={{ margin: 0 }}>
                                                    {addr.street}, {addr.city}, {addr.state} - <strong>{addr.zip}</strong>
                                                </p>
                                            </div>
                                            <div className="address-actions">
                                                <button className="btn-link" onClick={() => openAddressModal(addr)}><Edit2 size={14} /> Edit</button>
                                                <button className="btn-link text-danger" onClick={() => handleDeleteAddress(addr.id)}><X size={14} /> Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="add-address-btn" onClick={() => openAddressModal()}>
                                        <div className="plus-icon">+</div>
                                        <span>Add New Address</span>
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* SETTINGS / PROFILE EDIT SECTION */}
                        {activeTab === 'settings' && (
                            <section className="profile-section">
                                <div className="section-header-row">
                                    <h2 className="section-header" style={{ margin: 0 }}>Profile Settings</h2>
                                    {!isEditing ? (
                                        <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                                            <Edit2 size={16} /> Edit Profile
                                        </button>
                                    ) : (
                                        <div className="edit-actions">
                                            <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(false)}>
                                                <X size={16} /> Cancel
                                            </button>
                                            <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>
                                                <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className={`settings-form ${isEditing ? 'editing' : 'viewing'}`}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="profile-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="profile-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Bio</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            disabled={!isEditing}
                                            className="profile-input"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            disabled={!isEditing}
                                            className="profile-input"
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
}
