const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
  start: (io, socketDictionary) => {
    io.on('connection', socket => {
      socket.on('pendingFormID', data => {
        const pendingFormNumberID = data.filledFormNumberID;
        socketDictionary[pendingFormNumberID] = socket.id;
        pendingForm.exists({ filledFormNumberID : pendingFormNumberID } )
            .then(exists => {
              if (!exists && data.dataForm != null){
                 new pendingForm(data).save().then(r => console.log(r));
              }
            })
            .catch(err => console.log(err))



      });
    });
  }
};
