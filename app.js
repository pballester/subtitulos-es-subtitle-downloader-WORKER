'use strict';

// Module dependencies.
var request = require('request');
var tvShowSchema = require('./models/tvShow');

// Connect to database
var db = require('./config/db');

//Model
var TvShow = db.mongoose.models.TvShow;

//Service URL
var SERVICE_URL = process.env.SERVICE_URL;

//Remove collection from DB
TvShow.remove({}, function(err) {
    console.log('Collection tvShow removed');
    //API call
    console.log("Getting tvShows...");
    request({
        url: SERVICE_URL,
        json: true
    }, function(err, res, body) {
        var tvShow;
        var counter = 1;
        body.forEach(function(tvShowItem) {
            tvShow = new TvShow(tvShowItem);
            // Add tvShows to DB
            tvShow.save(function(err, product) {
                if (!err) {
                    console.log("TvShow " + product.title + " inserted in DB");
                } else {
                    console.log("Error inserting " + product.title + " in DB");
                }
                if (counter == body.length) {
                    console.log("Exiting app...");
                    if (db != null) {
                        db.mongoose.connection.close();
                    }
                    process.exit();
                }
                counter++;
            })
        })
    });
});
