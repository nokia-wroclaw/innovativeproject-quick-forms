const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
    start: (io, socketDictionary) => {
        io.on('connection', (socket) => {
            socket.on('pendingFormID', (data) => {
                console.log(data);
                const pendingFormNumberID = data.filledFormNumberID;
                //todo add {pendingFormNumberID : socketID} to dict
                socketDictionary[pendingFormNumberID] = socket.id;
                const form = new pendingForm(data)
                const savedForm = form.save();
                socket.emit('message', 'Form saved')
            });
        });
    }
}