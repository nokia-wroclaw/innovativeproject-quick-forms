const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);
const filledForm = mongoose.model('filledforms', Form);

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

          // const createForm = () => {
          //     pendingForm.findOne({filledFormNumberID: receivedID})
          //         .then(foundForm => {
          //             if (foundForm === null)
          //                 filledForm.findOne({filledFormNumberID: receivedID})
          //                     .then(foundForm => {
          //                         if(foundForm === null){
          //                             new pendingForm(receivedData).save().then(r => console.log(r));
          //                         }
          //                     }).catch(err => console.log(err))
          //         }).catch(err => console.log(err))
          // }

          const createForm = async () => {
              try {
                  let foundForm = await pendingForm.findOne({filledFormNumberID: receivedID})

                  if (foundForm === null){
                      foundForm = await filledForm.findOne({filledFormNumberID: receivedID})
                  }

                  if (foundForm === null)
                      await new pendingForm(receivedData).save();

                  console.log(foundForm);
              } catch (err) {
                  console.log("error", err);
              }

          }

          const editForm = () => {
              pendingForm.findOne({filledFormNumberID : receivedID})
                  .then(foundForm => {
                      if (foundForm !== null){
                          foundForm.templateID = receivedData.templateID;
                          foundForm.userID = receivedData.userID;
                          foundForm.state = receivedData.state;
                          foundForm.dataForm = receivedData.dataForm;
                          foundForm.save();
                      }
                  })
                  .catch(err => console.log(err));
          }

          const updateFormStep = () => {
              pendingForm.findOne({filledFormNumberID : receivedID})
                  .then(foundForm => {
                      if (foundForm !== null){
                          foundForm.state = receivedData.state;
                          foundForm.save();
                      }
                  })
                  .catch(err => console.log(err))
          }

          switch(receivedCommand){
              case commands.CREATE:
                  createForm()
                  break;
              case commands.UPDATE:
                  updateFormStep()
                  break;
              case commands.EDIT:
                  editForm()
                  break;
          }
      });
    });
  }
};
