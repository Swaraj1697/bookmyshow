const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'partner'], // Only allow 'admin' or 'user'
        required: true,
        default: 'user'
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
})

const UserModel = mongoose.model('User', userSchema); // Create a model from the schema
module.exports = UserModel; // Export the model for use in other files