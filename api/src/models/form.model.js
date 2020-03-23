const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    name: {type : String, default: ''},
    surname: {type: String, default: ""},
    email: {type: String, default: ""},
    phoneNumber: {type: String, default: ""}
});

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
