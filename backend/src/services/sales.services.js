const { salesModel } = require('../models/index');
const validations = require('./validations/salesValidations');

const createSales = async (array) => {
  const validationsError = await validations(array);
  if (validationsError) {
    return validationsError.error;
  }
  const createSale = await salesModel.insertSale(array);
  return createSale;
};

module.exports = { createSales };