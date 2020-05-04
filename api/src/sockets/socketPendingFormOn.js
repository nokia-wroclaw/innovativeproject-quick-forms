const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
    start: (io, socketDictionary) => {
        io.on('connection', (socket) => {
            socket.on('pendingFormID', (data) => {
                const pendingFormNumberID = data.filledFormNumberID;
                socketDictionary[pendingFormNumberID] = socket.id;
                console.log(`Added value ${socket.id} with key ${pendingFormNumberID}`);
                const form = new pendingForm(data)
                const savedForm = form.save();
            });
        });
    }
}