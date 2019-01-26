
var {mongoose} = require('./db/mongoose.js')
var {todoModel} = require('./models/todo.js')
var {userModel} = require('./models/users.js')
const express = require('express')
const bodyParser = require('body-parser')



var app = express();
app.use(bodyParser.json())

app.post('/todo', (req, res) => {

  var todo = new todoModel({
    text: req.body.text
  })


  todo.save((err,stats) => {
    if (err) {
       console.log(err);
       res.json(err)
       return
     }

    console.log('stats..:',stats);
    res.json(stats)
  })

})








app.listen(3000, () => {
  console.log('listening on port 3000...');
})

module.exports.app = app
