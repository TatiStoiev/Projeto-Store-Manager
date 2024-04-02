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
const insertSaleWithNoIdMock = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
const insertSaleWithNoQuantityMock = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
const mockId = [
  {
    productId: 1,
    quantity: 5,
    date: '2024-03-27T19:53:56.000Z',
  },
  {
    productId: 2,
    quantity: 10,
    date: '2024-03-27T19:53:56.000Z',
  },
];
const isertSaleWithQuantity0 = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
  
describe('Sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Should create a new sale', async function () {
    sinon.stub(salesModel, 'getSaleId').resolves(returnSaleCreated.id);
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: returnSaleCreated.id }]);
    
    sinon.stub(salesServices, 'createSales').resolves(returnSaleCreated);

    const sale = await salesServices.createSales(insertSaleMock);
  
    expect(sale).to.be.deep.equal(returnSaleCreated);
  });

  describe('Validations for create a new Sale', function () {
    it('It is not possible to create a new Sale with no productId', async function () {
      try {
        await salesServices.createSales(insertSaleWithNoIdMock);
      } catch (error) {
        expect(error.message).to.equal('"productId" is required');
      }
    });
    it('It is not possible to create a new Sale with an productId that not exist in database', async function () {
      sinon.stub(salesModel, 'findById')
        .withArgs(1)
        .resolves(undefined);

      try {
        await salesServices.createSales(insertSaleWithNoIdMock);
      } catch (error) {
        expect(error.message).to.equal('Product not found');
      }
    });
  });
  it('It is not possible to create a new Sale with no quantity', async function () {
    sinon.stub(salesModel, 'findById')
      .resolves(mockId);
    try {
      await salesServices.createSales(insertSaleWithNoQuantityMock);
    } catch (error) {
      expect(error.message).to.contain('"quantity" is required');
    }
  });
  it('It is not possible to create a new Sale with quantity equal to 0', async function () {
    sinon.stub(salesModel, 'findById')
      .resolves(mockId);
    try {
      await salesServices.createSales(isertSaleWithQuantity0);
    } catch (error) {
      expect(error.message).to.contain('"quantity" must be greater than or equal to 1');
    }
  });
});
