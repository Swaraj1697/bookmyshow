const mongoose = require('mongoose');

const dbURL = process.env.DB_URL; // Replace with your MongoDB connection string

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log('MongoDB connected successfully');
    }
    catch (e) {
        console.log(e);
        process.exit(1); // Exit process with failure

    }
}

module.exports = connectDB; // Export the connectDB function for use in other files