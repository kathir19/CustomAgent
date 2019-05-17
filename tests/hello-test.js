//Require the dev-dependencies
var request = require('request');
var baseUrl = 'http://localhost:3000';

describe('Sample hello world Jasmine tests', function() {

	it('should respond to /v1/hello GET', function(done) {
	  request.get(baseUrl+'/v1/hello',function(err, res){
			expect(res.statusCode).toBe(200);
			done();
		});
	});

	it('should respond to /v1/hello  and body should be (test : ok)', function(done) {
		request.get(baseUrl+'/v1/hello',function(err, res){
			  expect(res.body).toBe(JSON.stringify({"test":"ok"}));
			  done();
		  });
	  });

	  it('should respond ok to  /v1/orderSubmit', function(done) {
		request.post({url : baseUrl+'/v1/orderSubmit',body : {"order":{"id":2452462}},json:true},function(err, res){
			  expect(res.statusCode).toBe(200);
			  done();
		  });
	  });

	  it('should respond ok to /v1/orderSubmit and body should have order id', function(done) {
		request.post({url : baseUrl+'/v1/orderSubmit',body : {"order":{"id":2452462}},json:true},function(err, res){
			  expect(res.body.orderId).toBe(2452462);
			  expect(res.body.city).toBe('Dallas');
			  done();
		  });
	  });
  

});
