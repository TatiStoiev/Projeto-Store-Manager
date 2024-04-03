const { salesModel } = require('../models/index');

const createSales = async (array) => {
  const createSale = await salesModel.insertSale(array);
  return createSale;
};

module.exports = { createSales };