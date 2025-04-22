const express = require('express');
const UserModel = require('../models/userModels');
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for token generation and verification
const cookieParser = require('cookie-parser'); // Importing the cookie-parser middleware for parsing cookies

const usersRouter = express.Router(); // Create a new router object

usersRouter.post('/register', async (req, res) => {
    try {
        const userExists = await UserModel.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: 'User already exists'
            });
        }

        const newUser = new UserModel(req.body); // Create a new user instance with the request body

        await newUser.save(); // Save the new user to the database
        res.send({
            success: true,
            message: 'User registered successfully',
            data: newUser // Return the newly created user data in the response
        });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}); // Route for user registration

usersRouter.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User not found'
            });
        }
        if (req.body.password !== user.password) {
            return res.send({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Generate a token with user ID and secret key
        // res.cookie('token', token, {
        //     httpOnly: true, // Cannot be accessed by JavaScript on the client side
        //     maxAge: 24 * 60 * 60 * 1000, // Set the cookie to expire in 1 day
        // }); // Set the token as a cookie in the response
        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token, // Return the token in the responses
        });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = usersRouter; // Export the router for use in other files