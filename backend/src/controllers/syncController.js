const { Product, Seller } = require('../models');

// Sync Product (Create or Update)
exports.syncProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, image, stock, sellerId } = req.body;
        console.log(`[Sync] Received Product Update: ${id} - ${name}`);

        // Upsert Product
        // Note: We use the ID from Seller DB to keep them in sync. 
        // Ensure User DB doesn't auto-increment IDs in a way that conflicts if we want strict ID matching,
        // but since we are syncing FROM Seller, we should trust Seller's ID.
        // However, Sequelize defaults to autoIncrement. We might need to handle this carefully.
        // For simplicity, we will check if it exists by ID.

        const [product, created] = await Product.upsert({
            id,
            name,
            description,
            price,
            category,
            image,
            stock,
            sellerId
        });

        res.json({ success: true, message: created ? 'Product Created' : 'Product Updated', product });
    } catch (error) {
        console.error('[Sync] Product Sync Error:', error);
        res.status(500).json({ success: false, message: 'Sync Failed', error: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`[Sync] Received Product Deletion: ${id}`);

        await Product.destroy({ where: { id } });

        res.json({ success: true, message: 'Product Deleted' });
    } catch (error) {
        console.error('[Sync] Product Delete Error:', error);
        res.status(500).json({ success: false, message: 'Delete Failed', error: error.message });
    }
};

// Sync Seller (Create or Update)
exports.syncSeller = async (req, res) => {
    try {
        const { id, companyName, email, password, bio, location, website, image } = req.body;
        console.log(`[Sync] Received Seller Update: ${id} - ${companyName}`);

        const [seller, created] = await Seller.upsert({
            id,
            companyName,
            email,
            password, // Hashed password from Seller Backend
            bio,
            location,
            website,
            image
        });

        res.json({ success: true, message: created ? 'Seller Created' : 'Seller Updated', seller });
    } catch (error) {
        console.error('[Sync] Seller Sync Error:', error);
        res.status(500).json({ success: false, message: 'Sync Failed', error: error.message });
    }
};
