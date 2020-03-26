const mongoose = require('mongoose');
const templateModel = require('./template.model');

const filledFormSchema = new mongoose.Schema({
    template: templateModel,
    userID: String,
    ownerID: String
});

module.exports = filledFormSchema;
