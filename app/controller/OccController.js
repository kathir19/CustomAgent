var occRequest = require("request");

var OccController = {

    testfun: function() {
        console.log("Test Function...")
    },

    makeRequest: function(request, callMeBack) {
        console.log("Calling OccController::mkaeRequest()...");
        console.log(" Request : ",JSON.stringify(request));
    let method = request.method;

        if(method=='get'){

            occRequest.get(request, function(err, res, body) {
                if (err) {
                    console.error('error posting json: ', err);
                    throw err;
                }
                //            console.log('Controller Response',JSON.stringify(res));
                var response = res;
                callMeBack(err, res);
            });

        }else if(method=='post'){

            occRequest.post(request, function(err, res, body) {
                if (err) {
                    console.error('error posting json: ', err);
                    throw err;
                }
                //            console.log('Controller Response',JSON.stringify(res));
                var response = res;
                callMeBack(err, res);
            });

        }

    }
}
module.exports = OccController;