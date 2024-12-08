const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const OrderReport = sequelize.define('OrderReport', {
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    total_revenue: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_profit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

module.exports = OrderReport;
