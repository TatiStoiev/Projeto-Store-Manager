const missingProductNameError = {
  message: '"name" is required', 
  status: 400,
};
  
const invalidProductNameError = {
  message: '"name" length must be at least 5 characters long',
  status: 422,  
};

const productNameValidation = (productName) => {
  if (!productName || productName === '') {
    return missingProductNameError;
  }
  if (productName.length <= 5) {
    return invalidProductNameError;
  }
};

module.exports = productNameValidation;