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
  FROM sales s 
  JOIN sales_products sp 
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

const deleteSale = async (saleId) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const value = [saleId];
  const result = await connection.execute(query, value);
  const { affectedRows } = result[0];
  return affectedRows;
};

const updateSaleProduct = async (saleId, productId, quantity) => {
  const updateQuery = `UPDATE sales_products 
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(updateQuery, [quantity, saleId, productId]);

  const selectQuery = `SELECT s.date, sp.product_id, sp.quantity, sp.sale_id
  FROM sales s
  INNER JOIN sales_products sp ON  s.id = sp.sale_id
  WHERE s.id = ? AND sp.product_id = ?`;
  const [result] = await connection.execute(selectQuery, [saleId, productId]);
  const updatedSaleProduct = {
    date: result[0].date,
    productId: result[0].product_id,
    quantity: result[0].quantity,
    saleId: result[0].sale_id,    
  };
  return updatedSaleProduct;
};

module.exports = {
  findAll,
  findById,
  getSaleId,
  insertSale,
  deleteSale,
  updateSaleProduct,
};