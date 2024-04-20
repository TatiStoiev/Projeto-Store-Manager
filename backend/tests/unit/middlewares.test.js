const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateInputNameMiddleware, 
  validateNameLengthMiddleware,
  validateProductMiddleware } = require('../../src/middlewares/validateInputMiddlewareForProducts');
const { validateInputProductIdMiddleware, validateInputQuantityMiddleware } = require('../../src/middlewares/validateInputMiddlewareforSales');
const { validateQuantity } = require('../../src/middlewares/validateUpdateProduct.middleware');
const { productsModel } = require('../../src/models');

chai.use(sinonChai);

describe('Middleware Tests', function () {
  afterEach(function () { return sinon.restore(); });
  describe('Products Middleware Tests', function () {
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

    it('should call next when product exists', function (done) {
      const req = {
        params: { id: 1 }, 
      };
  
      const res = {
        status() { 
          return this;
        },
        json() {}, 
      };
  
      const next = function () {
        done(); 
      };
  
      sinon.stub(productsModel, 'findById').resolves({
        id: 1,
        name: 'Martelo de Thor',
      });
  
      validateProductMiddleware(req, res, next);
    });
  });

  describe('Sales Middleware Tests', function () {
    it('Should return status 400 and a message if the field productId does not exists', async function () {
      const req = {
        body: [{}],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await validateInputProductIdMiddleware(req, res, () => {}); 
  
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"productId" is required' });
    });

    it('Should return status 400 and a message if the field quantity in the requisition does not exists', async function () {
      const req = {
        body: [{}],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await validateInputQuantityMiddleware(req, res, () => {}); 
  
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"quantity" is required' });
    });

    it('Should return status 422 and a message if the field quantity in the requisition is 0', async function () {
      const req = {
        body: [{ quantity: 0 }],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await validateInputQuantityMiddleware(req, res, () => {}); 
  
      sinon.assert.calledWith(res.status, 422);
      sinon.assert.calledWith(res.json, { message: '"quantity" must be greater than or equal to 1' });
    });
  });

  describe('Validate Update Middleware Tests', function () {
    it('Should return status 400 and a message when the request does not have the quantity field', async function () {
      const req = {
        body: {},
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await validateQuantity(req, res, () => {}); 
  
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"quantity" is required' });
    });
  });

  it('Should return status 400 and a message when the request has quantity field undefined', async function () {
    const req = {
      body: { quantity: undefined },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateQuantity(req, res, () => {}); 

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { message: '"quantity" is required' });
  });
  it('Should return status 422 and a message when the quantity field is iqual to 0', async function () {
    const req = {
      body: { quantity: 0 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateQuantity(req, res, () => {}); 

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: '"quantity" must be greater than or equal to 1' });
  });

  it('Should return status 422 and a message when the quantity field is lower than 0', async function () {
    const req = {
      body: { quantity: -2 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateQuantity(req, res, () => {}); 

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: '"quantity" must be greater than or equal to 1' });
  });

  it('Should return status 422 and a message when the quantity field is not a number', async function () {
    const req = {
      body: { quantity: 'xablau' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateQuantity(req, res, () => {}); 

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: '"quantity" must be greater than or equal to 1' });
  });
  it('should call next when quantity is valid', function (done) {
    const req = {
      body: { quantity: '10' }, 
    };

    const res = {
      status() { 
        return this;
      },
      json() {}, 
    };

    const next = function () {
      done(); 
    };

    validateQuantity(req, res, next);
  });
});