
const {mongoose} = require('./../server/db/mongoose.js')
const {todoModel} = require('./../server/models/todo.js')
const {userModel} = require('./../server/models/users.js')


const {ObjectID} = require('mongodb')


var userID = '5c4b494390be22593157563a'

var id = '5c4e42bb434bf92ce39fdc79'


if (!ObjectID.isValid(id)){console.log('ID is not valid')}



// todoModel.find({_id: id}).then((docs) => {
//   console.log('docs',docs);
// }).catch((e) => console.log(e));
//
//
//
//
// todoModel.findOne({_id:id}).then((oneDoc) => {
//   console.log('one doc',oneDoc);
// }).catch((e) => console.log(e));
//
//
// todoModel.findById(id).then((IDDoc) => {
//   console.log('id doc',IDDoc);
// }).catch((e) => console.log(e));




userModel.findById(userID).then((user) => {

  if (user) {
    console.log(user);
  } else {
    console.log('User not found...');
  }
}).catch((e) => {
  if (!ObjectID.isValid(userID)){
    console.log("ID isn't valid, check the input and try again...");
    return
  }
  console.log(e)
} );
