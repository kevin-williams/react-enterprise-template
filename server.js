// load modules required by the server
const http = require('http');
const express = require('express');
const compression = require('compression');
const appRouter = require('./server/Routes');

const app = express();
const port = 3000;

app.use(compression());

// use express routing
app.use('/api', appRouter);

// serve index.html
app.use(express.static('public'));

// listen on http for dev
http.createServer(app).listen(port);
