var fs = require('fs'),
	http = require('http'),
    https = require('https'),
	express = require('express'),
	app = express(),
	httpProxy = require('http-proxy'),
	apiProxy = httpProxy.createProxyServer(),
	servers = require('./config-servers'),
	logger = require('./logger');

var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
};

logger.info('Starting web-reverse-proxy...');
servers.forEach(function(server){
	app.all(server.path+"/*", function(req, res) {
	    logger.debug('redirecting to', server.name, '('+server.url+')', req.url);
	    req.url = '/' + req.url.split('/').slice(2).join('/'); // remove the '/api' ('mount-path') part
	    apiProxy.web(req, res, {target: server.url});
	});
	logger.debug('Proxy service setup for server:', server);
});
logger.info('Finished loading web-reverse-proxy services.');

// Redirect from http port 80 to https
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80, function(){
  logger.info("Express server listening on port " + 80);
});

// Create https server (443)
var server = https.createServer(options, app).listen(443, function(){
  logger.info("Express server listening on port " + 443);
});