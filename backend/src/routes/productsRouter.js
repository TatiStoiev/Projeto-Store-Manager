const express = require('express');
const { productsControlers } = require('../controllers/index');

const ProductsRouter = express.Router();

ProductsRouter.get('/products', productsControlers.findAll);

ProductsRouter.get('/products/:id', productsControlers.findbyId);

ProductsRouter.post('/products', productsControlers.createProduct);

ProductsRouter.put('/products/:id', productsControlers.updateProduct);

module.exports = ProductsRouter;