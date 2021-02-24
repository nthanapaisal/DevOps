// REFERENCES
// https://nodejs.org/en/docs/guides/getting-started-guide/
// https://expressjs.com/

// read config
require('dotenv').config();

const fs = require('fs');
const https = require('https');
const http = require('http');
var cors = require('cors');

// express makes web services for node easy
const express = require('express');

/*var options = {
    key: fs.readFileSync('.ssl/server.key'),
    cert: fs.readFileSync('.ssl/server.cert'),
};*/

// init the express
const app = express();
//app.use(express.json());
app.use(cors());

// hook up the routers
// property router handles all the routes that work with properties
const propertyRouter = require('./routes/property');
app.use('/properties', propertyRouter);
// swagger router handles any swagger calls
const swaggerRouter = require('./routes/swagger');
app.use('/swagger.json', swaggerRouter);
// hello is misc functionality so throw it in its own router
const helloRouter = require('./routes/hello');
app.use('/hello', helloRouter);

// setup the logger
const utilities = require("./misc/utilities");
const logger = utilities.getLogger();
/*
const cors = require("cors");
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());*/


var httpServer = http.createServer(app).listen(process.env.HTTP_LISTEN_PORT, function () {
	console.log('API server is listening on port ' + process.env.HTTP_LISTEN_PORT + '...');
    logger.info('API server is listening on port ' + process.env.HTTP_LISTEN_PORT + '...');
});
var httpsServer = https.createServer(options, app).listen(process.env.HTTPS_LISTEN_PORT, function () {
	console.log('API server is listening on port ' + process.env.HTTPS_LISTEN_PORT + '...');
    logger.info('API server is listening on port ' + process.env.HTTPS_LISTEN_PORT + '...');
});