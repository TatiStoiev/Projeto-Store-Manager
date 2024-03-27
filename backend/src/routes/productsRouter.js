const express = require('express')
const {productsModel} = require('../models/index')

const ProductsRouter = express.Router();

ProductsRouter.get('/products', async (req, res) => {
    const products = await productsModel.findAll()
    res.status(200).json(products);
})

ProductsRouter.get('/products/:id', async (req, res) => {
    const productId = Number(req.params.id)
    const product = await productsModel.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found'})
    }
    res.status(200).json(product)
})

module.exports = ProductsRouter;