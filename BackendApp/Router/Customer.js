const express = require('express');
const Shopify = require('shopify-api-node');
const Customer =require('../Model/CustomerSchema.js');

const axios = require('axios');
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();
app.use(session({secret: "Shh, its a secret!"}));
// app.use(session({
//   resave: false,
//   saveUninitialized: true
// }));
const router = express.Router();
dotenv.config();
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET } = process.env;
const SHOPIFY_REDIRECT_URI="http://localhost:4000/customer/auth/shopify/callback"
const shopify = new Shopify({
  shopName: 'super-kiranaa.myshopify.com',
  apiKey: '3f65ce50affe5f48058fd93de1ab84d4',
  password: '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',
});

router.get('/', async (req, res) => {
  try{
    const customers = await shopify.customer.list();

    // create new customer instance for each fetched customer
    for (const customer of customers) {
      try {
        const existingCustomer = await Customer.findOne({ email: customer.email });
        if (existingCustomer) {
          // customer with same email already exists, skip
          console.log(`Customer with email ${customer.email} already exists`);
          continue;
        }
        
        const newCustomer = new Customer({
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          phone: customer.phone,
          ordersCount: customer.orders_count,
          totalSpent: customer.total_spent
        });
        
        // save new customer instance to database
        await newCustomer.save();
      } catch (err) {
        // handle errors
        console.error(err);
      }
    }
    

    res.send(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching customers');
  }
});

router.get('/auth/shopify', (req, res) => {
  const { shop } = req.query;
  const scopes = 'read_customers write_customers';


  const authorizationUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${scopes}&redirect_uri=${SHOPIFY_REDIRECT_URI}`;

  res.redirect(authorizationUrl);
});

router.get('/auth/shopify/callback', async (req, res) => {
  try {
    const { code, shop } = req.query;
    const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
   
    const accessTokenResponse = await axios.post(accessTokenUrl, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    });
    
    if (!accessTokenResponse.data.access_token) {
      res.status(500).send('Could not authenticate with Shopify');
      return;
    }
    
    const { access_token: accessToken } = accessTokenResponse.data;
   
    const shopifyWithAccessToken = new Shopify({
      shopName: shop,
      accessToken,
    });
    
   
    
    const shopData = await shopifyWithAccessToken.shop.get();
    

    // Middleware function to check if authentication is done before redirect
    const redirectUser = (req, res, next) => {
      if (req.session.accessToken) {
        return res.redirect('http://localhost:3000/');
      }
      res.redirect('/');
    };

    res.redirect('http://localhost:3000/');
    // res.send(shopData);

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  }
});


router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, phone, email, orders_count, total_spent } = req.body;

    // create customer in Shopify
    const newCustomer = await shopify.customer.create({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      orders_count: orders_count,
      total_spent: total_spent
    });

    // create customer instance and save to database
    const customer = new Customer({
      firstName: newCustomer.first_name,
      lastName: newCustomer.last_name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      ordersCount: newCustomer.orders_count,
      totalSpent: newCustomer.total_spent,
      createdAt: newCustomer.created_at
    });
    await customer.save();

    res.send(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating customer');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const { first_name, last_name, phone, email, orders_count, total_spent } = req.body;

    // update customer in Shopify
    const updatedCustomer = await shopify.customer.update(customerId, {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      orders_count: orders_count,
      total_spent: total_spent
    });

    // find the corresponding customer in the database
    const customer = await Customer.findOne({ email: updatedCustomer.email });
    if (!customer) {
      // customer not found in the database, send error response
      return res.status(404).send('Customer not found');
    }

    // update customer details in the database
    customer.firstName = updatedCustomer.first_name;
    customer.lastName = updatedCustomer.last_name;
    customer.phone = updatedCustomer.phone;
    customer.email = updatedCustomer.email;
    customer.ordersCount = updatedCustomer.orders_count;
    customer.totalSpent = updatedCustomer.total_spent;
    await customer.save();

    res.send(updatedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating customer');
  }
});



module.exports = router;
