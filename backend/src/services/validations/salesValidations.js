const middlewares = require('../../middlewares/validateInputMiddlewareforSales');

const validations = async (array) => {
  await middlewares.validateInputProductIdMiddleware({ body: { array } }, null, () => {});
  await middlewares.validateInputQuantityMiddleware({ body: { array } }, null, () => {});
  await middlewares.validateProductExistsMiddleware({ body: { array } }, null, () => {});
};

module.exports = { validations };