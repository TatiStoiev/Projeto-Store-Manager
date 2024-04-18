const { salesModel } = require('../models/index');
const { salesServices } = require('../services/index');

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

const createSale = async (req, res) => {
  const sales = req.body;

  const createdSales = await salesServices.createSales(sales);
  return res.status(201).json(createdSales);
};  

const deleteSale = async (req, res) => {
  const saleId = Number(req.params.id);

  const saleIdExists = await salesModel.findById(saleId);
  console.log('saleIdExist', saleIdExists)
  if (!saleIdExists || saleIdExists.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  const affectedRows = await salesServices.deleteSale(saleId);
  if (affectedRows >= 1) {
    return res.status(204).json();
  }
};

module.exports = {
  findAll,
  findbyId,
  createSale,
  deleteSale,
}; 