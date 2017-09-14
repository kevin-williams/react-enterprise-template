// load modules required by the server
const express = require('express');
const app = express();
const fs = require('fs');
const https = require ('https');
const path = require ('path');

const appRouter = require('./server/Routes');
const config = require('./webpack.config.dev.js');

const port = config.devServer.port;
const httpsPort = config.devServer.sslPort

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

app.use(express.static('public'));
app.use('/dist', express.static(path.join(__dirname, 'dist'))) // JS bundles

// use express routing
// app.use('/api', appRouter);

// listen on http for dev
app.listen(port, () => console.log(`Server listening on non-secure port ${port}`));

// Hot reloading
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);

// set quiet: false if you need to see webpack messages
app.use(webpackDevMiddleware(compiler, { quiet: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

https.createServer(sslCert, app).listen(httpsPort);
console.log(`Server now listening on localhost: ${httpsPort}
    *** wait for webpack built message ***`);

