require('dotenv').config();
console.log('Loading express...');
const express = require('express');
console.log('Loading cors...');
const cors = require('cors');
console.log('Loading database config...');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
console.log('Setting up middleware...');
app.use(cors({
    origin: '*', // Allow all origins for dev simplicity
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// Import Models BEFORE Sync
require('./models/User');
require('./models/Product');
require('./models/Address');
require('./models/Order');
// require('./models/Seller'); // If exists in seller-backend only, ignore. But if it's shared, include.

// Database Connection
console.log('Syncing database...');
sequelize.sync({ alter: true })
    .then(() => console.log('✅ MySQL Database Connected & Synced'))
    .catch(err => console.error('❌ Database Connection Error:', err));

// Force restart 2
// Routes
console.log('Loading routes...');
console.log(' - Auth Routes');
app.use('/api/auth', require('./routes/authRoutes'));
console.log(' - Product Routes');
app.use('/api/products', require('./routes/productRoutes'));
console.log(' - Seller Routes');
app.use('/api/seller', require('./routes/sellerRoutes'));
console.log(' - Address Routes');
app.use('/api/addresses', require('./routes/addressRoutes'));
console.log(' - Creator Routes');
app.use('/api/creators', require('./routes/creatorRoutes'));
console.log(' - Sync Routes');
app.use('/api/sync', require('./routes/syncRoutes'));
console.log(' - Order Routes');
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => {
    res.send('Influencer Kart API is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
