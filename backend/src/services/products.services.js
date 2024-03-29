const { productsModel } = require('../models/index');
const productNameValidation = require('./validations/productValidations');

const createProduct = async (productName) => {
  const validationError = productNameValidation(productName);
  if (validationError) {
    throw validationError;
  }

  const productId = await productsModel.createProduct(productName);
  const productCreated = {
    id: productId,
    name: productName,
  };
  return productCreated;
};

module.exports = { createProduct };