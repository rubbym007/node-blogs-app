const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  	first_name: { 
  		type: String, 
  		required: [true, 'first_name is required field!'],
  		default: null 
  	},
  	last_name: { 
  		type: String, 
  		required: [true, 'last_name is required field!'],
  		default: null 
  	},
  	email: { 
  		type: String, 
  		required: [true, 'email is required field!'],
  		unique: true 
  	},
  	password: { 
  		type: String ,
  		required: [true, 'password is required field!'],
  	},
  	token: { 
  		type: String 
  	},
});

module.exports = mongoose.model("user", userSchema);