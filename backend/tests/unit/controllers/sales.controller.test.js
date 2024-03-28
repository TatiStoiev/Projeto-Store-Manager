const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesModel } = require('../../../src/models/index');
const { salesControllers } = require('../../../src/controllers/index');

chai.use(sinonChai);

const notFoundMessage = 'Sale not found';

describe('Sales controller', function () {
  describe('Test response status 200', function () {
    afterEach(function () { return sinon.restore(); });
  
    it('Should return status 200 and the sales json', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const informedDate = '2024-03-27T19:53:56.000Z';
  
      sinon.stub(salesModel, 'findAll')
        .resolves([
          {
            saleId: 1,
            date: informedDate,
            productId: 1,
            quantity: 5,
          },
          {
            saleId: 1,
            date: informedDate,
            productId: 2,
            quantity: 10,
          },
          {
            saleId: 2,
            date: informedDate,
            productId: 3,
            quantity: 15,
          },
        ]);
    
      await salesControllers.findAll({}, res);     
           
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([
        {
          saleId: 1,
          date: '2024-03-27T19:53:56.000Z',
          productId: 1,
          quantity: 5,
        },
        {
          saleId: 1,
          date: '2024-03-27T19:53:56.000Z',
          productId: 2,
          quantity: 10,
        },
        {
          saleId: 2,
          date: '2024-03-27T19:53:56.000Z',
          productId: 3,
          quantity: 15,
        },
      ]));      
    });
  
    it('Should return status 200 and the sale json when find by id', async function () {
      const req = {
        params: {
          id: 1,
        },
      };   
  
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      sinon.stub(salesModel, 'findById')
        .resolves([
          {
            productId: 1,
            quantity: 5,
            date: '2024-03-27T19:41:01.000Z',
          },
          {
            productId: 2,
            quantity: 10,
            date: '2024-03-27T19:41:01.000Z',
          },
        ]);
  
      await salesControllers.findbyId(req, res);   
         
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([
        {
          productId: 1,
          quantity: 5,
          date: '2024-03-27T19:41:01.000Z',
        },
        {
          productId: 2,
          quantity: 10,
          date: '2024-03-27T19:41:01.000Z',
        },
      ])).to.be.equal(true);
    });
  });

  describe('Test response status 404', function () {
    afterEach(function () { return sinon.restore(); });

    it('should return status 404 and the message "Sale not found" if saleId is a number but does not exist', async function () {
      const req = { params: { id: 3 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesModel, 'findById').resolves([]);

      await salesControllers.findbyId(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: notFoundMessage });
    });

    it('should return status 404 and the message "Sale not found" if saleId is not a number', async function () {
      const req = { params: { id: 'xablau' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesModel, 'findById').resolves([]);

      await salesControllers.findbyId(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: notFoundMessage });
    });

    it('should return status 404 and the message "Sale not found" if saleId exists but sale is empty', async function () {
      const req = { params: { id: 2 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesModel, 'findById').resolves([]);

      await salesControllers.findbyId(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: notFoundMessage });
    });
  });
});