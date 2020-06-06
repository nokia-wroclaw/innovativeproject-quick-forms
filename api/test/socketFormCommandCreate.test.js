const  {beforeAll, afterAll, afterEach, beforeEach} = require( "@jest/globals");
const mongoose = require('mongoose');
const Form = require('../src/models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);
const filledForm = mongoose.model('filledforms', Form);
const socketFormCommandCreate = require('../src/sockets/socketFormCommandCreate')

const { DATABASE_SECRET } = process.env;
const connection =
    DATABASE_SECRET;


    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true,
            useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('Form is created on create command', async () => {

    });
