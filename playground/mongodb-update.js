const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Kloud9API', (err, db) => {
  if (err) {
    return console.log('Unable to connect to database!');
  }
  console.log('Successful connection');

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59954b72cc71c764630e7635')
  }, {
    $set: {
      town: 'Queens, NY'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })

  //db.close();
});
