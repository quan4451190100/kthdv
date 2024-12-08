const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).send('Product not found');

    await product.update({ quantity });
    res.json(product);
});

module.exports = router;
