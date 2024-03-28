const { salesModel } = require('../models/index');

const findAll = async (req, res) => {
  const sales = await salesModel.findAll();
  return res.status(200).json(sales);
};

const findbyId = async (req, res) => {
  const saleId = Number(req.params.id);

  const sale = await salesModel.findById(saleId);
  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

module.exports = {
  findAll,
  findbyId,
};