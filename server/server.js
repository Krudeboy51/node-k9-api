const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;

var mongoose = require('./db/mogoose').mongoose;
var User = require('./models/user').User;
var userData = require('./models/userdata').userData;
var authenticate = require('./middleware/authenticate').authenticate;


var app = express();

app.use(bodyParser.json());

// POST /user - create user
app.post('/user', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);


  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch ((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//POST /user/login {email, password}
app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then ((user) =>{
    return user.generateAuthToken().then((token) =>{
      res.header('x-auth', token).send(user);
    });
  }).catch ((e) => {
    res.status(400).send();
  })

});


app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then (() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

// POST /userdata - create
app.post('/userdata', authenticate, (req, res) => {
  var date = new Date(_.now());
  var dateStr = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
  console.log(req.body);
  var user = new userData({
    name : req.body.name,
    age : req.body.age,
    town : req.body.town,
    joinDate: dateStr,
    uID : req.user._id
  });

  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


// GET /user - getAllUsersdata
app.get('/userdata', authenticate, (req, res) => {
  userData.find({
    uID: req.user._id
  }).then((userdata) => {
    res.send({
      userdata
    })
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /userdata/id - get userdata by ID
app.get('/userdata/:id', authenticate, (req, res) => {
  var id = req.params.id;

  //validate id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  userData.findOne({
    uID: id
  }).then((userdata) => {
    res.send({userdata});
  }).catch ((e) => {
    res.status(404).send();
  })
})

app.patch('/userdata/', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'age', 'town'])

  // //validate id
  // if(!ObjectID.isValid(id)){
  //   return res.status(404).send();
  // }

  userData.findOneAndUpdate(req.user._id, {$set: body}, {new: true}).then((user) =>{
    if(!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(404).send();
  });
});

// delete /user/del/:id
app.delete('/userdata/', authenticate, (req, res) => {

 console.log(req.user.uID);

  userData.findOneAndRemove({
    uID: req.user._id
  }).then((userdata) => {
    if(!userdata){
      return res.status(404).send();
    }

    res.send({userdata});
  }).catch((e) => {
    res.status(400).send();
  });
});


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
