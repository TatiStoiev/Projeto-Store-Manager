const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const {productsModel} = require('../../../src/models/index')

const productsMock = [
    {
      "id": 1,
      "name": "Martelo de Thor"
    },
    {
      "id": 2,
      "name": "Traje de encolhimento"
    },
    {
      "id": 3,
      "name": "Escudo do CapitÃ£o AmÃ©rica"
    }
  ]

  const idMock = {"id": 3, "name": "Escudo do CapitÃ£o AmÃ©rica"}
  const returnIdMock = {"id": 3, "name": "Escudo do CapitÃ£o AmÃ©rica"}
 
  describe('Products', function () {
    it('Must return all products', async function () {
        sinon.stub(connection, 'execute')
        .resolves([productsMock])

        const products = await productsModel.findAll();
        expect(products).to.be.an('array');
        expect(products).to.have.lengthOf(3);
        expect(products).to.be.deep.equal(productsMock);
        afterEach(function () {
            sinon.restore();
        })
    } )
    
    it('Must return product by id', async function () {
      sinon.stub(connection, 'execute')
      .resolves([[idMock]])

      const productId = 3;
      const product = await productsModel.findById(productId);
      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(returnIdMock)

      afterEach(function () {
        sinon.restore();
    })
    })

    it('Must return error when id does not exists', async function () {
      sinon.stub(connection, 'execute')
      .resolves([[]])

      const invalidId = 99;
      const product = await productsModel.findById(invalidId);      
      expect(product).to.be.undefined     

      afterEach(function () {
        sinon.restore();
    })
    })
  })