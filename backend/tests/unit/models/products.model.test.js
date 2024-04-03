const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { productsModel } = require('../../../src/models/index');
const { productsControlers } = require('../../../src/controllers/index');

const productsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const idMock = { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' };
const returnIdMock = { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' };

const updatedMock = {
  id: 1,
  name: 'Martelo do Batman',
};
 
describe('Products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Should return all products', async function () {
    sinon.stub(connection, 'execute')
      .resolves([productsMock]);

    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsMock);
  });
    
  it('Should return product by id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([[idMock]]);

    const productId = 3;
    const product = await productsModel.findById(productId);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(returnIdMock);
  });

  it('Should return error when id does not exists', async function () {
    sinon.stub(productsModel, 'findById').resolves(null);
  
    const req = { params: { id: 99 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsControlers.findbyId(req, res);
  
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { message: 'Product not found' });
  });

  it('Should create a new product and return the id', async function () {
    const productId = 4;
    
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: productId }]);

    const productName = 'ProductX';

    const id = await productsModel.createProduct(productName);
    expect(id).to.be.equal(4);    
  });

  it('Should update a product and return the id and name', async function () {
    const productId = 1;
    const productName = 'Martelo do Batman';
    
    sinon.stub(connection, 'execute')
      .resolves(updatedMock);

    const updatedProduct = await productsModel.updateProduct(productId, productName);
    expect(updatedProduct).to.be.deep.equal(updatedMock);    
  });
});