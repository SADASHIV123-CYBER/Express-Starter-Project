const express = require('express');
const { getCartByUser } = require('../contorllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser)

module.exports = cartRouter

