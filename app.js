require('dotenv').config();
require('extend-error');
const config = require('./config')();
module.exports = config;
