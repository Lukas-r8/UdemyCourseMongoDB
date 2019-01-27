
var {mongoose} = require('./db/mongoose.js');
var {todoModel} = require('./models/todo.js');
var {userModel} = require('./models/users.js');
const express = require('express');
const bodyParser = require('body-parser');



var app = express();
app.use(bodyParser.json());

app.post('/todo', (req, res) => {

  var todo = new todoModel({
    text: req.body.text
  });


  todo.save((err,stats) => {
    if (err) {
       res.status(400).json(err)
       return
     };

    res.json(stats)
  });

});


app.get('/todo', (req, res) => {
  todoModel.find().then((data) => {
    res.send(data);
  }, (e) => res.send({status: 'NOK',error: e}));
});





app.listen(3000, () => {
  console.log('listening on port 3000...');
})

module.exports.app = app
