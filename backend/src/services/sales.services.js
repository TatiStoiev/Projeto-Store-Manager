const { salesModel } = require('../models/index');

const createSales = async (array) => {
  const createSale = await salesModel.insertSale(array);
  return createSale;
};

const deleteSale = async (saleId) => {
  const affectedRows = await salesModel.deleteSale(saleId);
  return affectedRows;
};

module.exports = { createSales, deleteSale };