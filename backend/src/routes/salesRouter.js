const express = require('express');
const { salesControllers } = require('../controllers/index');
const { 
  validateInputProductIdMiddleware, 
  validateInputQuantityMiddleware, 
  validateProductExistsMiddleware } = require('../middlewares/validateInputMiddleware');

const SalesRouter = express.Router();

SalesRouter.get('/sales', salesControllers.findAll);
SalesRouter.get('/sales/:id', salesControllers.findbyId);
SalesRouter.post(
  '/sales', 
  validateInputProductIdMiddleware, 
  validateInputQuantityMiddleware, 
  validateProductExistsMiddleware,
  salesControllers.createSale,
);

module.exports = SalesRouter;