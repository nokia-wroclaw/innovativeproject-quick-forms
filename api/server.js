const express = require('express');

const app = express();
const cors = require('cors');
const connectDb = require('./src/connection/connection');
const formRoute = require('./src/routing/formRouting');
//const auth = require('./src/auth');

app.use(cors());
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
app.use('/api/forms', formRoute);
//app.use('/api/signin', auth);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json(formRoute);

});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);

  connectDb();
});

