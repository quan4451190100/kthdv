const express = require('express');
const router = express.Router();
const OrderItem = require('../models/orderItem');
const authMiddleware = require('../middleware/authMiddleware');

// Lấy danh sách tất cả các mặt hàng
router.get('/', async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.json(orderItems);
    } catch (error) {
        res.status(500).send('Error fetching order items');
    }
});

// Lấy chi tiết một mặt hàng theo ID
router.get('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).send('Order item not found');
        res.json(orderItem);
    } catch (error) {
        res.status(500).send('Error fetching order item');
    }
});

// Tạo mặt hàng mới (Yêu cầu xác thực)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { order_id, product_id, product_name, quantity, unit_price } = req.body;

        // Tính toán tổng giá cho mặt hàng
        const total_price = quantity * unit_price;

        const orderItem = await OrderItem.create({
            order_id,
            product_id,
            product_name,
            quantity,
            unit_price,
            total_price,
        });

        res.status(201).json(orderItem);
    } catch (error) {
        res.status(500).send('Error creating order item');
    }
});

// Cập nhật thông tin mặt hàng (Yêu cầu xác thực)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).send('Order item not found');

        const { product_name, quantity, unit_price } = req.body;

        // Cập nhật thông tin và tính toán lại tổng giá
        const total_price = quantity * unit_price;

        await orderItem.update({ product_name, quantity, unit_price, total_price });

        res.json(orderItem);
    } catch (error) {
        res.status(500).send('Error updating order item');
    }
});

// Xóa một mặt hàng trong đơn hàng (Yêu cầu xác thực)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).send('Order item not found');

        await orderItem.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error deleting order item');
    }
});

module.exports = router;
