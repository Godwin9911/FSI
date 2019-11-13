const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  bio: { type: String },
  gender: { type: String },
  password: { type: String },
  saved_projects: { type: Object }
});

module.exports = mongoose.model('User', userModel);
