import { useState } from "react";
import "./SignupStyle.css"
import { NavLink } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState(null);

    const { signup } = useSignup();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(user);

        await signup(user)
        .then(()=>{
            setUser({
                name: '',
                email: '',
                password: ''
            })
            setError(null);
        })
        .catch(err=>{
            setError(err);
        });
        
    };

    return (
        <div className='signup-container'>
            <h2>WorkoutBuddy</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text'
                        name='name'
                        value={user.name}
                        onChange={handleChange} 
                        required/>
                </div>
                <div className='form-row'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email'
                        name='email'
                        value={user.email}
                        onChange={handleChange} 
                        required/>
                </div>
                <div className='form-row'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password'
                        name='password'
                        value={user.password}
                        onChange={handleChange} 
                        required/>
                </div>
                <button type='submit'>Sign Up</button>
                {
                    error && <p>{error}</p>
                }
            </form>
            <div className="login-btn">
                <NavLink to={"/login"}>Have account?</NavLink>
            </div>
        </div>
    )
}

export default Signup