const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);
const filledForm = mongoose.model('filledforms', Form);


const createForm = async (receivedData, receivedID) => {
    try {
        let foundForm = await pendingForm.findOne({filledFormNumberID: receivedID})

        if (foundForm === null)
            foundForm = await filledForm.findOne({filledFormNumberID: receivedID})

        if (foundForm === null)
            await new pendingForm(receivedData).save();

        console.log(foundForm);
    } catch (err) {
        console.log("error", err);
    }
}

module.exports = createForm;