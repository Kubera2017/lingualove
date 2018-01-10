var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var wordSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    translation: {
        type: String,
    },
    lessons: [{
        date: Date,
        result: Boolean
    }]
}, {
        timestamps: true
    });

var Words = mongoose.model('Word', wordSchema);

module.exports = Words;