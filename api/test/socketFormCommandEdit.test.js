const  {beforeAll} = require( "@jest/globals");
const mongoose = require('mongoose');
const Form = require('../src/models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);
const socketFormCommandCreate = require('../src/sockets/socketFormCommandCreate');
const socketFormCommandEdit = require('../src/sockets/socketFormCommandEdit');


beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true,
        useUnifiedTopology: true }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});

//
// test('Form is edited on edit command only when it existed before', () => {
//     //if foundForm === null here
// });
//