const missingProductNameError = {
  code: 'MISSING_PRODUCT_NAME',
  message: '"name" is required', 
};
  
const invalidProductNameError = {
  code: 'INVALID_PRODUCT_NAME',
  message: '"name" length must be at least 5 characters long',
  
};

const productNameValidation = (productName) => {
  if (!productName || productName === undefined) {
    return missingProductNameError;
  }
  if (productName.lenght < 5) {
    return invalidProductNameError;
  }
};

module.exports = productNameValidation;