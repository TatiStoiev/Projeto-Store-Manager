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

const updateProduct = async (productId, name) => {
  const query = (`UPDATE products p 
  INNER JOIN sales_products sp ON sp.product_id = p.id
  SET p.name = ?
  WHERE p.id = ?`);
  const inputProductId = productId;
  const inputName = name;
  const values = [inputName, inputProductId];
  await connection.execute(query, values);
  const updatedProduct = {
    id: inputProductId,
    name: inputName,
  };
  return updatedProduct;
};

const deleteProduct = async (productId) => {
  const query = ('DELETE FROM products WHERE id = ?');
  const value = [productId];
  const [{ affectedRows }] = await connection.execute(query, value);
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};