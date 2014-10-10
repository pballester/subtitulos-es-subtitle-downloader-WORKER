'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fields = {
    title: {
        type: String
    },
    id: {
        type: Number
    },
    seasons: {
        type: Number
    }
};

var tvShowSchema = new Schema(fields);

module.exports = mongoose.model('TvShow', tvShowSchema);
