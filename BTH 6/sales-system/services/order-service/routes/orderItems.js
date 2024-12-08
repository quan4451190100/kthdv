const express = require('express');
const OrderItem = require('../models/orderItem');
const router = express.Router();

router.post('/', async (req, res) => {
    const { order_id, product_id, product_name, quantity, unit_price } = req.body;
    const total_price = quantity * unit_price;

    const item = await OrderItem.create({ order_id, product_id, product_name, quantity, unit_price, total_price });
    res.status(201).json(item);
});

module.exports = router;
