const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);

const updateFormStep = (receivedData, receivedID) => {
    pendingForm.findOne({filledFormNumberID : receivedID})
        .then(foundForm => {
            if (foundForm !== null){
                foundForm.state = receivedData.state;
                foundForm.save();
            }
        })
        .catch(err => console.log(err))
}

module.exports = updateFormStep