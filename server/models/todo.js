const mongoose = require('mongoose')



var todoModel = mongoose.model('Todo',{
  text: {
    type: String,
    required: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false,
    require: true
  },
  completedAt: {
    type: Number
  }
});


module.exports = {
  todoModel
}
