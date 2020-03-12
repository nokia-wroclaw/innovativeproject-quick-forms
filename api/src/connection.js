const mongoose = require('mongoose');

const connection ='mongodb+srv://Admin:QHDIpi5ao3m1R0xE@cluster0-icd9k.mongodb.net/test?retryWrites=true&w=majority';

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
