import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const NavBar = () => {

  const { user, setUser } = useContext(UserContext)
  
  const navigate = useNavigate()

  function logout() {
    localStorage.setItem("userLogged", false)
    setUser(false)
    navigate("/")
  }
  /*function login() {
    setUser(true)
    navigate("/dashboard")
  }*/

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/facts">Wiki Facts</Link>
        <Link to="/breeds">Wiki Breeds</Link>
        <Link to="/favourites">Favourites</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/login">Log in</Link>
        {
          user && (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={ logout }>Logout</button>
            </>
          )
        }
      </nav>
    </header>
  )
}

export default NavBar