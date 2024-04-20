const express = require('express');
const { salesControllers } = require('../controllers/index');
const { 
  validateInputProductIdMiddleware, 
  validateInputQuantityMiddleware, 
  validateProductExistsMiddleware } = require('../middlewares/validateInputMiddlewareforSales');
const { validateQuantity } = require('../middlewares/validateUpdateProduct.middleware');

const SalesRouter = express.Router();

SalesRouter.get('/sales', salesControllers.findAll);
SalesRouter.delete('/sales/:id', salesControllers.deleteSale);
SalesRouter.get('/sales/:id', salesControllers.findbyId);
SalesRouter.post(
  '/sales', 
  validateInputQuantityMiddleware, 
  validateInputProductIdMiddleware, 
  validateProductExistsMiddleware,
  salesControllers.createSale,
);
SalesRouter.put(
  '/sales/:saleId/products/:productId/quantity', 
  validateQuantity,  
  salesControllers.updateSale,
);

module.exports = SalesRouter;