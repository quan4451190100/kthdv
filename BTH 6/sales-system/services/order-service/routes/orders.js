const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.post('/', async (req, res) => {
    const { customer_name, customer_email, total_amount, status } = req.body;
    const order = await Order.create({ customer_name, customer_email, total_amount, status });
    res.status(201).json(order);
});

module.exports = router;
