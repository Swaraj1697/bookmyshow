const movieRouter = require('express').Router();
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require('../controllers/movieControllers'); // Importing the addMovie controller

movieRouter.post('/add-movie', addMovie); // Route for adding a movie
movieRouter.get('/get-all-movies', getAllMovies);
movieRouter.put('/update-movie', updateMovie);
movieRouter.delete('/delete-movie', deleteMovie);

module.exports = movieRouter;