const express = require('express')
const {productsModel} = require('../models/index')

const ProductsRouter = express.Router();

ProductsRouter.get('/products', async (req, res) => {
    const products = await productsModel.findAll()
    res.status(200).json(products);
})


// router.get('/products/:id')

module.exports = ProductsRouter;