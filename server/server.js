const express = require('express');
const app = express();

require('dotenv').config(); // loading environment variables from .env file

const connectDB = require('./config/db'); // database connection
const usersRouter = require('./routes/userRoutes'); // import user routes
connectDB(); // connect to the database

app.use(express.json()); // parse json data from request body
app.use("/api/users", usersRouter); // use the user routes

app.listen(8082, () => {
    console.log('Server is running on port 8082');

})

