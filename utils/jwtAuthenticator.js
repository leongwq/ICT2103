const jwt = require('express-jwt');

const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = auth;