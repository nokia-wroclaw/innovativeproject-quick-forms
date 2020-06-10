const  {beforeAll} = require( "@jest/globals");
const mongoose = require('mongoose');
const Form = require('../src/models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);
const socketFormCommandCreate = require('../src/sockets/socketFormCommandCreate');

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true,
            useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });


test('form is created on create command', async () => {
    const data = {
        filledFormNumberID: 'aaa-bbb-ccc-ddd',
        state: 1
    }
    await socketFormCommandCreate(data, data.filledFormNumberID);

    const insertedData = await pendingForm.findOne({filledFormNumberID: data.filledFormNumberID});
    expect(insertedData._id).toBeDefined();
    expect(insertedData.filledFormNumberID).toBe(data.filledFormNumberID);
    expect(insertedData.state).toBe(data.state);
});

test('Form is created on create command only when it did not exist before', async () => {
   const data = {
       filledFormNumberID: 'aaa',
       state: 1
   }

    await socketFormCommandCreate(data, data.filledFormNumberID);

    const insertedData = await pendingForm.findOne({filledFormNumberID: data.filledFormNumberID});
    expect(insertedData._id).toBeDefined();
    expect(insertedData.filledFormNumberID).toBe(data.filledFormNumberID);
    expect(insertedData.state).toBe(data.state);

    const anotherData = {
        filledFormNumberID: 'aaa',
        state: 2
    }

    await socketFormCommandCreate(anotherData, anotherData.filledFormNumberID);
    const anotherInsertedData =  await pendingForm
        .findOne({filledFormNumberID: anotherData.filledFormNumberID});
    expect(anotherInsertedData._id).toBeDefined();
    expect(anotherInsertedData._id).toEqual(insertedData._id);

    expect(anotherInsertedData.filledFormNumberID).toEqual(data.filledFormNumberID);
    expect(anotherInsertedData.filledFormNumberID).toEqual(anotherData.filledFormNumberID);

    expect(anotherInsertedData.state).toBe(data.state);
});