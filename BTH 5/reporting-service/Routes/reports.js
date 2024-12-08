const express = require('express');
const router = express.Router();
const OrderReport = require('../models/orderReport');
const ProductReport = require('../models/productReport');
const authMiddleware = require('../middleware/authMiddleware');

// Lấy danh sách báo cáo đơn hàng
router.get('/orders', async (req, res) => {
    const reports = await OrderReport.findAll();
    res.json(reports);
});

// Lấy chi tiết báo cáo đơn hàng
router.get('/orders/:id', async (req, res) => {
    const report = await OrderReport.findByPk(req.params.id);
    if (!report) return res.status(404).send('Order report not found');
    res.json(report);
});

// Lấy danh sách báo cáo sản phẩm
router.get('/products', async (req, res) => {
    const reports = await ProductReport.findAll();
    res.json(reports);
});

// Lấy chi tiết báo cáo sản phẩm
router.get('/products/:id', async (req, res) => {
    const report = await ProductReport.findByPk(req.params.id);
    if (!report) return res.status(404).send('Product report not found');
    res.json(report);
});

// Tạo báo cáo đơn hàng mới
router.post('/orders', authMiddleware, async (req, res) => {
    const { order_id, total_revenue, total_cost } = req.body;
    const total_profit = total_revenue - total_cost;

    const report = await OrderReport.create({ order_id, total_revenue, total_cost, total_profit });
    res.status(201).json(report);
});

// Tạo báo cáo sản phẩm mới
router.post('/products', authMiddleware, async (req, res) => {
    const { order_report_id, product_id, total_sold, revenue, cost } = req.body;
    const profit = revenue - cost;

    const report = await ProductReport.create({ order_report_id, product_id, total_sold, revenue, cost, profit });
    res.status(201).json(report);
});

// Xóa báo cáo đơn hàng
router.delete('/orders/:id', authMiddleware, async (req, res) => {
    const report = await OrderReport.findByPk(req.params.id);
    if (!report) return res.status(404).send('Order report not found');

    await report.destroy();
    res.status(204).send();
});

// Xóa báo cáo sản phẩm
router.delete('/products/:id', authMiddleware, async (req, res) => {
    const report = await ProductReport.findByPk(req.params.id);
    if (!report) return res.status(404).send('Product report not found');

    await report.destroy();
    res.status(204).send();
});

module.exports = router;
