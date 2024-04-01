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

const findById = async (saleId) => {
  const query = `SELECT
  sp.product_id, 
  sp.quantity,
  s.date
  FROM sales_products sp 
  JOIN sales s 
  ON sp.sale_id = s.id 
  WHERE s.id = ?`;
  const value = [saleId];
  const [product] = await connection.execute(query, value);
  return camelize(product);
};

const getSaleId = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (NOW())');
  return insertId;
};

const insertSale = async (array) => {
  let insertPromises = [];
  const saleId = await getSaleId();
  insertPromises = array.map(({ productId, quantity }) => 
    connection.execute(`INSERT INTO sales_products (sale_id, product_id, quantity) 
  VALUES (?, ?, ?)`, [saleId, productId, quantity]));

  await Promise.all(insertPromises);
  const items = array.map(({ productId, quantity }) => ({ productId, quantity }));
  
  const sales = {
    id: saleId,
    itemsSold: items,
  };
  return sales;
};

module.exports = {
  findAll,
  findById,
  getSaleId,
  insertSale,
};