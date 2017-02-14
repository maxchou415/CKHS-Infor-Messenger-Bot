var mongoose = require('mongoose');
var shortId = require('shortid');

mongoose.connect('mongodb://localhost/ckhs-messenger-bot');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    facebook_uid: { type: String },
    _id: { type: String, default: shortId.generate },

    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
