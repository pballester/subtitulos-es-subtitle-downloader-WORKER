'use strict';
var mongoose = require('mongoose');

var config = {
    "db": process.env.dbName,
    "host": process.env.dbHost,
    "user": process.env.dbUser,
    "pw": process.env.dbPass,
    "port": process.env.dbPort
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var uristring = "mongodb://" + login + config.host + port + "/" + config.db;

var mongoOptions = {
    db: {
        safe: true
    }
};

// Connect to Database
mongoose.connect(uristring, mongoOptions, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Successfully connected to: ' + uristring);
    }
});

exports.mongoose = mongoose;
