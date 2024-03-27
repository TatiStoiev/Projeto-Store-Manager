const { salesModel } = require('../models/index');

const findAll = async (req, res) => {
  const products = await salesModel.findAll();
  return res.status(200).json(products);
};

module.exports = {
  findAll,
};