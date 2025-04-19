import { NavLink } from "react-router-dom"
import "./LoginStyle.css"
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null);
    const { login } = useLogin();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log(email, password);

        await login({email, password})
        .then(()=>{
            setEmail('');
            setPassword('');
            setError(null);
        })
        .catch(err=>{
            setError(err);
        });
    }

    return (
        <div className='login-container'>
            <h2>WorkoutBuddy</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' 
                        name='email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                </div>
                <div className='form-row'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' 
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                        required/>
                </div>
                <button type='submit'>Log in</button>
                {
                    error && <p>{error}</p>
                }
            </form>
            <div className="signup-btn">
                <NavLink to={"/signup"}>Create a new account  </NavLink>
            </div>
        </div>
    )
}

export default LogIn