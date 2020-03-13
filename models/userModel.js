const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  provider: [{
    provider_id: { type: String },
    provider_type: { type: String },
    _id: false
  }],
  gender: { type: String },
  picture: { type: String }
});

userModel.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userModel);
