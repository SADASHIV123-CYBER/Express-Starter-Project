const mongoose = require('mongoose')
const serverConfig = require('./serverConfig.js')

// the below function helps us to connect to mongodb server

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Successfully connected to mongodb server...")
    } catch (error) {
        console.log("Not able to connect to the mongodb server");
        console.log(error)
    }
}

module.exports = connectDB