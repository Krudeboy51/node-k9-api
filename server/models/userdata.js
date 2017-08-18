var mongoose = require('mongoose');

var userData = mongoose.model('UsersData', {

  uID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minlength: 6,
    required: true
  },
  age: {
    type: Number,
    minlength: 1,
    required: true
  },
  town: {
    type: String,
    minlength: 6,
    required: true
  },
  joinDate: {
    type: String,
    minlength: 8,
    required: true
  }
});

module.exports = {userData}
