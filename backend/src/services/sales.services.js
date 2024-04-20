const { salesModel } = require('../models/index');

const createSales = async (array) => {
  const createSale = await salesModel.insertSale(array);
  return createSale;
};

const deleteSale = async (saleId) => {
  const affectedRows = await salesModel.deleteSale(saleId);
  return affectedRows;
};

const updateSale = async (saleId, productId, quantity) => {
  const updatedSale = await salesModel.updateSaleProduct(saleId, productId, quantity);
  return updatedSale;
};
module.exports = { createSales, deleteSale, updateSale };