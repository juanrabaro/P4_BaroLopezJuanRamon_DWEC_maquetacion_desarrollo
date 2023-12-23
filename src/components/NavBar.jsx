import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const NavBar = () => {

  const { user, setUser } = useContext(UserContext)
  
  const navigate = useNavigate()

  function logout() {
    setUser(false)
    navigate("/")
  }
  function login() {
    setUser(true)
    navigate("/dashboard")
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {
        user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={ logout }>Logout</button>
          </>
        ) : (<button onClick={ login }>Login</button>)
      }
    </nav>
  )
}

export default NavBar