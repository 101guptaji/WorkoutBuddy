const express = require('express');
const router = express.Router();

const authUser = require("../middleware/userMiddleware");

const { getWorkouts, getWorkout, postWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');

// middleware
router.use(authUser);

// Get all workouts
router.get('/', getWorkouts);

// Get a single workout
router.get('/:id', getWorkout);

// post a workout
router.post('/', postWorkout);

// update a workout
router.patch('/:id', updateWorkout);

// delete a workout
router.delete('/:id', deleteWorkout);

module.exports = router;