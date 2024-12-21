// make variables available in all files
require('dotenv').config()
// console.log(process.env) //Remove after confirmed as working

// Initialize databse
require("./DB/database").connect()
// Grab user
const User = require('./model/user')

// Import Express
const express = require('express')

// Call bcrypt (require) and set a varaible (const) for it
const bcrypt = require('bcryptjs')

//Call jsonwebtoken and set it in a variable
const jwt = require ('jsonwebtoken')
// variable for secret string created via crypto builtin in nodejs and stored in secrets, used via process.env.jwtSecret
const { JWTSECRET } = process.env 

// Call cookie-parse
const cookieParser = require('cookie-parser')

// Create simple app - Express being used as a simple app
const app = express()

// Inject middleware to understand the json format, additional layer.
app.use(express.json())

// Inject middleware, inbetween, to understand & interact w them
app.use(cookieParser())


// Declare a dummy route to test, to send a message when tested
// Make a get request on / which is home route
// Has access to request and respond
// short response warpped in h1
app.get("/", (req, res) => {
    res.send("<h1>Server is running</h1>")
})

// Route for user registration - could add min pw lenght to improve (requires to ask lenght via user schema)
// DB operation, always uses async for 
// will do a request and response
app.post("/register", async (req, res) => {
try {
    // get all data from body - but it can be params if it is coming from URL 
    const {firstname,lastname, email, password} = req.body
    
    // all the data should exist, using and &&
    // if (!(firstname && lastname && email && password))
    // if all of them are not present
    if (!(firstname && lastname && email && password))
     {
        // send a code and a response
        res.status(400).send('All fields are mandatory')
    }
    // check if user already registered via mongoose query
    // always use await for DB calls
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(400).send('The provided email already exists') 
    }
    // encrypt password
    const myEncPassword = await bcrypt.hash(password, 10)
    // create user in DB and password reference from variable myEncPassword
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: myEncPassword
    })

    // generate token for user and store it
    // paylod called id (user_id comes from DB fields which are created automatically by mongoose)
    const token = jwt.sign(
        {id: user._id, email},
        JWTSECRET,
        {
            expiresIn: "2h"
        }

    );
    // Keep the token
    user.token = token
    // sent nothing to the frontend for password 
    user.password = undefined
   
    // send success code and user._id only to the client
    res.status(201).json(user._id)

} catch (error) {
    console.log(error);
    res.status(401).send('User could not be created')
}
})

// Login route which will do a request and response
app.post("/login", async (req, res) => {
try {
    // get all data from req.body / frontend
    const {email, password} = req.body 
    // validation if both fields are there
    if (!(email && password)) {
        res.status(400).send('All required fields are missing input')
        
    }
    // check with users in DB
    const user = await User.findOne({email})

    //check if user exists? and match password (encrypted in DB)
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            {id: user._id},
            JWTSECRET,
            {
                expiresIn: "2h"
            }
        );
        user.token = token
        user.password = undefined
        

        // send token in user cookie
    const options = {
        // Cookie expires in 1h
        expires: new Date(Date.now() + 3 * 24 * 60),
        // cookies can only be edited by a server that processes the request
        httpOnly: true
    
    };
    // send a token, "name of the cookie",value (token), send options
    res.status(200).cookie("token", token, options).json({
        success: true,
        token
    })
    } 

} catch (error) {
    console.log(error);
    res.status(401).send('User could not be authenticated')
    
}
})

// export app to listen
module.exports = app