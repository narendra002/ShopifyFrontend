const express = require('express');
const Shopify = require('shopify-api-node');

const router = express.Router();

const shopify = new Shopify({
  shopName: 'super-kiranaa.myshopify.com',
  apiKey: '3f65ce50affe5f48058fd93de1ab84d4',
  password: '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',
});

router.get('/', async (req, res) => {
  try {
    const customers = await shopify.customer.list();
    res.send(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching customers');
  }
});

module.exports = router;
