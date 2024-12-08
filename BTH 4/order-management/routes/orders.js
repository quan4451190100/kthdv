const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authMiddleware = require('../middleware/authMiddleware');

// Lấy danh sách đơn hàng
router.get('/', async (req, res) => {
    const orders = await Order.findAll();
    res.json(orders);
});

// Lấy chi tiết đơn hàng
router.get('/:id', async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

// Tạo đơn hàng mới
router.post('/', authMiddleware, async (req, res) => {
    const { customer_name, customer_email, total_amount, status } = req.body;
    const order = await Order.create({ customer_name, customer_email, total_amount, status });
    res.status(201).json(order);
});

// Cập nhật trạng thái đơn hàng
router.put('/:id', authMiddleware, async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send('Order not found');

    const { status } = req.body;
    await order.update({ status, updated_at: new Date() });
    res.json(order);
});

// Xóa đơn hàng
router.delete('/:id', authMiddleware, async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send('Order not found');

    await order.destroy();
    res.status(204).send();
});

module.exports = router;
