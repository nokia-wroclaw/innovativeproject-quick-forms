const mongoose = require('mongoose');
require('dotenv').config();
const { DATABASE_SECRET } = process.env;
const connection =
  DATABASE_SECRET;

const connectDb = () => {
  return mongoose
    .connect(
      connection,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log('connected to database')
    )
    .then(() =>
      setTimeout(() => {
        console.log(mongoose.connection.readyState);
      }, 0)
    );
};

module.exports = connectDb;
