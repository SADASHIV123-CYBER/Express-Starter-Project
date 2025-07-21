const express = require('express');
const { getCartByUser, modifyProductToCart } = require('../contorllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);
cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart)

module.exports = cartRouter

