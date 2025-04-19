const workoutModel  = require('../models/workoutModel');

// Get all workouts
getWorkouts = async (req, res) => {
    // const userId = req.user._id;
    try {
        const workouts = await workoutModel.find({user_id: req?.user?._id}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single workout
getWorkout = async (req, res) => {
    try {
        const workout = await workoutModel.findById(req.params.id);
        if (workout == null) {
            return res.status(404).json({ message: 'Cannot find workout' });
        }
        res.status(200).json(workout);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// post a workout
postWorkout = async (req, res) => {
    console.log(req.body)
    const workout = new workoutModel({
        name: req.body.name,
        reps: req.body.reps,
        load: req.body.load,
        user_id: req?.user?._id
    });
    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// update a workout
updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await workoutModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Cannot find workout' });
        }

        res.status(200).json(updatedWorkout);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// delete a workout
deleteWorkout = async (req, res) => {
    try {
        const workout = await workoutModel.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Cannot find workout' });
        }
        res.status(204).json({ message: 'Workout deleted' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// export the functions
module.exports = {
    getWorkouts,
    postWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout
}