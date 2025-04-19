const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/workoutDB')
    .then(() => {
        console.log('Database connected');
    }
    ).catch((err) => {
        console.log('Error in database connection');
        console.log(err);
        // process.exit(1);
    });