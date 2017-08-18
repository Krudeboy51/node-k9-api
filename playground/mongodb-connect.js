const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Kloud9API', (err, db) => {
  if (err){
    return console.log('Unable to connect to database!');
  }
  console.log('Successful connection');

  db.collection('Users').insertOne({
    email: 'kking9351@gmail.com',
    password: 'KLOUD9',
    name: 'Kory King',
    age: 25,
    town: 'Brooklyn, NY',
    joindate: '08-08-17'
  }, (err, result) => {
    if(err){
      console.log('Unable to insert record!', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  db.close();
});
