console.log('starting test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test To Do lists result', function () {
	this.timeout(15000);

	var requestResult;
	var response;
		 
	before(function(done) {
		chai.request('http://seattleumytodo.azurewebsites.net/')
			.get('/app/lists/')
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				done();
			});
	});

	it('Should return an array object with three objects', function(done){
		expect(response).to.have.status(200);
		expect(requestResult).to.be.an.object;
		expect(requestResult).to.have.length.above(1);
		expect(response).to.have.headers;
		done();
	});
	it('The first entry in the array has known properties', function(done){
		expect(requestResult[0]).to.include.keys('name');
		expect(response).to.have.deep.property('body[0].listId', '1');
		expect(response.body).to.not.be.a.string;
		done();
	});

	it('The elements in the array have the expecte properties', function(done){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('name');
					expect(body[i]).to.have.property('description');
					expect(body[i]).to.have.property('listId');
					expect(body[i]).to.have.property('state').to.have.length(1);
					expect(body[i]).to.have.property('owner').that.is.a('string');
				}
				return true;
			});
		done();
	});	
	
});