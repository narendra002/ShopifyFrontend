const express = require('express');
const CustomerRouter = require('./Router/Customer');

const app = express();
const cors = require('cors');

app.use(cors()); // enable CORS

app.use('/customer', CustomerRouter);

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
