const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Kloud9API', (err, db) => {
  if (err) {
    return console.log('Unable to connect to database!');
  }
  console.log('Successful connection');

  db.collection('Users').find({
    town: 'Brooklyn, NY'
  }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch docs!!');
  })

  //db.close();
});
