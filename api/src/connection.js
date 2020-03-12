const mongoose = require('mongoose');

const connection ='mongodb+srv://Admin:QHDIpi5ao3m1R0xE@cluster0-icd9k.mongodb.net/test?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

const connectDb = () => {

  return mongoose.connect(connection,
      {useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database')).then(() => setTimeout( () => {
    console.log(mongoose.connection.readyState); // should print 1
  }, 0))

};

module.exports = connectDb;
