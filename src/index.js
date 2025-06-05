const express = require('express');

const ServerConfig = require('./config/serverConfig.js');
const connectDB = require('./config/dbConfig.js'); 

const app = express();

app.use(express.json( ))
app.use(express.text())
app.use(express.urlencoded( {extended: true} ))

app.post('/ping', (req, res) => {
    console.log(req.body)
    return res.json({message: "pong"})
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}`)
})

// sadashivkale604
// kQ8k5ZqLcrnJWJUv