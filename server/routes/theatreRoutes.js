const router = require('express').Router(); // Importing the express router
const Theatre = require('../models/theatreModel'); // Importing the Theatre model

router.post('/add-theatre', async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body); // Create a new theatre instance with the request body
        await newTheatre.save(); // Save the new theatre to the database
        res.send({ success: true, message: 'Theatre added successfully' }); // Send success response
    } catch (error) {
        res.send({ success: false, message: error.message }); // Send error response
    }
})

router.put('/update-theatre', async (req, res) => {
    try {
        const theatre = Theatre.findById(req.body.theatreId); // Find the theatre by ID
        if (!theatre) {
            return res.send({ success: false, message: 'Theatre not found' }); // Send error response if theatre not found
        }
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body); // Update the theatre with the request body
        res.send({ success: true, message: 'Theatre updated successfully' }); // Send success response
    }
    catch (error) {
        res.send({ success: false, message: error.message }); // Send error response
    }
})

router.delete('/delete-theatre/:theatreId', async (req, res) => {
    try {
        const theatreId = req.params.theatreId; // Get the theatre ID from the request parameters
        const theatre = await Theatre.findById(theatreId); // Find the theatre by ID
        if (!theatre) {
            return res.send({ success: false, message: 'Theatre not found' }); // Send error response if theatre not found
        }
        await Theatre.findByIdAndDelete(theatreId); // Delete the theatre by ID
        res.send({ success: true, message: 'Theatre deleted successfully' }); // Send success response
    } catch (error) {
        res.send({ success: false, message: error.message }); // Send error response
    }
})

router.get('/get-all-theatres', async (req, res) => {
    try {
        const theatres = await Theatre.find().populate("owner"); // Find all theatres in the database
        res.send({ success: true, data: theatres, message: "All theatres fetched succesfully" }); // Send success response with theatre data
    } catch (error) {
        res.send({ success: false, message: error.message }); // Send error response
    }
})

router.get('/get-all-theatres-by-owner/:ownerId', async (req, res) => {
    try {
        const allTheatres = await Theatre.find({ owner: req.params.ownerId }); // Find all theatres by owner ID
        res.send({ success: true, data: allTheatres, message: "All theatres fetched succesfully" }); // Send success response with theatre data
    }
    catch (error) {
        res.send({ success: false, message: error.message }); // Send error response
    }
})

module.exports = router; // Export the router