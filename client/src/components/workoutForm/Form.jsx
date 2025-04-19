import React from 'react'
import { useContext } from 'react'
import { Data } from '../../context/WorkoutContext';
import './FormStyle.css'

const Form = () => {
    const { formData, isEdit, postWorkout, handleChange } = useContext(Data);

    return (
        <div className='form-container'>
            <h2>{isEdit ? "Edit Workout" : "Add Workout"}</h2>
            <form className='form'>
                <div className='form-row'>
                    <label htmlFor="name">Exercise Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="reps">Reps:</label>
                    <input type="number" name="reps" value={formData.reps} onChange={handleChange} min={0} required/>
                </div>
                <div>
                    <label htmlFor="load">Weight to be lifted(Kg):</label>
                    <input type="number" name="load" value={formData.load} onChange={handleChange} min={0} required/>
                </div>
                <br />
                <button type="submit" onClick={postWorkout}> Submit </button>
            </form>
        </div>
    )
}

export default Form