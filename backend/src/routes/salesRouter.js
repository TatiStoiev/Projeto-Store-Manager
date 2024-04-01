const express = require('express');
const { salesControllers } = require('../controllers/index');

const SalesRouter = express.Router();

SalesRouter.get('/sales', salesControllers.findAll);
SalesRouter.get('/sales/:id', salesControllers.findbyId);
SalesRouter.post('/sales', salesControllers.createSale);

module.exports = SalesRouter;