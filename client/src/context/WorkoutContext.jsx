import { createContext, useState } from 'react'
import axios from 'axios';

import {useAuthContext} from "../hooks/useAuthContext";

export const Data = createContext();

function WorkoutContext(props) {
    const [workouts, setWorkouts] = useState([]);

    const {user} = useAuthContext();
    console.log(user)

    // Get workouts from the server
    const getWorkouts = async () => {
        await axios.get('http://localhost:8080/api/workouts', {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(res => {
                // console.log(res.data);
                setWorkouts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // post a workout to the server
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        reps: 0,
        load: 0
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const postWorkout = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (isEdit && formData.id) { // update the workout
                res = await axios.patch(`http://localhost:8080/api/workouts/${formData.id}`, formData, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
            }
            else { // add a new workout
                res = await axios.post('http://localhost:8080/api/workouts', formData, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
            }

            if (res && res.data) {
                console.log(res.data);
                setFormData({
                    id: null,
                    name: '',
                    reps: 0,
                    load: 0
                });
                getWorkouts();
                setIsEdit(false);
            }
            else {
                console.log("Error in posting workout");
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    // update a workout on the server
    const [isEdit, setIsEdit] = useState(false);
    const toggleEdit = (workout) => {
        setFormData({
            id: workout._id,
            name: workout.name,
            reps: workout.reps,
            load: workout.load
        });
        setIsEdit(true);
    }

    // delete a workout from the server
    const deleteWorkout = async (id) => {
        await axios.delete(`http://localhost:8080/api/workouts/${id}`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(res => {
                console.log(res.data);
                getWorkouts();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Data.Provider value={{ workouts, getWorkouts, formData, handleChange, postWorkout, isEdit, toggleEdit, deleteWorkout }}>
                {props.children}
            </Data.Provider>
        </>
    )
}

export default WorkoutContext