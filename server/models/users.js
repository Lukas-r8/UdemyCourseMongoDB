const validator = require('validator');
const mongoose = require('mongoose');
const jws = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  email: {
    type:String,
    required: true,
    trim: true,
    minlength: 8,
    unique: true,
    validate: {
      validator: function(v){
        return validator.isEmail(v)
      } ,
      message: '{VALUE} is not a valid email'
    }

  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    acess: {
    type: String,
    required: true
    },
    token: {
    type: String,
    required: true
    }
  }]
});

userSchema.statics.findByToken = function(token) {
  var User =  this;
  var decoded;

  try {
    decoded = jws.verify(token, '123abc')
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject();
    })
  }

  return User.findOne({
    '_id': decoded.id,
    'tokens.acess': 'auth',
    'tokens.token': token
  })


}

userSchema.methods.generateAuthToken = function(){
  var user = this;

  var acess = 'auth'
  var token = jws.sign({id: user._id.toHexString(), acess}, '123abc').toString()

  user.tokens = user.tokens.concat([{acess, token}]);

  return user.save().then(() => {
    return token
  });

}

userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}



var userModel = mongoose.model('USER',userSchema);


module.exports = {
  userModel
}
