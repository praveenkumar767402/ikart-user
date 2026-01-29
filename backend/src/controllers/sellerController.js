const Product = require('../models/Product');
// Mock stats for now since real Order model might be complex to query immediately
exports.getSellerStats = async (req, res) => {
    try {
        // In a real app, query Orders and Products tables
        const stats = {
            revenue: 24560,
            orders: 1245,
            products: 45,
            growth: 18.2
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

exports.getSellerProducts = async (req, res) => {
    try {
        // Fetch products belonging to the logged-in seller (req.user.id)
        // const products = await Product.findAll({ where: { sellerId: req.user.id } });

        // Mock data for initial frontend connection
        const products = [
            { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 199.99, stock: 45, status: 'Active' },
            { id: 2, name: 'Ergonomic Desk Chair', category: 'Furniture', price: 249.50, stock: 12, status: 'Active' },
            { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 120.00, stock: 0, status: 'Out of Stock' }
        ];
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};
