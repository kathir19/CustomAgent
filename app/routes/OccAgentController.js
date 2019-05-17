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
			logger.debug('Inside Profile Search API : ' + email);
			
			var search_query_param='?q={email:'+email+',limit:20,pageNumber:0,requireCount:false}';
			var headers = {
				'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6InR6MHdhMGMwIiwia2lkIjpudWxsLCJ4NWMiOm51bGwsIng1dSI6Imh0dHBzOi8vY2NhZG1pbi16MHdhLm9yYWNsZW91dHNvdXJjaW5nLmNvbS9jY2FkbWluL3YxL3RlbmFudENlcnRDaGFpbiJ9.eyJpYXQiOjE1NTgxMDg5NDcsImV4cCI6MTU1ODEwOTg0Nywic3ViIjoiaXVzZXI2MjUxMzEiLCJhdWQiOiJhZ2VudCIsImNvbS5vcmFjbGUuYXRnLmNsb3VkLmNvbW1lcmNlLnJvbGVzIjpbInNldHRpbmdzUm9sZSIsIm1hcmtldGluZ1JvbGUiLCJkYXNoYm9hcmRSb2xlIiwiY2F0YWxvZ1JvbGUiLCJwcmV2aWV3Um9sZSIsImFjY291bnRNYW5hZ2VyUm9sZSIsInNlYXJjaFJvbGUiLCJjc0FnZW50Um9sZSIsInB1Ymxpc2hpbmdSb2xlIiwiY3NBZ2VudFN1cGVydmlzb3JSb2xlIiwicmVwb3J0aW5nUm9sZSIsImRlc2lnblJvbGUiLCJtZWRpYVJvbGUiXSwib2Njcy5hZG1pbi5yb2xlcyI6WyJzZXR0aW5nc1JvbGUiLCJtYXJrZXRpbmdSb2xlIiwiZGFzaGJvYXJkUm9sZSIsImNhdGFsb2dSb2xlIiwicHJldmlld1JvbGUiLCJhY2NvdW50TWFuYWdlclJvbGUiLCJzZWFyY2hSb2xlIiwiY3NBZ2VudFJvbGUiLCJwdWJsaXNoaW5nUm9sZSIsImNzQWdlbnRTdXBlcnZpc29yUm9sZSIsInJlcG9ydGluZ1JvbGUiLCJkZXNpZ25Sb2xlIiwibWVkaWFSb2xlIl0sImlzcyI6Imh0dHBzOi8vY2NhZG1pbi16MHdhLm9yYWNsZW91dHNvdXJjaW5nLmNvbS9vY2NzLWFkbWluIiwib2Njcy5hZG1pbi5sb2NhbGUiOiJlbl9VUyIsIm9jY3MuYWRtaW4udHoiOm51bGwsIm9jY3MuYWRtaW4udGVuYW50VHoiOiJFdGMvVVRDIiwib2Njcy5hZG1pbi5rZWVwQWxpdmVVUkwiOiJodHRwczovL2NjYWRtaW4tejB3YS5vcmFjbGVvdXRzb3VyY2luZy5jb20va2VlcGFsaXZlIiwib2Njcy5hZG1pbi50b2tlblJlZnJlc2hVUkwiOiJodHRwczovL2NjYWRtaW4tejB3YS5vcmFjbGVvdXRzb3VyY2luZy5jb20vY2NhZG1pbi92MS9zc29Ub2tlbnMvcmVmcmVzaCIsIm9jY3MuYWRtaW4udmVyc2lvbiI6IjE4LjYuMi4yIiwib2Njcy5hZG1pbi5idWlsZCI6ImplbmtpbnMtQXNzZW1ibGVfQ2xvdWRfQ29tbWVyY2VfRUFSc18tMThfNlBhdGNoZXMtMzUiLCJvY2NzLmFkbWluLmVtYWlsIjpudWxsLCJvY2NzLmFkbWluLnByb2ZpbGVJZCI6Iml1c2VyNjI1MTMxIiwib2Njcy5hZ2VudC5vYm8iOm51bGwsIm9jY3MuYWRtaW4uZmlyc3ROYW1lIjpudWxsLCJvY2NzLmFkbWluLmxhc3ROYW1lIjpudWxsLCJvY2NzLmFkbWluLnB1bmNob3V0VXNlciI6ZmFsc2V9.NVh8C6hfsn81ECmZxxKdcqJj10lLNjSajSe1vbC4sMfEXC8azOQaPjY6EnwiE8O+/lfpROE0z1IDUGdFunx5LRyKPhsmeKLDQ2M6TCbqPQo98YeJnSvDgkeSy6Ol52kDSPlkAwo1lv8ykUdXDc2jAAbA0xgs2vx+YRI6wpE8J40QWkwRwiHFp03+L+SpzWszXXOQDTbqJXFLYvPoOEAPPLpc4VlNMic9xpjiWwOi8a0QIpZjFVUvLx2SlQ1kkt8P8VojC3Lr2dsXnCmZEzdllydIt7cG9jrMtg+x0sOHpADIt07Iw27b06DAmS0cWws9QV4Ay2lxh4Tree3Hi9eO/Q=='
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