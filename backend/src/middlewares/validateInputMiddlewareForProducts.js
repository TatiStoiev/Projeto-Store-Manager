const { productsModel } = require('../models/index');

const validateInputNameMiddleware = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }       
  next();
};

const validateNameLengthMiddleware = (req, res, next) => {
  const { name } = req.body;

  if (name.length >= 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }       
  next();
};
  
const validateProductMiddleware = async (req, res, next) => {
  const productId = req.params.id;
  
  const productsExists = await productsModel.findById(productId);
  if (!productsExists) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateInputNameMiddleware,
  validateNameLengthMiddleware,
  validateProductMiddleware,
};