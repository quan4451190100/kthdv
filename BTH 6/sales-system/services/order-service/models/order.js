const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Order = sequelize.define('Order', {
    customer_name: { type: DataTypes.STRING, allowNull: false },
    customer_email: { type: DataTypes.STRING, allowNull: false },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

module.exports = Order;
