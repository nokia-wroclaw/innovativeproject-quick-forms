const mongoose = require('mongoose');
const prototypeModel = require('./template.model');

const filledFormSchema = new mongoose.Schema({
    template: prototypeModel,
    userID: String,
    ownerID: String
});

module.exports = filledFormSchema;
