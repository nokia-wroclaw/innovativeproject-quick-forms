const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phoneNumber: String

});

module.exports = templateSchema;
