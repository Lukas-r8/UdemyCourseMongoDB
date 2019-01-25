
const {MongoClient, ObjectID} = require('mongodb')

var url = 'mongodb://localhost:27017/todoApp'


MongoClient.connect(url, (err, client) => {
  if (err){return console.log('Unable to connect to MongoDB, err:',err);}

  var db = client.db('todoApp')

  db.collection('Users').find({name:'Lucas ALves'}).toArray((err, result) => {
    console.log('resultado:',result);
  })



  client.close()
})
