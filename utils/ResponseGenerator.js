var logger = require('../utils/GlobalLogger');

var ResponseGenerator = {
    prepareErrorResponse : (res,errCode,errMessage,responseCode) => {
        //We are using 200 hundred otherwise if return errors like 5xx node server has its
        //own interpretation and treats them differently
        res.statusCode = responseCode ? responseCode : 200; 
        logger.info(errMessage);
        res.json(
            {
                "error": {
                    "code":errCode,
                    "message":errMessage
                }
            }
        );
    },
    
    prepareSuccessResponse : (res,payload) => {
        res.statusCode = 200;
        res.json(payload);	
    }

}


module.exports = ResponseGenerator;