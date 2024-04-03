const { salesModel } = require('../models/index');
const { validations } = require('./validations/salesValidations');

const createSales = async (array) => {
  const createSale = await salesModel.insertSale(array);
  return createSale;
};

module.exports = { createSales };