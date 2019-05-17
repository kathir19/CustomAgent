// stand-alone index.js

const winston = require('winston');
const express = require('express');
const app = express();
var envDetails = require('./utils/Config');

var logger = new (winston.Logger)({
  levels : {
    eror: 0,
    warning: 1,
    info: 2,
    debug: 3
  },
  transports: [
    new (winston.transports.Console)({ level: 'debug',colorize : true })
]
});



app.use(function(req,res,next){
    if(!res.locals){
      res.locals = {};
    }
    res.locals.logger = logger;
    next();
});

app.use("/ccagent/custom",require("./app/index"))

var port = 3000;

app.listen(port, function () {
  'use strict';
  logger.info('Listening on port ' + port +'...');
});
