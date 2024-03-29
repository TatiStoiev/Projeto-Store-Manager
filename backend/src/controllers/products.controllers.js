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

//acertar o retorno porque os erros são com status diferente

const createProduct = async (req, res) => {
  const productName = req.body.name;
  const productCreated = await productsServices.createProduct(productName);
  if (error.code && error.message) {
    return res.status
  }
  return res.status(201).json(productCreated);
};

module.exports = {
  findAll,
  findbyId,
  createProduct,
};