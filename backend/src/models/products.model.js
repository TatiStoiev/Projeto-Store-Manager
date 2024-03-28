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
  const query = ('INSERT INTO products (name) VALUES(?)');
  const value = [productName];
  const result = await connection.execute(query, value);
  const id = result[0].insertId;
  return id; 
};

module.exports = {
  findAll,
  findById,
  createProduct,
};