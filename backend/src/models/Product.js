const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User for association

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60'
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sellerId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

// Define Relationships
User.hasMany(Product, { foreignKey: 'sellerId' });
Product.belongsTo(User, { foreignKey: 'sellerId' });

module.exports = Product;
