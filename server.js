// load modules required by the server
const cluster = require('cluster');
const compression = require('compression');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require ('https');
const winston = require('winston');

const appRouter = require('./server/routes');

// Just to do the winston setup before we log
const util = require('./server/util/serverUtility');

const app = express();
const port = 8080;
const httpsPort = 8443;

const sslCert = {
    key: fs.readFileSync('sslcert/private.key'),
    cert: fs.readFileSync('sslcert/certificate.pem')
}


// start clustering for production
if (cluster.isMaster) {
    // Count the machine's CPU Threads
    let cpuCount = require('os').cpus().length;

    winston.error(`starting ${cpuCount} threads`);

    // Create a worker for each CPU thread
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    // Add a default logging function for all routes
    app.use(function (request, response, next) {
        if (winston.level == 'debug') {
            winston.debug(`Calling request ${ request.originalUrl }`);

            let original = response.json.bind(response);
            response.json = (body) => {
                winston.debug(`Called request ${ request.originalUrl }\n\tresponse=${ JSON.stringify(body) }`);
                original(body);
            };
        }

        next();

    });

    // Redirect non-secure traffic to the secure server
    app.all('*', function (request, response, next) {
        if (request.secure) {
            return next();
        }

        response.redirect('https://' + request.hostname + ':' + httpsPort + request.url);
    });

    // Compress the objects served by this server to greatly reduce download size
    app.use(compression());

    // serve index.html and other public files like images
    app.use(express.static('public'));

    // serve the precompiled files
    app.use('/dist', express.static('dist'));

    // use express routing
    app.use('/api', appRouter);

    // redirect any missing routes to /
    app.use('*', function (request, response) {
        response.redirect('/');
    });

    // listen on http for dev
    http.createServer(app).listen(port);
    winston.error(`Server version ${process.env.npm_package_version} now listening on non-secure port: ${port}`);

    https.createServer(sslCert, app).listen(httpsPort);
    winston.error(`Server version ${process.env.npm_package_version} now listening on secure port: ${httpsPort}`);

}