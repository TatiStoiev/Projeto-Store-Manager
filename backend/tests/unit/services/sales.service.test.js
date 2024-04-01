const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { salesModel } = require('../../../src/models/index');
const { salesServices } = require('../../../src/services/index');

const insertSaleMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
  
const returnSaleCreated = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};
  
describe('Sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Should create a new sale', async function () {
    sinon.stub(salesModel, 'getSaleId').resolves(returnSaleCreated.id);
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: returnSaleCreated.id }]);

    const sale = await salesServices.createSales(insertSaleMock);
  
    expect(sale).to.be.deep.equal(returnSaleCreated);
  });
});
