// acts as in between layerm, code to DB for easebility 
const mongoose = require('mongoose')

// UserSchema
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    }
})

// Export mongoose file, schema + name - always singular for user 
module.exports = mongoose.model("user", UserSchema)