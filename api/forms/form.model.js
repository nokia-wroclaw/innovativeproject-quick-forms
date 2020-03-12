const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
   title: String,
    name: {
    type: String,
     required: true
    },
    surname: {
    type: String,
     required: true
    },
    phoneNumber: Number,
    email: String,
    postalCode: Number,
    date: Date.now

});

const form = mongoose.model('form', formSchema);

module.exports = form;
