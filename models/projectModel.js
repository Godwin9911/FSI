const mongoose = require('mongoose');

const projectModel = new mongoose.Schema({
  project_id: { type: String },
  project_title: { type: String },
  name_of_cartegory: { type: String },
  cartegory: { type: String },
  activity_status: { type: String },
  lga: { type: String },
  community: { type: String },
  state: { type: String },
  project_description: { type: String },
  start_date: { type: String },
  amount_approved_in_2016: { type: String },
  amount_approved_in_2017: { type: String },
  likes: { type: Object },
  dislikes: { type: Object },
  comments: { type: Object },
  reports: { type: Object }
});

module.exports = mongoose.model('Project', projectModel);
