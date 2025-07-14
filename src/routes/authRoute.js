const express = require('express');
const { login } = require('../contorllers/authController');

// we have to initialise a router object to add routes in a new file
// Routers are used for segregating your routes in different modules 
const authRouter = express.Router();

authRouter.post('/login', login);
module.exports = authRouter; // exporting the route   