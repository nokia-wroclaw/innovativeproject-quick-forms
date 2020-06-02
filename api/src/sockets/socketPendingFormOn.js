const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
  start: (io, socketDictionary) => {
    io.on('connection', socket => {
      socket.on('pendingFormID', data => {
        const pendingFormNumberID = data.filledFormNumberID;
        console.log("entry")
        console.log(data);
        console.log(pendingFormNumberID);

        socketDictionary[pendingFormNumberID] = socket.id;
        pendingForm.findOne({ filledFormNumberID : pendingFormNumberID } )
            .then(existingForm => {
              if (existingForm == null && data.dataForm != null && data.templateID != null
                  && data.userID != null && data.state != null){
                 new pendingForm(data).save().then(r => {
                 });
                 console.log('saved');
              }
               if (existingForm != null && data.state != null){
                  console.log("hiiii")
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
