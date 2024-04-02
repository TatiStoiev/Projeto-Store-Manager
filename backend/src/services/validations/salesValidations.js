const { salesModel } = require('../../models/index');

const createNotValid = (message) => ({
  isValid: false,
  error: message,
});

const productIdValidation = async (array) => {
  const validationPromises = array.map(({ productId }) => salesModel.findById(productId));
  const products = await Promise.all(validationPromises);

  const productNotFound = products.some((product) => !product);
  if (productNotFound) {
    throw new Error('Product not found');
  }
};

const validations = {
  productId: async (array) => {
    const hasProductId = array.every((product) => 'productId' in product);
    const productsExists = await productIdValidation(array);
    if (!hasProductId) {
      return createNotValid('"productId" is required');
    }
    if (!productsExists) {
      return createNotValid('Product not found');
    }
    return { isValid: true };
  },
  quantity: (array) => {
    const hasQuantity = array.every((product) => 'quantity' in product);
    const hasValidQuantity = array.every((product) => typeof product.quantity === 'number' 
    && product.quantity >= 1);
    if (!hasQuantity) {
      return createNotValid('"quantity" is required');
    }
    if (!hasValidQuantity) {
      return createNotValid('"quantity" must be greater than or equal to 1');
    }
    return { isValid: true };
  },
 
};

module.exports = validations;