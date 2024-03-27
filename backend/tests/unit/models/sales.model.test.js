const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { salesModel } = require('../../../src/models/index');

const salesMock = [
    {
      "sale_id": 1,
      "date": "2024-03-27T18:49:39.000Z",
      "product_id": 1,
      "quantity": 5
    },
    {
      "sale_id": 1,
      "date": "2024-03-27T18:49:39.000Z",
      "product_id": 2,
      "quantity": 10
    },
    {
      "sale_id": 2,
      "date": "2024-03-27T18:49:39.000Z",
      "product_id": 3,
      "quantity": 15
    }
  ];

describe('Sales', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('Should return all sales', async function () {
      sinon.stub(connection, 'execute')
        .resolves([salesMock]);
  
      const sales = await salesModel.findAll();
      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(3);
      expect(products).to.be.deep.equal(productsMock);
    });
      
    it('Should return sales by id', async function () {
      sinon.stub(connection, 'execute')
        .resolves([[idMock]]);
  
      const productId = 3;
      const product = await productsModel.findById(productId);
      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(returnIdMock);
    });