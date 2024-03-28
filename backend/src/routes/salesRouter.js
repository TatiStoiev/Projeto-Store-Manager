const express = require('express');
const { salesControllers } = require('../controllers/index');

const SalesRouter = express.Router();

SalesRouter.get('/sales', salesControllers.findAll);
SalesRouter.get('/sales/:id', salesControllers.findbyId);

module.exports = SalesRouter;