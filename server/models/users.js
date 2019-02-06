const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    access: {
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
    decoded = jwt.verify(token, '123abc')
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject();
    })
  }

  return User.findOne({
    '_id': decoded.id,
    'tokens.access': 'auth',
    'tokens.token': token
  })


}

userSchema.methods.generateAuthToken = function(){
  var user = this;

  var access = 'auth'
  var token = jwt.sign({id: user._id.toHexString(), access}, '123abc').toString()

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token
  });

}

userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
};

userSchema.pre('save', function(next){
  var user = this;

  if (user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt , (err, hash) => {
        user.password = hash
        next();
      });
    });
  } else {
    next();
  }


})



var userModel = mongoose.model('USER',userSchema);


module.exports = {
  userModel
}
