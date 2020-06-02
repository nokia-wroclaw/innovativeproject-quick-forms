const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
  start: (io, socketDictionary) => {
    io.on('connection', socket => {
      socket.on('pendingFormID', data => {
        const pendingFormNumberID = data.filledFormNumberID;
        console.log("send:" + data);

        socketDictionary[pendingFormNumberID] = socket.id;
        pendingForm.exists({ filledFormNumberID : pendingFormNumberID } )
            .then(exists => {
              if (!exists && data.dataForm != null && data.templateID != null
                  && data.userID != null && data.state != null){
                 new pendingForm(data).save().then(r => {
                     console.log(r)
                 });
                 console.log("to be saved: " + data.state);
                 console.log('saved');
              }
            })
            .catch(err => console.log(err))
      });
    });
  }
};
