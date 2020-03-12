const express = require('express');

const app = express();
const cors = require('cors');
const connectDb = require('./src/connection');
const formRoute = require('./forms/formRouting');

app.use(cors());

app.use('/forms', formRoute);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json(formRoute);

});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);

  connectDb();
});

// app.listen(PORT, function() {
//   console.log(`Listening on ${PORT}`);
//
//   connectDb().then(() => {
//     console.log('MongoDb connected');
//   });
// });
