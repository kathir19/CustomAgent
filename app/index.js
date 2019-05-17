'use strict';
// index.js

var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var logger = require('winston');
var nconf = require('nconf');
var HttpsProxyAgent = require('https-proxy-agent');

var gLogger = require('../utils/GlobalLogger');
var envDetails = require('../utils/Config');

// Export Express 4 style sup-application in order to be embedded in OCCS server-side extension architecture
var app = module.exports = new express.Router();
//var app = module.exports = express();
//console.log('inside index.js.....')
var proxy = process.env.http_proxy || nconf.get('general:proxy-server');
if(proxy){
	envDetails.proxyUrl = proxy;
	envDetails.proxyAgent = new HttpsProxyAgent(proxy);
}

if(nconf.get('atg.server.url') ){
	envDetails.storeUrl = nconf.get('atg.server.url') ;
}
if(nconf.get('atg.server.admin.url') ){
	envDetails.adminUrl = nconf.get('atg.server.admin.url');
}
if(nconf.get('atg.application.credentials:atg.application.token') ){
	envDetails.apiKey = nconf.get('atg.application.credentials:atg.application.token') ;
}
if(nconf.get('atg.server.url') ){
	envDetails.storeUrl = nconf.get('atg.server.url') ;
}
if(envDetails.adminUrl){
	envDetails.hostname = envDetails.adminUrl;
}

app.use(function(req,res,next){
	gLogger.setLogger(res.locals.logger);
	next();
});


app.use(bodyParser.json({

    verify: function(req, res, buf, encoding) {
		
		if (req.headers['x-oracle-cc-webhook-signature'] !== undefined) {
			//Read secret key from config 
			if (config.has('keys.'+req.url)) {
				
				var secret_key = config.get('keys.'+req.url);
				logger.info('config.keys'+req.url+':', secret_key);
				
				// Secret key is base64 encoded and must be decoded into bytes; BUG 24619421::Documentation for HMAC SHA1 key from the raw key bytes 
				var decoded_secret_key = Buffer.from(secret_key, 'base64'); 

				var calculated_signature = crypto.createHmac('sha1', decoded_secret_key)
					.update(buf, encoding)
					.digest('base64');

				logger.debug("x-oracle-cc-webhook-signature: ", req.headers['x-oracle-cc-webhook-signature'], "calculated_signature: ", calculated_signature );
				
				if (calculated_signature != req.headers['x-oracle-cc-webhook-signature']) {
					logger.error('Invalid signature. Access denied');
					throw new Error('Invalid signature. Access denied');
				}
			}
		}  else {
			logger.warn('No secret key provided for request: ' + req.url);
			//throw new Error('Signature not included. Access denied');
		}
    }
}));

try {
	// Load all routes
	require('./routes')(app, logger);
} catch (e) {
	logger.error(e.message);
}


//app.listen(3000, function () {
//  logger.info('Listening on port 3000...');
//});
