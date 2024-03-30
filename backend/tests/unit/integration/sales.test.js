const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../../src/app');
const { salesModel } = require('../../../src/models');

chai.use(chaiHttp);

describe('GET /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Should return status 200 and the sales json when id exists', async function () { 
    const saleId = 2;

    const saleMock = [
      {
        productId: 3,
        quantity: 15,
        date: '2024-03-27T22:38:06.000Z',
      },
    ];

    sinon.stub(salesModel, 'findById')
      .withArgs(saleId)
      .resolves(saleMock);
    
    const response = await chai.request(app)
      .get(`/sales/${saleId}`);

    expect(response.status).to.be.equal(200); 
    expect(response.body).to.deep.equal(saleMock); 
    expect(response.body[0]).to.have.all.keys(['productId', 'quantity', 'date']); 
  });

  it('Should return status 404 and the message "Sale not found" when id does not exist', async function () {
    const saleId = 99;

    sinon.stub(salesModel, 'findById')
      .withArgs(saleId)
      .resolves(undefined);

    const response = await chai.request(app).get(`/sales/${saleId}`);

    expect(response).to.have.status(404);

    expect(response.body).to.deep.equal({ message: 'Sale not found' });
  });

  it('Should return status 404 and the message "Sale not found" when sale does not exist', async function () {
    const saleId = 3;

    sinon.stub(salesModel, 'findById')
      .withArgs(saleId)
      .resolves(false);

    const response = await chai.request(app).get(`/sales/${saleId}`);

    expect(response).to.have.status(404);

    expect(response.body).to.deep.equal({ message: 'Sale not found' });
  });
});
