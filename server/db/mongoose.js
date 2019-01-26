const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/todoApp'


mongoose.Promise = global.Promise

mongoose.connect(url);


module.exports = {
  mongoose
}
