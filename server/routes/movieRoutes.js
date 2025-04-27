const movieRouter = require('express').Router();
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require('../controllers/movieControllers'); // Importing the addMovie controller

movieRouter.post('/add-movie', addMovie); // Route for adding a movie
movieRouter.post('/get-all-movies', getAllMovies);
movieRouter.post('/update-movie', updateMovie);
movieRouter.post('/delete-movie', deleteMovie);

module.exports = movieRouter;