const express = require('express');

const ServerConfig = require('./config/serverConfig.js');

const app = express();

app.listen(ServerConfig.PORT, () => {
    console.log(`Server started at port ${ServerConfig.PORT}`)
})