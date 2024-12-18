// Call mongoose which was installed
const mongoose = require("mongoose")

// grab DB Key from process.env & MONGODB_URL is the secret name 
const { MONGODB_URL } = process.env 

// Export to be used by other files
exports.connect = () => {
    console.log(typeof MONGODB_URL);
    mongoose.connect(MONGODB_URL, {
        userNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then()
    .catch((error) => {
        console.log('DB connection failed');
        console.log(error);
        process.exit(0)

    })
}