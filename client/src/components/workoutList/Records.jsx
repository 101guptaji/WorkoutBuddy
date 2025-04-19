import React, { useContext, useEffect } from 'react'
import { Data } from '../../context/WorkoutContext';
import './RecordStyle.css'

import {useAuthContext} from "../../hooks/useAuthContext";

const Records = () => {
  const { workouts, getWorkouts, toggleEdit, deleteWorkout } = useContext(Data);

  const {user} = useAuthContext();

  useEffect(() => {
    if(user){
      getWorkouts();
    }
    
  }, []);

  return (
    <div className='record-container'>
      <ul>
        {workouts && workouts.map(workout => (
          <li key={workout._id} className='record'>
            <div className='record-content'>
              <h2>{workout.name}</h2>
              <p><b>Reps: </b>{workout.reps}</p>
              <p><b>Weight to be lifted(Kg): </b>{workout.load}</p>
            </div>
            <div className='record-buttons'>
              <img src={require("../../assets/editIcon.png")} alt=""
                className='edit-btn' onClick={() => toggleEdit(workout)} />
              <img src={require("../../assets/deleteIcon.png")} alt=""
                className='delete-btn' onClick={() => deleteWorkout(workout._id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Records