const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

// Lấy chi tiết sản phẩm
router.get('/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Thêm sản phẩm mới
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const product = await Product.create({ name, description, price, quantity });
    res.status(201).json(product);
});

// Cập nhật sản phẩm
router.put('/:id', authMiddleware, async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    const { name, description, price, quantity } = req.body;
    await product.update({ name, description, price, quantity, updated_at: new Date() });
    res.json(product);
});

// Xóa sản phẩm
router.delete('/:id', authMiddleware, async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    await product.destroy();
    res.status(204).send();
});

module.exports = router;
