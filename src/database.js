const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

if(!URI) {
    console.log("MONGODB_URI is not defined in environment variables.");
    process.exit(1);
}

mongoose.connect(URI)
    .then(() => console.log("Database is connected."))
    .catch(err => {
        console.log("Database connection error: ", err.message);
        process.exit(1);
    })