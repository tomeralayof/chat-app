const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    required: true,
    unique:true
  },
  friends: {
    type: Array,
  },
  isLogged: {
      type : Boolean,
      required: true
  },
  image: {
    type: String
  }
});

function _tokenFactor() {
  return {
    _id: this._id ,
    name: this.name,
    image:this.image,
    email:this.email
  }
}

userSchema.methods.createToken = function () {
  const token = jwt.sign(_tokenFactor(),process.env.tokenKey);
  return token
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = {User};