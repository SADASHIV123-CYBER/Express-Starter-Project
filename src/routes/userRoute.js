const express = require('express');
const { createUser } = require('../contorllers/userController');
const { getCartById } = require('../contorllers/cartController');

// we have to initialise a router object to add routes in a new file
// Routers are used for segregating your routes in different modules 
const userRouter = express.Router();

userRouter.post('/', createUser);
module.exports = userRouter; // exporting the route   