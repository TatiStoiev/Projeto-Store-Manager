const { salesModel } = require('../models/index');
const validations = require('./validations/salesValidations');

const createSales = async (array) => {
  const entries = Object.entries(validations);
  const results = await Promise.all(entries.map(async (entry) => {
    const [attribute, validate] = entry;
    const { isValid, error, type } = await validate(array);
    return { attribute, isValid, error, type };
  }));

  const errors = results.filter((r) => !r.isValid)
    .find((e) => e.error);
  if (errors) {
    const error = {
      error: errors.error,
      type: errors.type,
    };
    return error;
  } 
  const createSale = await salesModel.insertSale(array);
  return createSale;
};

module.exports = { createSales };