const connection = require('../db/connection');

const findAll = async () => {
  const query = ('SELECT * FROM products');
  const [products] = await connection.execute(query);
  return products;    
};

const findById = async (productId) => {
  const query = ('SELECT * FROM products WHERE ID = ? ORDER BY id ASC');
  const value = [productId];
  const [[product]] = await connection.execute(query, value);
  return product;
};

const createProduct = async (productName) => {
  const query = (`INSERT INTO products (name) VALUES ("${productName}")`);
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

module.exports = {
  findAll,
  findById,
  createProduct,
};