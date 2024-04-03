// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = require('chai');
// const sinon = require('sinon');
// const app = require('../../../src/app');
// const { salesModel } = require('../../../src/models');

// chai.use(chaiHttp);

// describe('PUT /products/:id', function () {
//   afterEach(function () {
//     sinon.restore();
//   });
//   describe('Validations', function () {
//     it('Should return status 400 and the message "name is require" when the request does not have the name field', function (done) {
//       chai.request(app)
//         .put('/test')
//         .send({})
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body).to.have.property('message').equal('"name" is required');
//           done();
//         });
//     });
//   });
// });
