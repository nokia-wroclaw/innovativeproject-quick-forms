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
    postalCode: Number


});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
