import { NavLink } from 'react-router-dom'
import './NavbarStyle.css'

import { useLogout } from '../../hooks/useLogout'

import { useAuthContext } from '../../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout();

  const handleLogout = ()=>{
    console.log("Logged out");
    logout();
  }

  const {user} = useAuthContext();

  // console.log("User: ",user);

  return (
    <nav className='navbar'>
      <div className='logo'>
        <NavLink to="/">WorkoutBuddy</NavLink>
      </div>
      <div className='menu'>
        {
          user ? <>
            <span>{user?.user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
            </>
            :
          <NavLink to='/login'>Login</NavLink>
        }
        
      </div>
    </nav>
  )
}

export default Navbar