const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending' // Pending, Processing, Shipped, Delivered, Cancelled
    },
    items: {
        type: DataTypes.JSON, // Storing items as JSON for simplicity for now
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.JSON,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        defaultValue: 'COD'
    }
}, {
    timestamps: true
});

module.exports = Order;
