const Movie = require('../models/movieModels');

const addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({ success: true, message: 'Movie added successfully' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
}

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log('movies', movies);

        res.send({ success: true, data: movies });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
}

const updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({ success: true, message: 'Movie updated successfully' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
}

const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
}

module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
};