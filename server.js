var Express = require('express');
var config = require('./config');
var compression = require('compression');
var httpProxy = require('http-proxy');
var path = require('path');
var http = require('http');
var historyApiFallback = require('connect-history-api-fallback');

const targetUrl = 'http://' + config.app.host + ':' + config.app.apiPort;
var static_path = path.join(__dirname, '/app/dist');
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl
});

app.use(compression());
app.use(historyApiFallback());
app.use(Express.static(static_path));

// Proxy to API server
app.use('/api', function(req, res) {
  proxy.web(req, res, {target: targetUrl});
});


// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', function(error, req, res) {
  var json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});


server.listen(process.env.PORT || config.app.port, function(err) {
  if (err) {
    console.error(err);
  }
});
