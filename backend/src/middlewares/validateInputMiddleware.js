const { salesModel } = require('../models/index');

const validateInputProductIdMiddleware = (req, res, next) => {
  const array = req.body;

  const hasProductId = array.every((product) => 'productId' in product);
  if (!hasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }    
  next();
};

const validateInputQuantityMiddleware = (req, res, next) => {
  const array = req.body;
  
  const hasQuantity = array.every((product) => 'quantity' in product);
  if (!hasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }    
  const hasValidQuantity = array.every((product) => typeof product.quantity === 'number' 
  && product.quantity >= 1);
  if (!hasValidQuantity) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }    
  next();
};

const productIdValidation = async (array) => {
  const validationPromises = array.map(({ productId }) => salesModel.findById(productId));
  const products = await Promise.all(validationPromises);
  
  const allProductsFound = products.every((product) => product !== null);
  return allProductsFound;
};

const validateProductExistsMiddleware = async (req, res, next) => {
  const array = req.body;
  
  const productsExists = await productIdValidation(array);
  if (!productsExists) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateInputProductIdMiddleware,
  validateInputQuantityMiddleware,
  validateProductExistsMiddleware,
};
