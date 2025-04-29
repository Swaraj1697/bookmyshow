const express = require('express');
const app = express();

require('dotenv').config(); // loading environment variables from .env file

const connectDB = require('./config/db'); // database connection
const usersRouter = require('./routes/userRoutes'); // import user routes
const movieRoter = require('./routes/movieRoutes'); // import movie routes
const theatreRouter = require('./routes/theatreRoutes'); // import theatre routes
const showRouter = require('./routes/showRoutes'); // import show routes
connectDB(); // connect to the database

app.use(express.json()); // parse json data from request body
app.use("/api/users", usersRouter); // use the user routes
app.use("/api/movies", movieRoter); // use the movie routes
app.use("/api/theatres", theatreRouter); // use the theatre routes
app.use("/api/shows", showRouter); // use the show routes

app.listen(8082, () => {
    console.log('Server is running on port 8082');

})

