const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/todoApp'



MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('failed to connect to mongoDB');
    return
};

  var db = client.db('todoApp')

  // db.collection('Todos').insertOne({
  //   message: 'something to do',
  //   statusCompleted: false}, (err, result) => {
  //     if (err) {console.log('not able to connect to mongoDB server');
  //     return
  //     };
  //     console.log('sucessful connection:',JSON.stringify(result.ops, undefined, 5));
  //   })

  db.collection('Users').insertOne({
    name: 'joana',
    age: 22,
    location: 'sao bernardo, brazil'
  }, (err, res) => {
    if (err) {console.log('not able to connect to mongoDB server');
        return
    };

    console.log('sucess!:', res.ops);
  })


  client.close();
});
