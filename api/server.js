const express = require('express');

const app = express();
const cors = require('cors');
const connectDb = require('./src/connection/connection');
const formRoute = require('./src/routing/formRouting');

app.use(cors());

app.use('/api/forms', formRoute);


const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json(formRoute);

});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);

  connectDb();
});

