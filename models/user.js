var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    //add recipes later
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);