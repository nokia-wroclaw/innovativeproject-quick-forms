const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
  start: (io, socketDictionary) => {
    io.on('connection', socket => {
      socket.on('pendingFormID', data => {
        const pendingFormNumberID = data.filledFormNumberID;
        socketDictionary[pendingFormNumberID] = socket.id;

        pendingForm.findOne({ filledFormNumberID : pendingFormNumberID } ) //in mount step
            .then(existingForm => {
              if (existingForm == null && data.dataForm != null && data.templateID != null
                  && data.userID != null && data.state != null){
                 new pendingForm(data).save().then(r => {
                 });
                 console.log('saved');
              }
               if (existingForm != null && data.state != null){
                  existingForm.state = data.state;
                  existingForm.save();
              }
            })
            .catch(err => console.log(err))
      });
    });
  }
};
