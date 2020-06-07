const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const createForm = require('./socketFormCommandCreate');
const editForm = require('./socketFormCommandEdit');
const updateFormStep = require('./socketFormCommandUpdate');
const pendingForm = mongoose.model('pendingforms', Form);
const filledForm = mongoose.model('filledforms', Form);

module.exports = {
  start: (io, socketDictionary) => {
    io.on('connection', socket => {
      socket.on('pendingFormID', data => {
          const commands = {
              CREATE: 'create',
              UPDATE: 'update',
              EDIT:   'edit'
          }

          const receivedCommand = data[0];
          const receivedData = data[1];
          const receivedID = data[1].filledFormNumberID;
          socketDictionary[receivedID] = socket.id;
          console.log(receivedCommand);

          switch(receivedCommand){
              case commands.CREATE:
                  createForm(receivedData, receivedID)
                  break;
              case commands.UPDATE:
                  updateFormStep(receivedData, receivedID)
                  break;
              case commands.EDIT:
                  editForm(receivedData, receivedID)
                  break;
          }
      });
    });
  }
};
