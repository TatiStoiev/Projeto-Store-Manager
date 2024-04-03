const { salesModel } = require('../models/index');
const { salesServices } = require('../services/index');
const { getCodeByType } = require('../utils/salesUtils');

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
  
  if (createdSales.error) {
    const { error, type } = createdSales;
    const code = getCodeByType(type);  
    return res.status(code).json({ message: error });
  }
    
  return res.status(201).json(createdSales);
};

module.exports = {
  findAll,
  findbyId,
  createSale,
}; 