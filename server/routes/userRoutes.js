const express = require('express');
const UserModel = require('../models/userModels');
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for token generation and verification
const cookieParser = require('cookie-parser'); // Importing the cookie-parser middleware for parsing cookies
const usersRouter = express.Router(); // Create a new router object
const authMiddleware = require('../middlewares/authMiddleware'); // Importing the authentication middleware
const EmailHelper = require("../utils/emailHelper"); // Importing the email helper for sending emails

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

const otpGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
}; // Importing the otp-generator library for generating OTPs

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
        console.log("JWT Secret at login:", process.env.JWT_SECRET);
        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token, // Return the token in the responses
        });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

usersRouter.get('/currentUser', authMiddleware, async (req, res) => {

    console.log(req.url, req.method); // Log the request headers for debugging
    const user = await UserModel.findById(req.userId).select("-password"); // Find the user by ID from the request body // Log the user data for debugging

    res.send({
        success: true,
        message: "User fetched successfully",
        data: user,
    });

}); // Route for getting the current user

usersRouter.patch("/forgetPassword", async (req, res) => {
    try {
        if (req.body.email === undefined) {
            return res.send({
                success: false,
                message: "Email is required"
            });
        }
        const user = await UserModel.findOne({ email: req.body.email });
        if (user === null) {
            return res.send({
                success: false,
                message: "User not found"
            });
        }
        const otp = otpGenerator(); // Generate a random OTP
        user.otp = otp; // Set the OTP in the user object
        user.otpExpiry = Date.now() + 15 * 60 * 1000; // Set the OTP expiry time to 15 minutes from now
        await user.save(); // Save the updated user object to the database
        await EmailHelper("otp.html", user.email, { name: user.name, otp }); // Send the OTP email to the user
        res.send({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

})

usersRouter.patch("/resetpassword/:email", async (req, res) => {
    // -> otp
    // newPassword and confirmNewPassword
    // email - req.params.email

    try {
        let resetDetails = req.body;
        // required fields are present or not
        if (!resetDetails.password || !resetDetails.otp) {
            return res.send({
                success: false,
                message: "Please enter all the required fields",
            });
        }
        // search for user
        const user = await UserModel.findOne({ email: req.params.email }); // {name:"Aditya",otp:123456,role:"user"}
        // if user is not present
        if (user === null) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }
        // if otp is not matching or otp is expired
        if (user.otp !== resetDetails.otp || user.otpExpiry < Date.now()) {
            return res.send({
                success: false,
                message: "Invalid OTP or OTP expired",
            });
        }
        user.password = resetDetails.password;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = usersRouter; // Export the router for use in other files