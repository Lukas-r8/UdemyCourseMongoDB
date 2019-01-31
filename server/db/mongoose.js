const mongoose = require('mongoose');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp'


mongoose.Promise = global.Promise

mongoose.connect(url, {useNewUrlParser: true});


module.exports = {
  mongoose
}
