const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
  start: (io, socketDictionary) => {
    io.on('connection', socket => {
      socket.on('pendingFormID', data => {
        const pendingFormNumberID = data.filledFormNumberID;
        console.log("send:" + data.dataForm);

        socketDictionary[pendingFormNumberID] = socket.id;
        pendingForm.findOne({ filledFormNumberID : pendingFormNumberID } )
            .then(existingForm => {
                console.log(existingForm)
              if (existingForm == null && data.dataForm != null && data.templateID != null
                  && data.userID != null && data.state != null){
                 new pendingForm(data).save().then(r => {
                     console.log(r)
                 });
                 console.log("to be saved: " + data.state);
                 console.log('saved');
              }
              else if (existingForm != null && data.state != null){
                  existingForm.state = data.state;
                  existingForm.save();
                  console.log("updated");
                  console.log(existingForm);
              }
            })
            .catch(err => console.log(err))
      });
    });
  }
};
