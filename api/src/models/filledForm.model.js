const mongoose = require('mongoose');
const templateModel = require('./template.model');

const filledFormSchema = new mongoose.Schema({
  dataForm: Object,
  templateID: String,
  userID: String,
  filledFormNumberID: String,
  state: Number
});

module.exports = filledFormSchema;
