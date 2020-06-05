const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);

module.exports = {
  start: (io, socketDictionary) => {
    io.on('connection', socket => {
      socket.on('pendingFormID', data => {
          const commands = {
              CREATE: 'create',
              UPDATE: 'update',
              EDIT:   'edit',
              REJECT: 'reject',
              ACCEPT: 'accept'
          }

          const receivedCommand = data[0];
          const receivedData = data[1];
          const receivedID = data[1].filledFormNumberID;
          socketDictionary[receivedID] = socket.id;
          console.log(receivedCommand);
          console.log(receivedData);
          console.log(receivedID);

          const createForm = () => {
              pendingForm.findOne({filledFormNumberID: receivedID})
                  .then(foundForm => {
                      if (foundForm === null)
                          new pendingForm(receivedData).save().then(r => console.log(r))
                  })
          }

          switch(receivedCommand){
              case commands.CREATE:
                  createForm()
                  break;
              case commands.UPDATE:
                  //updateForm()
                  break;
              case commands.EDIT:
                  //editForm()
                  break;
              case commands.REJECT:
                  //rejectForm()
                  break;
              case commands.ACCEPT:
                  //acceptForm()
                  break;
          }



          const editForm = () => {
              pendingForm.findOne({filledFormNumberID : receivedID})
                  .then(foundForm => {
                      foundForm.state = receivedData.state;
                      foundForm.dataForm = receivedData.dataForm;
                      foundForm.save();
                  })
                  .catch(err => console.log(err))
          }

          const updateForm = () => {
              pendingForm.findOne({filledFormNumberID : receivedID})
                  .then(foundForm => {
                      foundForm.state = receivedData.state;
                      foundForm.save();
                  })
                  .catch(err => console.log(err))
          }

        //const pendingFormNumberID = data.filledFormNumberID;
       // socketDictionary[pendingFormNumberID] = socket.id;

        // pendingForm.findOne({ filledFormNumberID : pendingFormNumberID } ) //in mount step
        //     .then(existingForm => {
        //       if (existingForm == null && data.dataForm != null && data.templateID != null
        //           && data.userID != null && data.state != null){
        //          new pendingForm(data).save().then(r => {
        //          });
        //          console.log('saved');
        //       }
        //        if (existingForm != null && data.state != null){
        //           existingForm.state = data.state;
        //           existingForm.save();
        //       }
        //     })
        //     .catch(err => console.log(err))
      });
    });
  }
};
