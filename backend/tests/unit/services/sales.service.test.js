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

const saleIdMock = { id: 1 };
  
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
  it('Should call insertSale from salesModel with correct argument', async function () {
    const array = [{ productId: 1, quantity: 2, price: 20 }];

    const insertSaleStub = sinon.stub(salesModel, 'insertSale');

    await salesServices.createSales(array);

    expect(insertSaleStub).to.be.calledOnceWith(array);
  });

  it('Should delete a sale', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(1);
    sinon.stub(connection, 'execute').resolves([{ rowsAffected: 1 }]);

    const sale = await salesServices.deleteSale(saleIdMock);

    expect(sale).to.be.equal(1);
  });
});
