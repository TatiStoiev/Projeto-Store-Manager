const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsModel } = require('../../../src/models/index');
const { productsControlers } = require('../../../src/controllers/index');

chai.use(sinonChai);

const allProductMock = [
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

const returnFindByIdMock = {
  id: 3,
  name: 'Escudo do CapitÃ£o AmÃ©rica',
};

const newProductMock = {
  id: 7,
  name: 'Product X',
};

const updateMock = {
  id: 1,
  name: 'Martelo do Batman',
};

describe('Products controller', function () {
  describe('Find products', function () {
    afterEach(function () { return sinon.restore(); });

    it('Should return status 200 and the products json', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productsModel, 'findAll')
        .resolves(allProductMock);
  
      await productsControlers.findAll({}, res);     
         
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(allProductMock));      
    });

    it('Should return status 200 and the product json when find by id', async function () {
      const req = {
        params: {
          id: 3,
        },
      };   

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productsModel, 'findById')
        .resolves(returnFindByIdMock);

      await productsControlers.findbyId(req, res);   
       
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({
        id: 3,
        name: 'Escudo do CapitÃ£o AmÃ©rica',
      })).to.be.equal(true);
    });

    it('Should return status 404 and the message "Product not found" when id does not exist', async function () {
      const req = {
        params: {
          id: 99,
        },
      };   

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productsModel, 'findById')
        .resolves(undefined);

      await productsControlers.findbyId(req, res);   
       
      expect(res.status.calledWith(404)).to.be.equal(true); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Insert new products', function () {
    afterEach(function () { return sinon.restore(); });
    it('Should retorn status 201 and a json with id and name of the new product', async function () {
      const req = {
        body: {
          name: 'Product X',
        },
      };   

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productsModel, 'createProduct')
        .resolves(7);

      await productsControlers.createProduct(req, res);   
       
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(newProductMock)).to.be.equal(true);
    });
  });
  it('Should update a product and return status 200 and a json with id and name of product', async function () {
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Martelo do Batman',
      },
    };   

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsModel, 'updateProduct')
      .resolves(updateMock);

    await productsControlers.updateProduct(req, res);   
     
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json).calledWith(updateMock);
  });
});
