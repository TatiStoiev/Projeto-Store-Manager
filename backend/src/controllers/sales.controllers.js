const { salesModel } = require('../models/index');

const findAll = async (req, res) => {
  const sales = await salesModel.findAll();
  return res.status(200).json(sales);
};

const salesIdExists = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  return Array.isArray(sale) && sale.length > 0;
};

const findbyId = async (req, res) => {
  const saleId = Number(req.params.id);

  const saleIdExists = await salesIdExists(saleId);
  if (!saleIdExists) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  const sale = await salesModel.findById(saleId);
  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

module.exports = {
  findAll,
  findbyId,
  salesIdExists,
};