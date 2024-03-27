const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsModel } = require('../../../src/models/index');
const { productsControlers } = require('../../../src/controllers/index');

chai.use(sinonChai);

describe('Products controller', function () {
  afterEach(function () { return sinon.restore(); });

  it('Should return status 200 and the products json', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsModel, 'findAll')
      .resolves([
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
      ]);
  
    await productsControlers.findAll({}, res);     
         
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith([
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
    ]));      
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
      .resolves({
        id: 3,
        name: 'Escudo do CapitÃ£o AmÃ©rica',
      });

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