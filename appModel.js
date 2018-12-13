var mongoose = require('mongoose');

var appSchema = mongoose.Schema({

    appTitle: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
       // required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    authors:{
        type: [String],
        required: true
    }

});



var App = module.exports = mongoose.model('app', appSchema);

module.exports.get = function (callback, limit) {
    App.find(callback).limit(limit);
}