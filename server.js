// load modules required by the server
const fs = require('fs');
const http = require('http');
const https = require ('https');
const express = require('express');
const compression = require('compression');
const appRouter = require('./server/Routes');

const app = express();
const port = 3000;
const httpsPort = 3443;

const sslCert = {
    key: fs.readFileSync('sslcert/private.key'),
    cert: fs.readFileSync('sslcert/certificate.pem')
}


// Redirect non-secure traffic to the secure server
app.all('*', function(request, response, next) {
    if (request.secure) {
        return next();
    }

    response.redirect('https://' + request.hostname + ':' + httpsPort + request.url);
});

app.use(compression());

// use express routing
app.use('/api', appRouter);

// serve index.html
app.use(express.static('public'));

// listen on http for dev
http.createServer(app).listen(port);
console.log(`Server now listening on non-secure port: ${port}`);

https.createServer(sslCert, app).listen(httpsPort);
console.log(`Server now listening on secure port: ${httpsPort}`);

