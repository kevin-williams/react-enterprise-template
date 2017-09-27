// load modules required by the server
const cluster = require('cluster');
const compression = require('compression');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require ('https');

const appRouter = require('./server/routes');

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

    console.log(`starting ${cpuCount} threads`);

    // Create a worker for each CPU thread
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
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
    console.log(`Server now listening on non-secure port: ${port}`);

    https.createServer(sslCert, app).listen(httpsPort);
    console.log(`Server now listening on secure port: ${httpsPort}`);

}