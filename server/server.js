const path = require('path');
const express = require('express');
const cors = require('cors'); // import cors for cross-origin resource sharing
const app = express();
app.use(cors(
    {
        origin: "*", // allow requests from this origin
        methods: ["GET", "POST", "PUT", "DELETE"], // allow these HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // allow these headers in requests
    }
)); // use cors middleware to allow cross-origin requests
const clientBuildPath = path.join(__dirname, '../client/build'); // path to the client build folder
app.use(express.static(clientBuildPath)); // serve static files from the client build folder
require('dotenv').config(); // loading environment variables from .env file

const connectDB = require('./config/db'); // database connection
const usersRouter = require('./routes/userRoutes'); // import user routes
const movieRoter = require('./routes/movieRoutes'); // import movie routes
const theatreRouter = require('./routes/theatreRoutes'); // import theatre routes
const showRouter = require('./routes/showRoutes'); // import show routes
const bookingRouter = require("./routes/bookingRoutes");
connectDB(); // connect to the database

app.use(express.json()); // parse json data from request body
app.use("/api/users", usersRouter); // use the user routes
app.use("/api/movies", movieRoter); // use the movie routes
app.use("/api/theatres", theatreRouter); // use the theatre routes
app.use("/api/shows", showRouter); // use the show routes
app.use("/api/bookings", bookingRouter); // use the booking routes


app.listen(8082, () => {
    console.log('Server is running on port 8082');

})

