const {ObjectID} = require('mongodb');
const {todoModel} = require('./../../models/todo.js')
const {userModel} = require('./../../models/users.js')

const jwt = require('jsonwebtoken');

var arrayTodos = [{_id: new ObjectID() ,text: 'test one todos'},
                  {_id: new ObjectID(), text: 'test two todos', completed: true, completedAt: 1000}]


const populateTodos = (done) => {
  todoModel.deleteMany({}).then(() => {
    todoModel.insertMany(arrayTodos);
    done();
  });
}

var userOneId = new ObjectID()
var userTwoId = new ObjectID()

var arrayUsers = [{
  _id: userOneId,
  email: 'firstUser@test.com',
  password: 'passOneTest',
  tokens: [{
    access: 'auth',
    token: jwt.sign({id: userOneId, access: 'auth'}, '123abc').toString()
  }]
},{
  _id: userTwoId,
  email: 'secondUser@test.com',
  password: 'passTwoTest'
}]


var populateUsers = (done) => {
  userModel.deleteMany({}).then(() => {
    var userOne = new userModel(arrayUsers[0]).save()
    var userTwo = new userModel(arrayUsers[1]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => {
    done()
  });
};



module.exports = {arrayTodos,
                  populateTodos,
                  arrayUsers,
                  populateUsers}
