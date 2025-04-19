// This is the main component of the application. It will be the parent component of all other components.
import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact
            path="/"
            element={
              user ? <Home />
                : <Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              !user ? <Login />
                : <Navigate to="/" />}/>
          <Route
            path="/signup"
            element={
              !user ? <Signup />
                : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
