const { salesModel } = require('../models/index');

const findAll = async (req, res) => {
  const products = await salesModel.findAll();
  return res.status(200).json(products);
};

const findbyId = async (req, res) => {
  const productId = Number(req.params.id);
  const product = await salesModel.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(product);
};

module.exports = {
  findAll,
  findbyId,
};