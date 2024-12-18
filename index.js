// Listen to Express app

// Import App
const app = require('./app')

// Grab a simple variable by extracting it, then store it
const {PORT} = process.env
// Use Port variable and fire a callback, also listen to the port
app.listen(PORT, () =>{
    console.log ('Server is running at por: ${PORT}');
})


