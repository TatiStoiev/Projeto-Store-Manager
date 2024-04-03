const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateInputNameMiddleware, 
  validateNameLengthMiddleware,
  validateProductMiddleware } = require('../../src/middlewares/validateInputMiddlewareForProducts');
const { productsModel } = require('../../src/models');

chai.use(sinonChai);

describe('Middleware Tests', function () {
  it('Should return status 400 and a message when the request does not have the name field', async function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await validateInputNameMiddleware(req, res, () => {}); 
  
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { message: '"name" is required' });
  });
  it('Should return status 422 and a message if the name field has less than 5 characteres', async function () {
    const req = {
      body: {
        name: 'cao',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await validateNameLengthMiddleware(req, res, () => {}); 
  
    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: '"name" length must be at least 5 characters long' });
  });
  it('Should return status 404 and a message if the product does not exists', async function () {
    const req = {
      params: {
        id: 999,
      },
      body: {
        name: 'xablaus',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsModel, 'findById')
      .resolves(null);
  
    await validateProductMiddleware(req, res, () => {}); 
  
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { message: 'Product not found' });
  });
});
