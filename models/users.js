var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
        }]
}, {
        timestamps: true
    });

var Users = mongoose.model('User', userSchema);

module.exports = Users;