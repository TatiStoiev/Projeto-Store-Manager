const connection = require('../db/connection');

const findAll = async () => {
  const query = ('SELECT * FROM sales_products ORDER BY sale_id ASC, product_id ASC ');
  const [products] = await connection.execute(query);
  console.log(products);
  return products;    
};

module.exports = {
  findAll,
};