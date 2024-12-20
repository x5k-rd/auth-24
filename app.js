// make variables available in all files
require('dotenv').config()
// console.log(process.env) //Remove after confirmed as working

// Initialize databse
require("./DB/database").connect()

// Import Express
const express = require('express')

// Create simple app - Express being used as a simple app
const app = express()

// Inject middleware to understand the json format, additional layer.
app.use(express.json())

// Declare a dummy route to test, to send a message when tested
// Make a get request on / which is home route
// Has access to request and respond
// short response warpped in h1
app.get("/", (req, res) => {
    res.send("<h1>Server is running</h1>")
})

// DB operation
app.post("/register", async (req, res) => {
try {
    // get all data from body
    // all the data should exist
    // check if user already registered
    // encrypt password
    // create user in DB
    // generate token for user and send it / JWT
    


} catch (error) {
    console.log(error);
}
})


// export app to listen
module.exports = app