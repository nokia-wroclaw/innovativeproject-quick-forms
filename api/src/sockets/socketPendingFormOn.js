const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
    start: (io) => {
        io.on('connection', (socket) => {
            socket.on('pendingFormID', (data) => {
                console.log(data);
                //todo
                const form = new pendingForm(data)
                const savedForm = form.save();
                socket.emit('message', 'Form saved')
            });
        });
    }
}