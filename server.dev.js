// load modules required by the server
const express = require('express');
const app = express();
const path = require ('path');

const appRouter = require('./server/Routes');
const config = require('./webpack.config.dev.js');

const port = config.devServer.port;



app.use(express.static('public'));
app.use('/dist', express.static(path.join(__dirname, 'dist'))) // JS bundles

// use express routing
// app.use('/api', appRouter);

// listen on http for dev
app.listen(port, () => console.log(`server now listening on localhost: ${port}
    *** wait for webpack built message ***`));

// Hot reloading
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);

// set quiet: false if you need to see webpack messages
app.use(webpackDevMiddleware(compiler, { quiet: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
