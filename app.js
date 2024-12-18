// make variables available in all files
require('dotenv').config()
// Import Express
const express = require('express')

// Create simple app - Express being used as a simple app
const app = express()

// export app to listen
module.exports = app

// Declare a dummy route to test, to send a message when tested
// Make a get request on / which is home route
// Has access to request and respond
// short response warpped in h1
app.get("/", (req, res) => {
    res.send("<h1>Server is running</h1>")
})