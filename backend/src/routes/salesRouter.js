const express = require('express');
const { salesControllers } = require('../controllers/index');

const SalesRouter = express.Router();

SalesRouter.get('/sales', salesControllers.findAll);

module.exports = SalesRouter;