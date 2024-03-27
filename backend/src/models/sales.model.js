const camelize = require('camelize');
const connection = require('../db/connection');

const findAll = async () => {
  const query = `SELECT 
  sp.sale_id,
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products sp
  JOIN sales s
  ON s.id = sp.sale_id
  ORDER BY sale_id ASC, product_id ASC`;
  const [products] = await connection.execute(query);
  return camelize(products);    
};

const findById = async (productId) => {
  const query = `SELECT
  s.date,
  sp.product_id, 
  sp.quantity
  FROM sales_products sp 
  JOIN sales s 
  ON sp.sale_id = s.id 
  WHERE s.id = ?`;
  const value = [productId];
  const [[product]] = await connection.execute(query, value);
  return camelize(product);
};

module.exports = {
  findAll,
  findById,
};