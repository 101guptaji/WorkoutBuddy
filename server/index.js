require("dotenv").config();

// Initialize the server and connect to the database
require('./db/connection');

// Import the cors module
const cors = require('cors');

// Import the express module
const express = require('express');
const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing) for all requests to the server from client applications
app.use(cors());

// test the server
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use the workout router for all requests to the /api/workouts path
const workoutRouter = require('./routes/workoutRoutes');
app.use("/api/workouts", workoutRouter);


// Use the user router for all requests to the /api/users path
const userRouter = require('./routes/userRoutes');
app.use("/api/users", userRouter);

// Start the server on the specified port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});