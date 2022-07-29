const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
	suite('Routing tests', () => {
		test('Valid input (10L) to /api/convert', done => {
			chai.request(server)
				.get('/api/convert')
				.query({input: '10L'})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.initNum, 10)
					assert.equal(res.body.initUnit, 'L')
					assert.approximately(res.body.returnNum, 2.64172, 0.1)
					assert.equal(res.body.returnUnit, 'gal')
					done()
				})
		})

		test('Convert invalid input (32g) to /api/convert', done => {
			chai.request(server)
				.get('/api/convert')
				.query({input: '32g'})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.initNum, undefined)
					done()
				})
		})
		test('Convert invalid input (3/7.2/4kg) to /api/convert', done => {
			chai.request(server)
				.get('/api/convert')
				.query({input: '3/7.2/4kg'})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.initNum, undefined)
					done()
				})
		})
		test('Convert invalid input (3/7.2/4kilomegagram) to /api/convert', done => {
			chai.request(server)
				.get('/api/convert')
				.query({input: '3/7.2/4kilomegagram'})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.initNum, undefined)
					assert.equal(res.body.initUnit, undefined)
					done()
				})
		})
		test('Convert no number input (kg) to /api/convert', done => {
			chai.request(server)
				.get('/api/convert')
				.query({input: 'kg'})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.initNum, 1)
					assert.equal(res.body.initUnit, 'kg')
					assert.approximately(res.body.returnNum, 2.20462, 0.1)
					assert.equal(res.body.returnUnit, 'lbs')
					done()
				})
		})
	})
});
