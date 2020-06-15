const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);

const editForm = (receivedData, receivedID) => {
    pendingForm.findOne({filledFormNumberID : receivedID})
        .then(foundForm => {
            if (foundForm !== null){
                foundForm.templateID = receivedData.templateID;
                foundForm.userID = receivedData.userID;
                foundForm.state = receivedData.state;
                foundForm.dataForm = receivedData.dataForm;
                foundForm.save();
            }
        })
        .catch(err => console.log(err));
}

module.exports = editForm;