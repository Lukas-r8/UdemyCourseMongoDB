const {MongoClient, ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/todoApp'


MongoClient.connect(url,(err, client) => {
  if (err) {return console.log(err)}
  var db = client.db('todoApp');

  db.collection('Users').findOneAndUpdate({name: 'Lucas ALves'},{
    $set: {
      name: 'Lucas Alves Da Silva'
    },
    $inc: {
      age: 2
    }

  },{},(err, res) => {

    console.log(res);
  });



  client.close()
})
