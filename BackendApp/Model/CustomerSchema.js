const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  
   
  },
  ordersCount: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
