const mongoose = require('mongoose');

const connection = 'mongodb://mongo:27017/mongo-test';

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
