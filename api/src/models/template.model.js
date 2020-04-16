const mongoose = require('mongoose');

let templateSchema = new mongoose.Schema({
  userID: String,
  title: String,
  description: String,
  type: Object,
  required: Array,
  properties: mongoose.Schema.Types.Mixed,
});

module.exports = templateSchema;
