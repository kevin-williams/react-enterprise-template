// load modules required by the server
const express = require('express');
const app = express();
const fs = require('fs');
const https = require ('https');
const path = require ('path');
const winston = require('winston');

const appRouter = require('./server/routes');
const config = require('./webpack.config.dev.js');

// Just to do the winston setup before we log
const util = require('./server/util/serverUtility');

const port = config.devServer.port;
const httpsPort = config.devServer.sslPort

const sslCert = {
    key: fs.readFileSync('sslcert/private.key'),
    cert: fs.readFileSync('sslcert/certificate.pem')
}

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
app.all('*', function(request, response, next) {
    if (request.secure) {
        return next();
    }

    response.redirect('https://' + request.hostname + ':' + httpsPort + request.url);
});

app.use(express.static('public'));
app.use('/dist', express.static(path.join(__dirname, 'dist'))) // JS bundles

// Route server side calls to the route handler
app.use('/api', appRouter);

// listen on http for dev
app.listen(port, () => winston.error(`Server version ${process.env.npm_package_version} listening on non-secure port ${port}`));

// Hot reloading - watches for changes to the files and recompiles/packs when detected
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);

// Fix the webpack compiler looping problem
const timefix = 11000;
compiler.plugin('watch-run', (watching, callback) => {
    watching.startTime += timefix;
    callback()
});
compiler.plugin('done', (stats) => {
    stats.startTime -= timefix
})

// set quiet: false if you need to see webpack messages, true if you want shorter output on the server side
app.use(webpackDevMiddleware(compiler, { quiet: false, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// redirect any missing routes to /
app.use('*', function(request, response) {
    response.redirect('/');
});

https.createServer(sslCert, app).listen(httpsPort);
winston.error(`Server version ${process.env.npm_package_version} now listening on localhost: ${httpsPort}
    *** wait for webpack built message ***`);