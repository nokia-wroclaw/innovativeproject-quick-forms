const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
   title: String,
    name: {
    type: String,

    },
    surname: {
    type: String,

    },
    phoneNumber: Number,
    email: String,
    postalCode: Number


});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
