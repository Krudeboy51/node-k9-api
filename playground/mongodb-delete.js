const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Kloud9API', (err, db) => {
  if (err) {
    return console.log('Unable to connect to database!');
  }
  console.log('Successful connection');

//delete many

//delete one

//find 1 and delete

  //db.close();
});
