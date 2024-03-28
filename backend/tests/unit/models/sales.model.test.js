const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { salesModel } = require('../../../src/models/index');
const { salesControllers } = require('../../../src/controllers/index');

const salesMock = [
  {
    saleId: 1,
    date: '2024-03-27T18:49:39.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-03-27T18:49:39.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-03-27T18:49:39.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleIdMock = { id: 1 };

const returnSaleIdMock = [
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
];

describe('Sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Should return all sales', async function () {
    sinon.stub(connection, 'execute')
      .resolves([salesMock]);
  
    const sales = await salesModel.findAll();
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(salesMock);
  });
      
  it('Should return sales by id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([returnSaleIdMock]);
  
    const sale = await salesModel.findById(saleIdMock);
    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(returnSaleIdMock);
  });

  it('Should return error when id does not exists', async function () {
    sinon.stub(salesModel, 'findById').resolves(null);
  
    const req = { params: { id: 99 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await salesControllers.findbyId(req, res);
  
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { message: 'Sale not found' });
  });
});