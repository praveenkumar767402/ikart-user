const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Seller = require('./Seller');
const Address = require('./Address');

// Define Associations
// Note: Product.js also had associations, but I removed them to avoid duplication.
// Seller.hasMany(Product, { foreignKey: 'sellerId' });
// Product.belongsTo(Seller, { foreignKey: 'sellerId' });
// Re-enabling associations here centrally:
Seller.hasMany(Product, { foreignKey: 'sellerId' });
Product.belongsTo(Seller, { foreignKey: 'sellerId' });

User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    User,
    Product,
    Seller,
    Address
};
