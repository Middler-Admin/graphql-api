// models/SubscribedUser.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscribedUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const SubscribedUser = mongoose.model('SubscribedUser', SubscribedUserSchema);

module.exports = SubscribedUser;
