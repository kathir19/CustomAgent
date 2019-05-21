/* Logger Component */
const logger = require('../../utils/GlobalLogger');

const OccController = require("../controller/OccController");
var url = require('url');
/* Response Generator */
const responseGenerator = require('../../utils/ResponseGenerator');
const host = "https://ccadmin-z0wa.oracleoutsourcing.com";
const PROFILE_SEARCH_API = "/ccagent/v1/profiles";

module.exports = function (app) {
	'use strict';
	/*
	 * Get method is used to get the Profiles by given email,etc..
	 	GET http://localhost:3000/ccagent/custom//v1/search/profiles?email={}
	 	content-type: application/json
	 	authorization: Bearer {}
     */
	app.get('/v1/search/profiles', function (req, res) {
		let email = req.query.email || "''";
		let firstName = req.query.firstName;
		let lastName = req.query.lastName || "''";
		let postalCode = req.query.postalCode || "''";
		let phoneNumber = req.query.phoneNumber || "''";
		let headerStr = JSON.stringify(req.headers);
		let headerObj = JSON.parse(headerStr);
		let accessToken = headerObj.authorization;

		//console.log("email:",email,"\n","firstName:",firstName,"\n","lastName:",lastName,"\n","postalCode:",postalCode,"\n","phoneNumber:",phoneNumber);
		//console.log("Query Param :" + JSON.stringify(req.query));

		let search_query_param = '?q={email:' + email 
		+',firstName:' + firstName
		+',lastName:' + lastName
		+',postalCode:' + postalCode
		+',phoneNumber:' + phoneNumber+ ',limit:20,pageNumber:0,requireCount:false}';
		
		var headers = {
			'Authorization': accessToken
		}

		var occApiRequest = {
			method: 'get',
			json: true,
			url: host + PROFILE_SEARCH_API + search_query_param,
			headers: headers
		}

		let callMeBack = function (err, response) {
			if (err) {
				logger.debug("OccAgentController::post():Error: ", err);
				logger.debug("OccAgentController::post():Error: ", response);
			} else {

				var body = response.body;
				var profileList = body.profileList;
				//console.log("profileList:",JSON.stringify(response));
				res.status(200).json({
					"success": "true",
					"profileList": profileList
				});
			}
		}
		OccController.makeRequest(occApiRequest, callMeBack, function () { });
	});

	/* POST method is usesd to login with given username and password and 
	   it will give you the access token with the expire time  
	   http://localhost:3000/ccagent/custom/v1/login
	   content-type: application/json
	   Request Body
		{
			"username" : "kathiravan.munusamy@taistech.com",
			"password" : "Kat@apr2019"
		}
	   */

	app.post('/v1/login', function (req, res) {
		console.log("Login Started..");
		// var postData = {
		// 	"grant_type" : "password",
		// 	"password": "Pettest@apr2019",
		// 	"username": "kathiravan.munusamy@taistech.com"
		// }
		var userName = req.body.username;
		var password = req.body.password;
		var loginURL = "/ccagent/v1/login";

		var occApiRequest = {
			method: 'post',
			json: true,
			url: host + loginURL,
			form: {
				username: userName,
				password: password,
				grant_type: 'password'
			}
		}

		let callMeBack = function (err, response) {
			if (err) {
				logger.debug("OccAgentController::post():Error: ", err);
				logger.debug("OccAgentController::post():Error: ", response);
			} else {
				//logger.debug("Login API Response......", JSON.stringify(response));
				var statusCode = response.statusCode;
				var body = response.body;
				var accessToken = body.access_token;
				var expiresIn = body.expires_in;
				console.log("accessToken : ", accessToken);
				console.log("expiresIn:", expiresIn);
				res.status(200).json({
					"success": "true",
					"accessToken": accessToken,
					"expiresIn": expiresIn

				});

			}
		}
		OccController.makeRequest(occApiRequest, callMeBack, function () { });
	});


};