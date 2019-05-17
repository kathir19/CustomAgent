/* Logger Component */
const logger = require('../../utils/GlobalLogger');

const OccController = require("../controller/OccController");

/* Response Generator */
const responseGenerator = require('../../utils/ResponseGenerator');
const host = "https://ccadmin-z0wa.oracleoutsourcing.com";
const PROFILE_SEARCH_API = "/ccagent/v1/profiles";

module.exports = function(app) {
    'use strict';
    /*
     * Post method is used to get the Input of Order, Quantity and Shipping
     * Address and modify the Order
     */
		//https://ccadmin-z0wa.oracleoutsourcing.com/ccagentui/v1/profiles?q={"email":"petmate@taistech.com","limit":20,"pageNumber":0,"requireCount":false}
		app.get('/v1/search/profiles',function(req,res){
			let email = req.query.email;
			let accessToken = req.query.accessToken;

			// logger.debug('Inside Profile Search API email: ' + email);
			logger.debug('Inside Profile Search API accessToken: ' + accessToken);
			
			var search_query_param='?q={email:'+email+',limit:20,pageNumber:0,requireCount:false}';
			var headers = {
				'Authorization': 'Bearer ' + accessToken
			}

			var occApiRequest = {
				method: 'get',
				json: true,
				url: host + PROFILE_SEARCH_API+search_query_param,
				headers: headers
		}

		let callMeBack = function(err, response) {
			if (err) {
					logger.debug("OccAgentController::post():Error: ", err);
					logger.debug("OccAgentController::post():Error: ", response);
			} else {
					console.log("profileList:",JSON.stringify(response));

				var body = response.body;
					var profileList = body.profileList;
					//console.log("profileList:",JSON.stringify(profileList));
					res.status(200).json({
					"success" : "true",
					"profileList" : profileList

				});

			}
	}
	OccController.makeRequest(occApiRequest, callMeBack, function() {
	});

		});

    app.post('/v1/login', function(req, res) {
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

        let callMeBack = function(err, response) {
            if (err) {
                logger.debug("OccAgentController::post():Error: ", err);
                logger.debug("OccAgentController::post():Error: ", response);
            } else {
								//logger.debug("Login API Response......", JSON.stringify(response));
								var statusCode = response.statusCode;
								var body = response.body;
								var accessToken = body.access_token;
								var expiresIn = body.expires_in;
								console.log("accessToken : ",accessToken);
								console.log("expiresIn:",expiresIn);
								res.status(200).json({
									"success" : "true",
									"accessToken" : accessToken,
									"expiresIn" : expiresIn

								});

            }
        }
        OccController.makeRequest(occApiRequest, callMeBack, function() {
        });
    });


};