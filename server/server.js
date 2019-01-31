
var {mongoose} = require('./db/mongoose.js');
var {todoModel} = require('./models/todo.js');
var {userModel} = require('./models/users.js');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000


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


app.get('/todo/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)){res.status(404).send({message:'ID not Valid'})}

  todoModel.findById(id).then((modelRes) => {

    if (modelRes) {
      res.status(200).send(modelRes)
    } else {
      res.status(404).send({message: 'user not found'})
    };
  }, (e) => {
    res.status(400).send()
  });
});



app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})

module.exports.app = app
