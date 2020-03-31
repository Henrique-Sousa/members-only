const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	fullname: {type:String, required:true, max:100},
	username: {type:String, required:true, max:100},
	password: {type:String, required:true},
	membership_status: {type:String, required:true}
})

module.exports = mongoose.model('User', UserSchema);
	
