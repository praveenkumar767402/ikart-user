require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for dev simplicity
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// Database Connection
sequelize.sync({ alter: true })
    .then(() => console.log('✅ MySQL Database Connected & Synced'))
    .catch(err => console.error('❌ Database Connection Error:', err));

// Force restart 2
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/seller', require('./routes/sellerRoutes'));

app.get('/', (req, res) => {
    res.send('Influencer Kart API is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
