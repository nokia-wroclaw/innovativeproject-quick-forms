const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  userID: String,
  definitions: mongoose.Schema.Types.Mixed,
  title: String,
  description: String,
  type: Object,
  required: Array,
  properties: mongoose.Schema.Types.Mixed
});

module.exports = templateSchema;
