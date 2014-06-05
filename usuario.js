var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	nombre: String,
	email : String,
	pass: String,
	regId: String
});

module.exports =  mongoose.model('Usuario', userSchema);
