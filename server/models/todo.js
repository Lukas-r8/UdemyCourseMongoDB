const mongoose = require('mongoose')



var todoModel = mongoose.model('Todo',{
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});


module.exports = {
  todoModel
}
