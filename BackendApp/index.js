const express = require('express');
const CustomerRouter = require('./Router/Customer');
const mongoose=require('mongoose');
const app = express();
app.use(express.json());
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
const mySecret='mongodb+srv://Shopify:SiyaRam@cluster0.2fvhtb2.mongodb.net/?retryWrites=true&w=majority';
const cors = require('cors');

app.use(cors()); // enable CORS
mongoose.set('strictQuery', false);
mongoose.connect(mySecret,								 
{ useNewUrlParser: true, useUnifiedTopology: true,

})
.then(() => console.log('connected to DB!'))
.catch(error => console.log(error));
app.use('/customer', CustomerRouter);

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
