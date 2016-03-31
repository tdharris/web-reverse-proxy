var winston = require('winston'),
	leveler = require('log-leveler'),
	fs = require('fs'),
	logDir = 'logs';

var config = leveler({
    info: true,
    debug: true,
    warn: true,
    error: true
});

config.colors = {};

// Create the directory if it does not exist
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

var logger = new (winston.Logger)({
	levels: config.levels,
	colors: config.colors,
	transports: [
		new (winston.transports.Console)({
			level: config.level,
			colorize: true
		})
		// ,
		// new winston.transports.File({
		// 	level: config.level,
		// 	colorize: true,
		// 	json: false,
		// 	tailable: true,
		// 	zippedArchive: true,
		// 	filename: logDir + '/kcs-analytics.log',
		// 	handleExceptions: true,
		// 	timestamp: true,
		// 	maxFiles: 5,
		// 	maxsize: 1024 * 1024 * 1024 * 10 // 100MB
		// })
	]
});

module.exports = logger;
