const { salesModel } = require('../../models/index');

const createNotValid = (message, type) => ({
  isValid: false,
  error: message,
  type,
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
    if (!hasProductId) {
      return createNotValid('"productId" is required', 'REQUIRED');
    }
    if (hasProductId) {
      const productsExists = await productIdValidation(array);
      if (!productsExists) {
        return createNotValid('Product not found', 'PRODUCT_NOTFOUND');
      }
      return { isValid: true };
    }
  },
  quantity: (array) => {
    const hasQuantity = array.every((product) => 'quantity' in product);
    const hasValidQuantity = array.every((product) => typeof product.quantity === 'number' 
    && product.quantity >= 1);
    if (!hasQuantity) {
      return createNotValid('"quantity" is required', 'REQUIRED');
    }
    if (!hasValidQuantity) {
      return createNotValid('"quantity" must be greater than or equal to 1', 'INSERT_WRONG');
    }
    return { isValid: true };
  },
 
};

module.exports = validations;