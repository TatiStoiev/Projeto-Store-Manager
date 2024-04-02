const { salesModel } = require('../models/index');
const validations = require('./validations/salesValidations');

const createSales = async (array) => {
  const entries = Object.entries(validations);
  const results = entries.map((entry) => {
    const [attribute, validate] = entry;
    const { isValid, error, type } = validate(array);
    return { attribute, isValid, error, type };
  });

  const errors = results.filter((r) => !r.isValid)
    .find((e) => e.error);
  if (errors) {
    const error = {
      error: errors.error,
      type: errors.type,
    };
  
    console.log('errors na camada service', errors);
    return error;
  } 
  const createSale = await salesModel.insertSale(array);
  return createSale;
};

module.exports = { createSales };