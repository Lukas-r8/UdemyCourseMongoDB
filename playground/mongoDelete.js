const {MongoClient, ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/todoApp'


MongoClient.connect(url, (err, client) => {
  if (err) {return console.log('Failed to connect to mongoDB, err:',err)};
  var db = client.db('todoApp');

  // db.collection('Users').deleteMany({name: 'joana'}).then((status) => {
  //   console.log('deletion status:',status);
  // }).catch((e) => console.log('failed to delete:',e));
  //

  db.collection('Users').findOneAndDelete({_id: new ObjectID("5c4b0f932ed0353e7e707a2b")}, (err, status) => {

    console.log(err,'\n\n ==========');
    console.log(status);

  })


  client.close();
})
