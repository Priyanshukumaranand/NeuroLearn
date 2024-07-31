const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
  phoneno: Number,
  studying: String,
  address: String,
  designation: String,
  skills:{
    skill1: String,
    skill2: String,
    skill3: String,
    skill4: String,
    skill5: String,
  }
});

module.exports = mongoose.model('User', UserSchema);