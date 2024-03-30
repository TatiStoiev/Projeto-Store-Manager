const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsControlers } = require('../../../src/controllers/index');
const { productNameValidation } = require('../../../src/services/validations/productValidations');

chai.use(sinonChai);

describe('Insert new products', function () {
  afterEach(function () { return sinon.restore(); });
  it('It is not possible to insert a new product with no name, Should return status 400 and a message that name is required', async function () {
    const req = {
      body: {
        name: '',
      },
    };   

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productNameValidation)
      .returns({
        message: '"name" is required', 
        status: 400,
      });

    await productsControlers.createProduct(req, res);
       
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });
  });

  it('It is not possible to insert a new product with undefined name, Should return status 400 and a message that name is required', async function () {
    const req = {
      body: {
        name: undefined,
      },
    };   

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productNameValidation)
      .returns({
        message: '"name" is required', 
        status: 400,
      });

    await productsControlers.createProduct(req, res);
       
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });
  });

  it('It is not possible to insert a new product with less of 5 characteres in the name, should return status 422 and a message that name length must be at least 5 characters long"', async function () {
    const req = {
      body: {
        name: 'xau',
      },
    };   

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productNameValidation)
      .returns({
        message: '"name" length must be at least 5 characters long', 
        status: 422,
      });

    await productsControlers.createProduct(req, res);
       
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('It is not possible to insert a new product with 5 characteres in the name, should return status 422 and a message that name length must be at least 5 characters long"', async function () {
    const req = {
      body: {
        name: 'xabla',
      },
    };   

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productNameValidation)
      .returns({
        message: '"name" length must be at least 5 characters long', 
        status: 422,
      });

    await productsControlers.createProduct(req, res);
       
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});
