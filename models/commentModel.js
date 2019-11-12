const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
  project_id: { type: String },
  comment: { type: Object }
});

module.exports = mongoose.model('Comment', commentModel);
