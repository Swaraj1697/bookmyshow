const router = require('express').Router();
const Show = require('../models/showModel');

router.post('/add-show', async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({ success: true, message: 'Show added successfully', data: newShow });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.delete('/delete-show/:showId', async (req, res) => {
    try {
        const { showId } = req.params;
        if (!showId) {
            return res.status(400).json({ message: 'Show ID is required' });
        }
        await Show.findByIdAndDelete(showId);
        res.send({ success: true, message: 'Show deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.put('/update-show', async (req, res) => {
    try {
        const showId = req.body.showId;
        console.log(showId);

        const showIdPresent = await Show.findById(showId)
        console.log(showIdPresent);


        if (showIdPresent === null) {
            return res.status(400).json({ message: 'Show not found' });
        }
        await Show.findByIdAndUpdate(req.body.showId, req.body, { new: true });
        res.send({ success: true, message: 'Show updated successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

//get all shows by theatre
router.get('/get-all-shows-by-theatre/:theatreId', async (req, res) => {
    try {
        const theatreId = req.params.theatreId;
        const shows = await Show.find({ theatre: theatreId }).populate('movie');
        res.send({ success: true, message: "Shows fetched succesfully", data: shows });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

//get all theatres by movie which have shows

router.get("/get-all-theatres-by-movie/:movie/:date", async (req, res) => {
    try {
        /**
         * retrieve all shows by movie and date - Show.find({movie, date})
         * filter out unique theatres from the shows
         * against the unique theatres, get the theatre show detils ( IMAX : 10:00 AM, 12:00 PM, 2:00 PM, INOX: 11:00 AM, 1:00 PM, 3:00 PM)
         */

        const { movie, date } = req.params;
        const shows = await Show.find({ movie, date }).populate("theatre"); // [ {theatre: {name: "IMAX"}, {theatre: {name: "INOX"}}]

        // filter out the unique theatres

        const uniqueTheatres = [];
        shows.forEach((show) => {
            const isTheatre = uniqueTheatres.find(
                (theatre) => theatre._id === show.theatre._id
            );
            if (!isTheatre) {
                // uniqueTheatres.push(show.theatre);
                let showsOfTheatre = shows.filter(
                    (showObj) => showObj.theatre._id === show.theatre._id
                );
                uniqueTheatres.push({ ...show.theatre, shows: showsOfTheatre });
            }
        });
        res.send({
            success: true,
            message: "Theatres fetched successfully",
            data: uniqueTheatres,
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

router.get("/get-show-by-id/:showId", async (req, res) => {
    try {
        const show = await Show.findById(req.params.showId).populate("movie").populate("theatre");
        res.send({
            success: true,
            message: "Shows fetched successfully",
            data: show,
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = router;