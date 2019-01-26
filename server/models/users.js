
const mongoose = require('mongoose')

var userModel = mongoose.model('USER',{
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type:String,
    required: true,
    trim: true,
    minlength: 8

  },
  age:{
    type: Number
  }
})


module.exports = {
  userModel
}
