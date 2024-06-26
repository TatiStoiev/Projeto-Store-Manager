const { productsModel } = require('../models/index');
const { productsServices } = require('../services/index');

const findAll = async (req, res) => {
  const products = await productsModel.findAll();
  return res.status(200).json(products);
};

const findbyId = async (req, res) => {
  const productId = Number(req.params.id);
  const product = await productsModel.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const productName = req.body.name;
  try {
    const productCreated = await productsServices.createProduct(productName);
    return res.status(201).json(productCreated);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = Number(req.params.id);
  const productName = req.body.name;
  const updatedProduct = await productsModel.updateProduct(productId, productName);
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const productId = Number(req.params.id);

  await productsModel.deleteProduct(productId);
  return res.status(204).json();
};

module.exports = {
  findAll,
  findbyId,
  createProduct,
  updateProduct,
  deleteProduct,
};