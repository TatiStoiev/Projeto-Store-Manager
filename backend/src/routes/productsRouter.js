const express = require('express');
const { productsControlers } = require('../controllers/index');
const { validateInputNameMiddleware, validateNameLengthMiddleware, 
  validateProductMiddleware } = require('../middlewares/validateInputMiddlewareForProducts');

const ProductsRouter = express.Router();

ProductsRouter.get('/products', productsControlers.findAll);

ProductsRouter.get('/products/:id', productsControlers.findbyId);

ProductsRouter.post('/products', productsControlers.createProduct);

ProductsRouter.put(
  '/products/:id',
  validateInputNameMiddleware,
  validateNameLengthMiddleware,
  validateProductMiddleware,
  productsControlers.updateProduct,
);

ProductsRouter.delete('/products/:id', validateProductMiddleware, productsControlers.deleteProduct);

module.exports = ProductsRouter;