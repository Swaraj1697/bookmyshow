const express = require('express');
const UserModel = require('../models/userModels');

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

        res.send({
            success: true,
            message: 'User logged in successfully',
            data: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = usersRouter; // Export the router for use in other files