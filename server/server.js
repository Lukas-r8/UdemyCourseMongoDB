require('./config/config.js')
const {mongoose} = require('./db/mongoose.js');
const {todoModel} = require('./models/todo.js');
const {userModel} = require('./models/users.js');
const {authenticate} = require('./middleware/authenticate.js')

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');


var port = process.env.PORT;
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


app.delete('/todo/:id', (req,res) => {

  var id = req.params.id;


  if (!ObjectID.isValid(id)){
    res.status(404).send();
  };

  todoModel.findByIdAndRemove(id).then((docs) => {
    if (docs) {
      res.json(docs);
    } else {
      res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });
});


app.patch('/todo/:id', (req, res) => {
  var id = req.params.id;

  var body = _.pick(req.body, ['text','completed'])

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false
    body.completedAt = null
  }

  todoModel.findByIdAndUpdate(id, {$set: body}, {new: true}).then((docs) => {
    if (docs){
      res.send(docs);
    } else {
      res.status(404).send();
    }
  }).catch((e) => {
    res.sendStatus(400).send();
  });
});



app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])

  var newUser = new userModel(body)

  newUser.save().then((user) => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(newUser);
  }).catch((e) => res.sendStatus(400).send(e));

});



app.get('/users/me', authenticate ,(req, res) => {
  res.send(req.user)
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})

module.exports.app = app
