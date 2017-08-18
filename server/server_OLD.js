const _ = require('lodash')
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mogoose');
var {User} = require('./models/user');
var {userData} = require('./models/userdata');

var app = express();

app.use(bodyParser.json());


/*
// POST /user - create user
app.post('/user', (req, res) => {
  var user = new User({
    email : req.body.email,
    password : req.body.password,
    name : req.body.name,
    age : req.body.age,
    town : req.body.town
  });

  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /user - getAllUsers
app.get('/user', (req, res) => {
  User.find().then((user) => {
    res.send({
      user
    })
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /user/id - get user by ID
app.get('/user/:id', (req, res) => {
  var id = req.params.id;

  //validate id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  User.findById(id).then((user) => {
    if(!user){
      return res.status(404).send();
    }

    res.send({user});

  }).catch((e) => {
    res.status(400).send();
  });
})

app.patch('/user/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['email', 'password', 'name', 'age', 'town'])

  //validate id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) =>{
    if(!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(404).send();
  })
})

// delete /user/del/:id
app.delete('/user/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  User.findByIdAndRemove(id).then((user) => {
    if(!user){
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send();
  });
});
*/

app.listen(3000, () => {
  console.log('started server on port 3000!');
});

module.exports = {app};
// var newUser = new Users({
//   email: 'kking9351@gmail.com',
//   password: 'Kloud9pass',
//   //name: 'Kory King',
// //  age: 25,
//   town: 'Brooklyn, NY'
// });
//
// newUser.save().then((doc) => {
//   console.log('User Saved', doc);
// }, (err) => {
//   console.log('unable to save!', err);
// });
